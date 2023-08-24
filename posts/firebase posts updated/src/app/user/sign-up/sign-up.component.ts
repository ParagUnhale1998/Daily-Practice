import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/server.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';
import { TosterService } from 'src/app/shared/toster.service';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { FireAuthService } from 'src/app/shared/fire-auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy, OnInit {
  @Input() userData: any;
  
  userForm!: FormGroup;
  currentDate: string;
  editmode: boolean;
  profilePics: string | undefined;
  loader: boolean = false;
  originalUserData: any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private dataService: DataService,
    private toastrService: TosterService,
    private fireService: FirestoreService,
    private fireAuth:FireAuthService
  ) {
    this.editmode = this.dataService.editMode;
    const date = new Date();
    this.currentDate = date.toLocaleString();
    // this.currentDate = new Date().toLocaleString();
  }

  ngOnInit(): void {
    this.editmode ? this.editformUser() : this.signupformUser();
    this.fireService.getData().subscribe((res) => console.log(res));
  }

  signupformUser() {
    this.userForm = this.formBuilder.group({
      name: ['',],
      username: ['', Validators.required],
      bio: [''],
      coverPhoto: [''],
      profilePic: [''],
      talksAbout: [''],
      address: [''],
      socialLink: [''],
      phoneNo: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  editformUser() {
    this.originalUserData = { ...this.userData } ;
    this.userForm = this.formBuilder.group({
      name: [this.userData.name, Validators.required],
      username: [this.userData.username, Validators.required],
      bio: [this.userData.bio],
      coverPhoto: [this.userData.coverPhoto],
      profilePic: [this.userData.profilePic],
      talksAbout: [this.userData.talksAbout],
      address: [this.userData.address],
      socialLink: [this.userData.socialLink],
      phoneNo: [this.userData.phoneNo],
      password: [
        this.userData.password,
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: [this.userData.confirmPassword, Validators.required],
    });
  }

  get isPasswordMatch(): boolean {
    return (
      this.userForm.get('password')?.value ===
      this.userForm.get('confirmPassword')?.value
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.profilePics = reader.result as string;
    };
  }

  
  async onSignUp() {
    if (this.userForm.valid) {
      this.loader = true;
      const userData = this.userForm.value;
      userData.id = userData.username;
      userData.joinedDate = this.currentDate;

      if (this.profilePics) {
        userData.profilePic = this.profilePics;
      }

      const SUCCESS_EDIT_MESSAGE = this.editmode? 'User Successfully Edited' : 'User Successfully Created';
      const ERROR_EDIT_MESSAGE  = this.editmode ? 'Failed to edit user' : 'Failed to create user';

     

      try {
        if (this.editmode) {
          console.log('editmode active');

          const updatedFields: any = {};

          for (const key in userData) {
            if (userData.hasOwnProperty(key) && userData[key] !== this.originalUserData[key]) {
              updatedFields[key] = userData[key];
            }
          }
    
          if (Object.keys(updatedFields).length === 0) {
            // No fields have been changed, you can handle this case as needed
            this.activeModal.close();
            this.userForm.reset();
            this.dataService.editMode = false;
            this.loader = false;
            console.log('Nothing Has Changed');
            return; // Exit the function
          }
    
          updatedFields.id = userData.username;

          if (Object.keys(updatedFields).length === 2 && 'joinedDate' in updatedFields && 'id' in updatedFields) {
            this.toastrService.showWarning('nothing Changed', 'Warning');
            this.activeModal.close();
            this.userForm.reset();
            this.dataService.editMode = false;
            this.loader = false;
            return;
          }
          for (const key in updatedFields) {
            if (updatedFields.hasOwnProperty(key)) {
              const updatedData: any = {}; //   const updatedData: any = { [key]: updatedFields[key] };
              updatedData[key] = updatedFields[key];
              if (Object.keys(updatedData).length > 0) {
                await this.fireService.updateData(userData.id, updatedData);
              }
            }
          }
        } else {
          await this.fireService.createUserData(userData.username, userData).then(() => {
             this.fireAuth.signUp(userData.username, userData.password);
              
              // console.log('User added with custom ID: ', userData.username);
              // this.dataService.userId = userData.username;
              // this.dataService.setUserIsRegister(true);
              sessionStorage.setItem('userId', userData.username);
                sessionStorage.setItem('userName', userData.name);
                sessionStorage.setItem('userProfilePic', userData.profilePic || '');
                sessionStorage.setItem('UserIsRegister', 'true');
                console.log(this.dataService.userId,this.dataService.userName,this.dataService.getUserIsRegister())
                this.dataService.userId =sessionStorage.getItem('userId')
                this.dataService.userName =sessionStorage.getItem('userName')
                this.dataService.userProfilePic = sessionStorage.getItem('userProfilePic')
                this.dataService.setUserIsRegister(this.dataService.getUserIsRegisteredFromLocalStorage());

              this.loader = false;
            })
            .catch((error) => {
              console.error('Error adding user: ', error);
              this.loader = false;
            });
          // await this.fireService.createData(userData).then(data => console.log(data))
        }
        this.toastrService.showSuccess(SUCCESS_EDIT_MESSAGE, 'Success');
        this.activeModal.close();
        this.userForm.reset();
        this.dataService.editMode = false;
        this.loader = false;
      } catch (error) {
        this.toastrService.showError(ERROR_EDIT_MESSAGE , 'Error');
        this.activeModal.close();
        this.userForm.reset();
        this.dataService.editMode = false;
        this.loader = false;
        console.error('Error:', error);
      }
    }
  }

  ngOnDestroy(): void {
    this.dataService.editMode = false;
    console.log(this.dataService.editMode);
  }
}

// old code without Clean code
/* @Input() userData: any;
  // userData: any;
  userForm!: FormGroup;
  isMatch!: boolean;
  isValid!: any;
  joinedDateFormatted: any;
  currentDate: any;
  editmode: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    public activeModal: NgbActiveModal,
    private dataService:DataService,
    private toastrService:TosterService
  ) {
    this.editmode = this.dataService.editMode;
    const date = new Date();
    this.currentDate = date.toLocaleString();
    // this.currentDate = new Date().toLocaleString();

  }

  ngOnInit(): void {
    // if (this.editmode) {
    //   console.log(this.editmode)
    //   this.editformUser()
    // } else {
    //   this.signupformUser();
    // }
    // console.log('hey')
    this.editmode ? this.editformUser() : this.signupformUser();
  }

  signupformUser() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      bio: [''],
      coverPhoto: [''],
      profilePic: [''],
      talksAbout: [''],
      address: [''],
      socialLink: [''],
      phoneNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      posts: this.formBuilder.array([]),
    });
  }

  editformUser() {
    this.userForm = this.formBuilder.group({
      name: [this.userData.name, Validators.required],
      username: [this.userData.username, Validators.required],
      bio: [this.userData.bio],
      coverPhoto: [this.userData.coverPhoto],
      profilePic: [this.userData.profilePic],
      talksAbout: [this.userData.talksAbout],
      address: [this.userData.address],
      socialLink: [this.userData.socialLink],
      phoneNo: [this.userData.phoneNo, Validators.required],
      password: [
        this.userData.password,
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: [this.userData.confirmPassword, Validators.required],
    });
  }

  ConfirmPass() {
    this.isMatch =
      this.userForm.get('password')?.value ===
      this.userForm.get('confirmPassword')?.value;
  }

  onSignUp() {
    if (this.userForm.valid) {
      if (this.editmode) {
        const userData = this.userForm.value;
        userData.id = userData.username;
        userData.joinedDate = this.currentDate;
        this.server.patchUser(userData.username,userData).subscribe((res) => {
          this.toastrService.showSuccess('User SuccesFully Edited', 'Succesfull');
          this.activeModal.close();
          this.userForm.reset();
          this.dataService.editMode = false
        },
        (error) => {
          this.toastrService.showError('Failed to edit user', 'Error');
          console.error('Error editing user:', error);
        })
      } else {
        const userData = this.userForm.value;
        userData.id = userData.username;
        userData.joinedDate = this.currentDate;
        this.server.addUser(userData).subscribe((res) => {
          this.toastrService.showSuccess('User SuccesFully Created', 'Succesfull');
          this.activeModal.close();
          this.userForm.reset();
        },
        (error) => {
          this.toastrService.showError('Failed to create user', 'Error');
          console.error('Error creating user:', error);
        });
      }
    }
  }
  ngOnDestroy(): void {
    this.dataService.editMode = false
    console.log(this.dataService.editMode)
  }*/

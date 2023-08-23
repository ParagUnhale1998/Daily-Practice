import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/server.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data.service';
import { TosterService } from 'src/app/shared/toster.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy, OnInit {
  @Input() userData: any;
  userForm!: FormGroup;
  isPasswordMatch!: boolean;
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
    this.isPasswordMatch =
      this.userForm.get('password')?.value ===
      this.userForm.get('confirmPassword')?.value;
  }

  async onSignUp() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      userData.id = userData.username;
      userData.joinedDate = this.currentDate;

      const successMessage = this.editmode ? 'User Successfully Edited' : 'User Successfully Created';
      const errorMessage = this.editmode ? 'Failed to edit user' : 'Failed to create user';
     
      
      try {
        if (this.editmode) {
          console.log('editmode active')
          await this.server.patchUser(userData.id, userData).toPromise();
        } else {
          await this.server.addUser(userData).toPromise();
        }
        this.toastrService.showSuccess(successMessage, 'Success');
        this.activeModal.close();
        this.userForm.reset();
        this.dataService.editMode = false;
      } catch (error) {
        this.toastrService.showError(errorMessage, 'Error');
        console.error('Error:', error);
      }
    }
  }
  
  ngOnDestroy(): void {
    this.dataService.editMode = false
    console.log(this.dataService.editMode)
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
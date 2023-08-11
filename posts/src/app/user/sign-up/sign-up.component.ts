import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from 'src/app/server.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnDestroy{
  userForm!: FormGroup;
  isMatch!: boolean;
  isValid!: any;
  joinedDateFormatted: any;
  currentDate:any;
  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
  ) 
  {
    this.signupformUser();
    const date = new Date();
   this.currentDate = date.toLocaleString();
   console.log(this.currentDate)
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

  ConfirmPass() {
    this.isMatch =
      this.userForm.get('password')?.value ===
      this.userForm.get('confirmPassword')?.value;
  }

  onSignUp() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      userData.id = userData.username;
      userData.joinedDate = this.currentDate
      this.server.addUser(userData).subscribe((res) => {
        this.toastr.success('User SuccesFully Created', 'Succesfull');
        this.activeModal.close();
        this.userForm.reset();
      });
    }
  }
  ngOnDestroy(): void {}
}

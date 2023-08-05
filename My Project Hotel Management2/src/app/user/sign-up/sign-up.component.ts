import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  formErrors: any = {};
  inputPassword : any;
  confirmPass : any ;
  isMatch! : boolean;
  isValid! : any ;
  whiteSpace : boolean = false
  displayOtherContent: boolean = false;

  constructor(private authService: AuthService,private userService:UserService, private router: Router) {
  }

  ngOnInit(): void {
   this.signUpForm = new FormGroup({
    'firstName' : new FormControl('',[Validators.required, this.whiteSpaceValidator]),
    'lastName' : new FormControl('',[Validators.required, this.whiteSpaceValidator]),
    'phoneNumber' : new FormControl('', Validators.required),
    'email' : new FormControl('',Validators.required),
    'id' : new FormControl('',[Validators.required, Validators.minLength(5), this.whiteSpaceValidator]),
    'password' : new FormControl(null,[Validators.required,Validators.minLength(6)]),
    'confirmPassword' : new FormControl(null,Validators.required),
    'gender': new FormControl('male'),
   })
   this.checkCurrentUrl();
  }
  checkCurrentUrl() {
    const currentUrl = this.router.url;
    if (currentUrl === '/user/signUp') {
      this.displayOtherContent = true;
    } else {
      this.displayOtherContent = false;
    }
  }

  initializeForm() {
    this.signUpForm = new FormGroup({
      id: new FormControl(null, [Validators.required, Validators.minLength(5), this.whiteSpaceValidator]),
      firstName: new FormControl(null, [Validators.required, this.whiteSpaceValidator]),
      lastName: new FormControl(null, [Validators.required, this.whiteSpaceValidator]),
      phoneNumber: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, Validators.required)
    });
  }
  
  
  
  whiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
    let data = control.value
    let newdata = data?.trim()
    let isValid = data.length != newdata.length
    return isValid ? {whiteSpace:true} : null
   }
   
   showPass(){
    console.log(this.signUpForm.value.password)
    this.inputPassword = this.signUpForm.value.password ;
   }
  //  ConfirmPass(){
  //   console.log(this.signUpForm.value.confirmPassword)
  //   this.confirmPass = this.signUpForm.value.confirmPassword ;
  //   if(this.inputPassword ===  this.confirmPass){
  //      this.isMatch = true;
  //   }else{
  //     this.isMatch = false
  //   }
  //  }
   ConfirmPass() {
    this.isMatch = this.signUpForm.get('password')?.value === this.signUpForm.get('confirmPassword')?.value;
  }
  

   submitSignUp() {
    if (this.signUpForm.valid) {
      console.log('Form data submitted valid:', this.signUpForm.value);
      this.userService.postUsers(this.signUpForm.value).subscribe((res)=>{
        console.log(res)
        this.userService.setUserIsRegister(true);

        this.router.navigateByUrl('/user')
      })
    } 
  }

  navigateLoginPage(){
    this.router.navigateByUrl('user/login')
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms4-learning',
  templateUrl: './forms4-learning.component.html',
  styleUrls: ['./forms4-learning.component.css']
})
export class Forms4LearningComponent {

  signUpForm !: FormGroup;    // ! for not use property we use in when time come
   inputPassword : any;
   confirmPass : any ;
   isMatch! : boolean;
   isValid! : any ;
   whiteSpace : boolean = false
 constructor(private  formBuilder : FormBuilder){

 }
 
 ngOnInit(){
  this.signUpFormControlls()
 }

 signUpFormControlls(){

  this.signUpForm = this.formBuilder.group({
    // name : ['',[Validators.required,Validators.minLength(10),Validators.pattern("[a-zA-Z ]*$ ")]],
    // for white spaces
    name : ['',[this.whiteSpaceValidator]],
    email : ['',],
    contact : ['',[Validators.pattern("[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
    address : ['',],
    Gender: ['Male',],
    password :['',[Validators.minLength(9) ,Validators.pattern("[A-Z]{1}[a-zA-Z0-9@#$!%^&*]{9}$")]],
    Confirmpassword :['',[Validators.minLength(9) ,Validators.pattern("[A-Z]{1}[a-zA-Z0-9@#$!%^&*]{9}$")]]
  })
 }
 whiteSpaceValidator(name:any){
  let data = name.value
  let newdata = data?.trim()
  let isValid = data.length != newdata.length
  return isValid ? {whiteSpace:true} : null
 }
 
 showPass(){
  console.log(this.signUpForm.value.password)
  this.inputPassword = this.signUpForm.value.password ;
 }
 ConfirmPass(){
  console.log(this.signUpForm.value.Confirmpassword)
  this.confirmPass = this.signUpForm.value.Confirmpassword ;
  if(this.inputPassword.value ===  this.confirmPass.value){
     this.isMatch = true;
  }else{
    this.isMatch = false
  }

 }

 submit(){
  console.log(this.signUpForm.value)
  }

  handlePasswordChange(value:any){
  console.log(value)
 

  }
}

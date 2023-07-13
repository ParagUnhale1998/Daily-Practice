import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServicesService } from '../data-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services4-learning',
  templateUrl: './services4-learning.component.html',
  styleUrls: ['./services4-learning.component.css'],
})
export class Services4LearningComponent {
  signUpForm!: FormGroup; 
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataServicesService,
    private router:Router
  ) {}

  ngOnInit() {
    this.signUpFormControlls();
    //stringify Json
    this.dataService.jsonData = {
      "admin" :  [{
        name : 'parag Unhale',
        subject : 'computerscience',
        sallary : 100000000,
        title :'front End Enginner'
      } ],
      "statusCoe":200,
      "message":"Success"
   
  }
  }

  signUpFormControlls() {
    this.signUpForm = this.formBuilder.group({
      name: ['',[]]
      // ,
      // password: [ '',[]]
    });
  }


  submit() {
    console.log(this.signUpForm.value);
    this.dataService.username = this.signUpForm.value.name;
    console.log( this.dataService.username)
    this.router.navigateByUrl('students/studentLogIn')
    this.dataService.listofUsers = ['parag','sanket','anshul']
  }

 
}

import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServicesService } from '../data-services.service';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-life-cycle-hook5-learning',
  templateUrl: './life-cycle-hook5-learning.component.html',
  styleUrls: ['./life-cycle-hook5-learning.component.css']
})
export class LifeCycleHook5LearningComponent {
  // signUpForm!: FormGroup; 
  data:any;
  getdata:boolean=false;
  convertedJsondata:any;
  parseData!:any;
  parentData:any;
  valueFromChild:any;
  //constructor : 1. it is not a lifecycle hooks
  // constructor willtrigger firest wehn component get initilised
  // will use constructor to inject depedancies
  constructor(
    // private formBuilder: FormBuilder,
    private dataService: DataServicesService,
    // private router:Router
  ) {}
  // lifecycle hooks 1) ngOnChanges 2)ngOnInit 3)ngDoCheck 4) ngAfterContentInit 5) ngAfterContentChecked 6)ngAfterViewInit
  // when the value of data properrty changes , the the lifecycle hooks call
  ngOnInit() {
   this.data =  this.dataService.jsonData
   console.log(this.data)
   this.convertedJsondata =JSON.stringify(this.data) 
      // console.log(this.convertedJsondata)
  //  this.parseData = JSON.parse(this.convertedJsondata)
      // console.log(this.parseData)
  }
  receiveDataFromChild(value:any){
    this.valueFromChild = value;

  }
// using ngModel
  // receiveData(value: string) {
  //   this.valueFromChild = value;
  // }

  showJsondata(){
    this.getdata = !this.getdata
  }
  

}
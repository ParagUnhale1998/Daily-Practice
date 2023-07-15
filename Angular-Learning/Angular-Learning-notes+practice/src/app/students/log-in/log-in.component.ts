import { Component } from '@angular/core';
import { DataServicesService } from 'src/app/data-services.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
 constructor(private dataService:DataServicesService){

 }
 name:any = this.dataService.username
//  list:any;
list:any = this.dataService.listofUsers
 getdata :boolean= false;

 setData(){
  this.getdata = !this.getdata
  // this.list = this.dataService.listofUsers
  let addition = this.dataService.test(2,5)
  console.log(addition)
 }

}


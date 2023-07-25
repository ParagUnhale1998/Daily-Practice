import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {
  username!:string;
  jsonData!:any;
  listofUsers!:any;


  test(a:number , b:number){

    return a + b ;
    
  }


   // api call 
   adminurl = "";
   constructor(public httpClient:HttpClient) { }

   postApiCall(formdata:any){
  return this.httpClient.post(this.adminurl,formdata)
   }
}

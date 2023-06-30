import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
    // for globel we use input decorator
   // but for use this globle propertt we use comopnant seletor to use this porperty
 @Input() dataFromparent:any
 @Output() dataFromChild= new EventEmitter <any>
 childValue!:string;


 sendData(event:any){
  console.log(event.target.value)
  let value = event.target.value
this.dataFromChild.emit(value)

 }
//  sendData() {
//   this.dataFromChild.emit(this.childValue);
// }
}

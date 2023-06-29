import { Component, EventEmitter, Input, Output ,OnInit , OnChanges, DoCheck,AfterContentChecked,AfterContentInit,AfterViewInit,AfterViewChecked ,OnDestroy} from '@angular/core';

@Component({
  selector: 'app-angular-post-udemy',
  templateUrl: './angular-post-udemy.component.html',
  styleUrls: ['./angular-post-udemy.component.css'],
})
export class AngularPostUdemyComponent implements OnInit,OnChanges,DoCheck,AfterContentChecked,AfterContentInit,AfterViewInit,AfterViewChecked,OnDestroy{
  // for globel we use input decorator
  @Input('img') postImg = '';
  @Output() imgSelected = new EventEmitter<string>();
  
constructor(){
console.log("constructor")
}
ngOnInit(){
console.log("ngOnInit")
}
ngDoCheck(){
  console.log("ngDoCheck")
}
ngOnChanges(){
  console.log("ngOnChanges")
}
ngAfterContentChecked(){
  console.log("ngAfterContentChecked")
}
ngAfterContentInit(){
  console.log("ngAfterContentInit")
}
ngAfterViewChecked(){
  console.log("ngAfterViewChecked")
}
ngAfterViewInit(){
  console.log("ngAfterViewInit")
}
ngOnDestroy(){
  console.log("ngOnDestroy")
}
}

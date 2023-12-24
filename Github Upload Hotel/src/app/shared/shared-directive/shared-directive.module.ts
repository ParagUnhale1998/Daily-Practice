import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadDirective } from '../directives/lazy-load.directive';
import { PreloadImageDirective } from '../directives/preload-image.directive';



@NgModule({
  declarations: [
    LazyLoadDirective,
    PreloadImageDirective
  ],
  imports: [
    CommonModule
  ],exports:[
    LazyLoadDirective,
    PreloadImageDirective
  ]
})
export class SharedDirectiveModule { }

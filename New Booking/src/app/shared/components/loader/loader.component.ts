import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  // for normal loader
  ngAfterViewInit(): void {
    setTimeout(() => {
      const spinnerElement = document.getElementById('spinner');
      if (spinnerElement) {
        spinnerElement.classList.remove('show');
      }
    }, 1);
  }

  //for images and script loaded this loader
  // ngAfterViewInit(): void {
  //   window.onload = () => {
  //     const spinnerElement = document.getElementById('spinner');
  //     if (spinnerElement) {
  //       spinnerElement.classList.remove('show');
  //     }
  //   };
  // }
  
}

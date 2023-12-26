import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [
    trigger('counting', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})

export class AboutUsComponent {
  countValue = 0;
  roomsValue = 0;
  clientValues = 0;

  ngOnInit() {
    this.autoIncrement();
  }
  private autoIncrement() {
    const interval = setInterval(() => {
      this.countValue += 40;
      this.roomsValue += 497;
      this.clientValues += 5234;
      if (this.countValue >= 1000) {
        clearInterval(interval);
      }
    }, 150); // Adjust the interval based on your desired animation speed
  }
  
}


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
  countValue: number = 0;
  roomsValue: number = 0;
  clientValues: number = 0;
  private readonly INTERVAL_DURATION_MS = 60;

  ngOnInit(): void {
    this.autoIncrement();
  }

  private autoIncrement(): void {
    const interval = setInterval(() => {
      this.countValue += 40;
      this.roomsValue += 497;
      this.clientValues += 5234;
      if (this.countValue >= 1000) {
        clearInterval(interval);
      }
    }, this.INTERVAL_DURATION_MS);
  }
  
}


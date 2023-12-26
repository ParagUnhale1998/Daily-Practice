import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    trigger('counting', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ContactUSComponent {
  countValue = 0;
  roomsValue = 0;
  clientValues = 0;

  
  constructor(private sanitizer: DomSanitizer) { }

  getGoogleMapsUrl(): SafeResourceUrl {
    const googleMapsUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422245.047849365!2d75.7139!3d19.7515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf632330044d%3A0xc3f58b98a6af269!2sMaharashtra%2C%20India!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd';
  
    return this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
  }
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
    }, 60); // Adjust the interval based on your desired animation speed
  }

 
}



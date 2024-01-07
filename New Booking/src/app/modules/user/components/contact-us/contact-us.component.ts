import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { throttleTime } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { TosterMessageService } from 'src/app/core/services/toster-message.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUSComponent implements OnInit {
  contactForm!: FormGroup;
  googleMapsUrl!: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private contactService: ContactService,
    private tosterMessage: TosterMessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    // Throttle the getGoogleMapsUrl function to be called once every 500 milliseconds
    this.getGoogleMapsUrl()
      .pipe(throttleTime(500))
      .subscribe((url) => {
        this.googleMapsUrl = url;
        this.cdr.detectChanges();
      });
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: [''],
    });
  }
  submitForm(): void {
    if (this.contactForm.valid) {
      const newContact = this.contactForm.value;
      this.contactService.addContact(newContact).subscribe({
        next: () => {
          this.tosterMessage.showSuccess('Your feedback has been submitted successfully! Thank you.', 'Success');
          // Reset the form after successful submission
          this.contactForm.reset();
        },
        error: (error) => {
          if (error.status === 404) {
            this.tosterMessage.showError('Contact endpoint not found.', 'Error');
          } else {
            this.tosterMessage.showError('Error submitting feedback. Please try again.', 'Error');
          }
        }
      });
    } else {
      this.tosterMessage.showWarning('Please fill out the required fields correctly.', 'Warning');
    }
  }
  
  
  

  getGoogleMapsUrl(): Observable<SafeResourceUrl> {
    const googleMapsUrl =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2422245.047849365!2d75.7139!3d19.7515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf632330044d%3A0xc3f58b98a6af269!2sMaharashtra%2C%20India!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd';

    return of(this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl));
  }
}

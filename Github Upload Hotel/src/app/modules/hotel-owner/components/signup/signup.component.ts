import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @Output() toggle = new EventEmitter<void>();
  showSignUp = true;

  loginClick() {
    this.showSignUp = false;
    this.toggle.emit();
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // constructor(public activeModal: NgbActiveModal,private modalService: NgbModal) {}
  // closeModal() {
  //   this.activeModal.close('Modal Closed');
  // }

  // openSignUpComponent() {
  //   this.closeModal()
  //   const modalRef = this.modalService.open(SignUpComponent, {
  //     backdropClass: 'transparent-black-backdrop',
  //     centered: true,
  //     size: 'lg'
  //   });
  //   modalRef.result.then(
  //     (result) => {
        
  //       console.log('Modal closed with result:', result);
  //     },
  //     (reason) => {
  //       console.log('Modal dismissed with reason:', reason);
  //     }
  //   );
  // }

  showSignUp = false;

  toggleSection() {
    this.showSignUp = !this.showSignUp;
  }
  
}

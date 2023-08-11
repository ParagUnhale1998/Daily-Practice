import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { AddPostComponent } from '../add-post/add-post.component';
// import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userIsRegister: boolean = false;
  
  activeButton: string = 'Home';
  constructor(
    private service: ServerService,
    private router: Router,
    private modalService: NgbModal,
   
  ) {}

  ngOnInit(): void {
    
    this.service.getUserIsRegister().subscribe((value) => {
      this.userIsRegister = value;
    });
  }

  navigateToHome() {
    this.activeButton = 'Home';
    this.router.navigateByUrl('/user');

  }
  navigateToLogin() {
    this.activeButton = 'Login';

    this.modalService.open(LoginComponent, { centered: true, backdrop: true });
  }
  navigateToCreatePost() {
    this.activeButton = 'CreatePost';
    this.modalService.open(AddPostComponent, { centered: true, backdrop: true });
  }
  navigateToLoginProfile(){
    this.activeButton = 'profile';
    this.router.navigateByUrl('profile')

  }
  logout() {
    this.service.setUserIsRegister(false);
    this.router.navigateByUrl('/');
  }
}

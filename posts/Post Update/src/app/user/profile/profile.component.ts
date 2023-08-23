
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/server.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { DataService } from 'src/app/shared/data.service';
import { TosterService } from 'src/app/shared/toster.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  searchInput: any;
  visibleComments: number = 2;
  userData: any;
  latestPosts: any[] = [];
  displayedPosts: any[] = [];
  postsPerPage: number = 2;
  userID: any;
  isCurrentUser!: boolean;
  otherUserId:any
  constructor(
    private server: ServerService,
    private modalService: NgbModal,
    private dataService: DataService,
    private tosterService: TosterService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    // this.userID = this.dataService.userId;
    // this.fetchUserData()

    this.userID = this.dataService.userId;

    this.route.queryParamMap.subscribe((params) => {
      this.otherUserId = params.get('id') || '';
      if (this.otherUserId && this.otherUserId !== this.userID) {
        this.isCurrentUser = false;
        this.fetchUserData(this.otherUserId);
      } else {
        this.isCurrentUser = true;
        this.fetchUserData(this.userID);
      }
    });

  }
 
  fetchUserData(id:any){
    this.server.getUser(id).subscribe({
      next :(data) => {
      this.userData = data;
      this.getLatestPosts();
      },
      error: (error) => {
        console.error('Data Not Fetched', error);
      }
    }
      );
  }
  
  getLatestPosts() {
    const posts = this.userData.posts;
    this.latestPosts = posts.slice().sort((a: any, b: any) => b.id - a.id);
    this.displayedPosts = this.latestPosts.slice(0, this.postsPerPage);
  }

  showMorePosts() {
    const remainingPosts = this.latestPosts.slice(this.displayedPosts.length);
    const nextPosts = remainingPosts.slice(0, this.postsPerPage);
    this.displayedPosts = this.displayedPosts.concat(nextPosts);
  }
  
  showMoreComments() {
    this.visibleComments += 2;
  }

  deletePost(post: any) {
    const postIndex = this.userData.posts.findIndex(
      (p: any) => p.id === post.id
    );
    const id = this.userID;
    if (postIndex !== -1) {
      this.userData.posts.splice(postIndex, 1);
      this.server.updateUser(id, this.userData).subscribe((res) => {
        this.tosterService.showSuccess('Post Deleted Successfully', 'Success');
      });
    } else {
      this.tosterService.showError('Post with ID not found in user data.', 'failed');
      console.log(`Post with ID ${post.id} not found in user data.`);
    }
  }
 
  private openModelWithComponent(component:any,dataName:any,data:any){
    this.dataService.editMode = true;
    const modalRef = this.modalService.open(component, {
      centered: true,
    });
    if(dataName === 'userData'){
      modalRef.componentInstance.userData = data;
    }else{
      modalRef.componentInstance.post = data;
    }
  }

  editProfile() {
    this.openModelWithComponent(SignUpComponent,'userData', this.userData);
  }
  editPost(post: any) {
    this.openModelWithComponent(AddPostComponent,'post', post);
  }

  
}


/*// old code without clean

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/server.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { DataService } from 'src/app/shared/data.service';
import { HashtagServiceService } from 'src/app/shared/hashtag-service.service';
import { TosterService } from 'src/app/shared/toster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  searchInput: any;
  visibleComments: number = 2;
  userData: any;
  latestPosts: any[] = [];
  displayedPosts: any[] = [];
  postsPerPage: number = 2;
  userID: any;

  constructor(
    private server: ServerService,
    private modalService: NgbModal,
    private dataService: DataService,
    private tosterService: TosterService
  ) {}

  ngOnInit(): void {
    this.userID = this.dataService.userId;
    this.server.getUser(this.userID).subscribe((data) => {
      this.userData = data;
      this.getLatestPosts();
    });
  }
 
  fetchUserData(){
    
  }
  getLatestPosts() {
    const posts = this.userData.posts;
    this.latestPosts = posts.slice().sort((a: any, b: any) => b.id - a.id);
    this.displayedPosts = this.latestPosts.slice(0, this.postsPerPage); // Display the first 10 posts
  }

  showMorePosts() {
    const remainingPosts = this.latestPosts.slice(this.displayedPosts.length);
    const nextPosts = remainingPosts.slice(0, this.postsPerPage);
    this.displayedPosts = this.displayedPosts.concat(nextPosts);
  }
  showMoreComments() {
    this.visibleComments += 2;
  }

  editProfile() {
    this.dataService.editMode = true;
    const modalRef = this.modalService.open(SignUpComponent, {
      centered: true,
    });
    modalRef.componentInstance.userData = this.userData;
    console.log(modalRef.componentInstance.userData);
  }
  editPost(post: any) {
    this.dataService.editMode = true;
    const modalRef = this.modalService.open(AddPostComponent, {
      centered: true,
    });
    modalRef.componentInstance.post = post;
  }
  deletePost(post: any) {
    const postIndex = this.userData.posts.findIndex(
      (p: any) => p.id === post.id
    );
    const id = this.userID;
    if (postIndex !== -1) {
      this.userData.posts.splice(postIndex, 1);
      this.server.addPosts(id, this.userData).subscribe((res) => {
        this.tosterService.showSuccess('Post Deleted Successfully', 'Success');
      });
    } else {
      this.tosterService.showError('Post with ID not found in user data.', 'failed');

      console.log(`Post with ID ${post.id} not found in user data.`);
    }
  }
}
*/
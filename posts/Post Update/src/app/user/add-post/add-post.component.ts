import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/server.service';
import { DataService } from 'src/app/shared/data.service';
import { TosterService } from 'src/app/shared/toster.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnDestroy, OnInit {
  postForm!: FormGroup;
  userData: any;
  postID: any;
  currentDate: any;
  editmode: boolean;
  userID: any;
  @Input() post: any;

  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private dataService: DataService,
    private tosterService: TosterService
  ) {
    this.editmode = this.dataService.editMode;
    const date = new Date();
    this.currentDate = date.toLocaleString();
  }

  ngOnInit() {
    this.createPostForm();
    this.userID = this.dataService.userId;
    this.server.getUser(this.userID).subscribe((data) => {
      this.userData = data;
      this.postID = this.userData.posts.length + 1;
    });

    if (this.editmode) {
      if (this.post) {
        this.postForm.patchValue({
          title: this.post.title,
          content: this.post.content,
          image: this.post.image,
        });
      } else {
        this.tosterService.showError('not found in user data', 'failed');
        console.log(`Post with ID ${this.post.id} not found in user data.`);
      }
    }
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      userId: [this.userID],
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [''],
      likes: [0],
      comments: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      if (this.userID) {
        const userId = this.userID;
        const postData = this.postForm.value;
        postData.id = this.editmode ? this.post.id : this.userData.posts.length + 1;
        const successMessage = this.editmode ? 'Post Edited Successfully' : 'Post Added Successfully';
        const errorMessage = this.editmode ? 'not found in user data' : 'Failed to add Post';
       
        postData.createdAt = this.currentDate;

        if (this.editmode) {
          postData.likes = this.post.likes;
          postData.comments = this.post.comments;
          postData.createdAt = this.post.createdAt;
          const postIndex = this.userData.posts.findIndex(
            (post: any) => post.id === this.post.id
          );
          if (postIndex !== -1) {
            this.userData.posts[postIndex] = postData;
            this.server.updateUser(userId, this.userData).subscribe((res) => {
              this.tosterService.showSuccess(successMessage, 'Success');
              this.resetFormAndCloseModal()
            });
          } else {
            this.tosterService.showError(errorMessage, 'Error');
            console.log(`Post with ID ${postData.id} not found in user data.`);
          }
        } 
        
        else {
          this.userData.posts.push(postData);
          this.server.updateUser(userId, this.userData).subscribe({
            next: (res) => {
              this.tosterService.showSuccess('Post Added Successfully','Success');
              this.resetFormAndCloseModal()
            },
            error: (error) => {
              this.tosterService.showError(errorMessage,'Error');
              console.log('Failed to add Post',error)
            },
          });
        }
      }
    }

  }
  resetFormAndCloseModal() {
    this.postForm.reset();
    this.modalService.dismissAll();
    this.dataService.editMode = false;
  }

  close() {
    this.activeModal.close();
  }
  ngOnDestroy(): void {
    this.dataService.editMode = false;
  }
}
/*import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/server.service';
import { DataService } from 'src/app/shared/data.service';
import { HashtagServiceService } from 'src/app/shared/hashtag-service.service';
import { TosterService } from 'src/app/shared/toster.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnDestroy, OnInit {
  postForm!: FormGroup;
  userData: any;
  postID: any;
  currentDate: any;
  editmode: boolean;
  userID: any;
  @Input() post: any;

  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private dataService: DataService,
    private tosterService: TosterService
  ) {
    this.editmode = this.dataService.editMode;
    const date = new Date();
    this.currentDate = date.toLocaleString();
  }

  ngOnInit() {
    this.createPostForm();
    this.userID = this.dataService.userId;
    this.server.getUser(this.userID).subscribe((data) => {
      this.userData = data;
      this.postID = this.userData.posts.length + 1;
    });

    if (this.editmode) {
      if (this.post) {
        this.postForm.patchValue({
          title: this.post.title,
          content: this.post.content,
          image: this.post.image,
        });
      } else {
        this.tosterService.showError('not found in user data', 'failed');
        console.log(`Post with ID ${this.post.id} not found in user data.`);
      }
    }
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      userId: [this.userID],
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [''],
      likes: [0],
      comments: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      if (this.userID) {
        const userId = this.userID;
        const postData = this.postForm.value;
        postData.id = this.editmode
          ? this.post.id
          : this.userData.posts.length + 1;
        postData.createdAt = this.currentDate;

        if (this.editmode) {
          postData.likes = this.post.likes;
          postData.comments = this.post.comments;
          postData.createdAt = this.post.createdAt;
          const postIndex = this.userData.posts.findIndex(
            (post: any) => post.id === this.post.id
          );
          if (postIndex !== -1) {
            this.userData.posts[postIndex] = postData;
            this.server.addPosts(userId, this.userData).subscribe((res) => {
              this.tosterService.showSuccess(
                'Post Edited Successfully',
                'Success'
              );
              this.postForm.reset();
              this.modalService.dismissAll();
              this.dataService.editMode = false;

              // this.server.callGetAllUsersFunction();
            });
          } else {
            this.tosterService.showError('not found in user data', 'failed');
            console.log(`Post with ID ${postData.id} not found in user data.`);
          }
        } else {
          this.userData.posts.push(postData);
          this.server.addPosts(userId, this.userData).subscribe({
            next: (res) => {
              this.tosterService.showSuccess(
                'Post Added Successfully',
                'Success'
              );
              this.postForm.reset();
              this.modalService.dismissAll();
              // this.server.callGetAllUsersFunction();
            },
            error: (error) => {
              this.tosterService.showError('Failed to add Post', 'Error');
              console.log('Failed to add Post',error)
            },
          });
        }
      }
    }
  }

  close() {
    this.activeModal.close();
  }
  ngOnDestroy(): void {
    this.dataService.editMode = false;
  }
}
*/
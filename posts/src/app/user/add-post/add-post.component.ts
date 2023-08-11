import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  postForm!: FormGroup;
  userData: any;
  postID:any;
  currentDate:any;
  constructor(
    private formBuilder: FormBuilder,
    private server: ServerService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.createPostForm();
    this.server
      .getUser(this.server.userId)
      .subscribe((data) => {
        (this.userData = data)
        console.log(this.userData)
         this.postID = this.userData.posts.length + 1;
      });
      const date = new Date();
      this.currentDate = date.toLocaleString();
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      userId: [this.server.userId],
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [''],
      likes: [0],
      comments: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      if (this.server.userId) {
        const userId = this.server.userId;
        const postData = this.postForm.value;
        postData.id = this.postID
        postData.createdAt = this.currentDate
        console.log(postData.id)
        this.userData.posts.push(postData)
        console.log( this.userData)
          this.server.addPosts(userId, this.userData).subscribe((res) => {
            this.server.showSuccess('Post Added Succesfully','Succesfull')            
            this.postForm.reset();
            this.modalService.dismissAll()
            this.server.callGetAllUsersFunction();
          });        
      }
    }
  }
  close(){
this.activeModal.close()
  }
}

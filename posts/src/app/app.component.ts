// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Posts';

  userRegistered: boolean = false;

  constructor(private formBuilder: FormBuilder, private server: ServerService) {
  }



  ngOnInit() {}

 

 

  // newComment: any;
  // // users: any;

  //  users: any[] = [
  //   {
  //     id: 1,
  //     name: 'Paragnhale',
  //     posts: [
  //       {
  //         id: 1,
  //         title: 'First Post',
  //         content: 'This is my first post!',
  //         likes: 0,
  //         comments: ['hey bro how are you 1', 'Comment 2']
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'Paragnhale123',
  //     posts: [
  //       {
  //         id: 1,
  //         title: 'First Post123',
  //         content: 'This is my first post123!',
  //         likes: 0,
  //         comments: ['hey bro how are you 123', 'Comment 132']
  //       }
  //     ]
  //   }
  // ];

  // constructor(private userService: ServerService) {}

  // ngOnInit(): void {
  //   // this.getUserById(1); // Corrected the user ID to 1
  // }

  // getUserById(userId: number): void {
  //   this.userService.getUser(userId).subscribe(
  //     response => {
  //       this.users = [response];
  //       console.log('User retrieved successfully:', response);
  //     },
  //     error => {
  //       console.error('Error retrieving user:', error);
  //     }
  //   );
  // }

  // addCommentToPost(userId: number, postId: number, comment: string): void {
  //   this.userService.addComment(userId, postId, comment).subscribe(
  //     response => {
  //       this.getUserById(1); // Corrected the user ID to 1
  //       console.log('Comment added successfully:', response);
  //     },
  //     error => {
  //       console.error('Error adding comment:', error);
  //     }
  //   );
  // // }
  // addCommentToPost(userId: number, postId: number, comment: string): void {
  //   const user = this.users.find((u) => u.id === userId);
  //   if (user) {
  //     const post = user.posts.find((p:any) => p.id === postId);
  //     if (post) {
  //       post.comments.push(comment);
  //     }
  //   }
  // }

  // addLikeToPost(userId: number, postId: number): void {
  //   const user = this.users.find((u) => u.id === userId);
  //   if (user) {
  //     const post = user.posts.find((p:any) => p.id === postId);
  //     if (post) {
  //       post.likes++;
  //     }
  //   }
  // }

  // // addLikeToPost(userId: number, postId: number): void {
  //   this.userService.addLike(userId, postId).subscribe(
  //     response => {
  //       this.getUserById(1); // Corrected the user ID to 1
  //       console.log('Like added successfully:', response);
  //     },
  //     error => {
  //       console.error('Error adding like:', error);
  //     }
  //   );
  // }
}

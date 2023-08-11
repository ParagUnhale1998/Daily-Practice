import { Component } from '@angular/core';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  allUsers: any[] = [];
  newComment: string = '';
  userdata: any;
  userIsRegistered: boolean = false;
  visibleComments: number = 2; // Number of comments initially visible
  likedPosts: Set<string> = new Set(); // Set to store liked post IDs for the current user
  latestPosts: any[] = [];
  displayedPosts: any[] = [];
  initialPostsToShow: number = 10;
  allPosts: any[] = [];
  searchInput:any;

  constructor(private server: ServerService) {
    this.server.getAllUsersFunction$.subscribe(() => {
      this.getallUsers();
    });
  }

  ngOnInit(): void {

    this.server.getUserIsRegister().subscribe((isRegistered) => {
      this.userIsRegistered = isRegistered;
    });
   
    this.getallUsers()
   
   
    
  }
  getallUsers(){
    this.server.getAllUser().subscribe((users) => {
      this.allUsers = users;
      this.getLatestPosts()
    });
  }

  getLatestPosts() {
    this.allUsers.forEach((user) => {
      if (user.posts.length > 0) {
        // Sort the posts of each user in descending order based on the 'createdAt' property (latest first)
        user.posts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
        // Add all posts of the user to the latestPosts array
        this.latestPosts.push(...user.posts);
      }
    });
  
    // Sort the latestPosts array in descending order based on the 'createdAt' property (latest first)
    this.latestPosts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
    // Get the first 10 posts initially
    this.displayedPosts = this.latestPosts.slice(0, this.initialPostsToShow);
  }
  
  showMorePosts() {
    // Calculate the index of the last post to be displayed after adding more posts
    const endIndex = this.displayedPosts.length + this.initialPostsToShow;
    // Get the additional posts to be displayed
    const additionalPosts = this.latestPosts.slice(this.displayedPosts.length, endIndex);
    // Add the additional posts to the displayedPosts array
    this.displayedPosts.push(...additionalPosts);
  }

  addlike(post: any) {
    // Check if the post is already liked by the user
    if (this.likedPosts.has(post.id)) {
      console.log('Post is already liked by the user.');
    } else {
      // Increment the likes count and add the post ID to the likedPosts Set
      post.likes++;
      this.likedPosts.add(post.id);
      console.log(this.likedPosts)
      this.userdata = this.allUsers.find(
        (user) => user.username === post.userId
      );

      if (this.userdata) {
        // Find the index of the post in the userdata's posts array
        const postIndex = this.userdata.posts.findIndex(
          (p: any) => p.id === post.id
        );

        if (postIndex !== -1) {
          // Update the userdata with the modified post
          this.userdata.posts[postIndex] = post;
          console.log(this.userdata);
          // Save the updated userdata to the server or wherever you are storing the data
          this.server
            .addPosts(this.userdata.id, this.userdata)
            .subscribe(() => {
              console.log('User updated successfully with new comment');
              alert('Comments added successfully');
            });
        } else {
          console.log(`Post with ID ${post.id} not found in user data.`);
        }
      } else {
        console.log(`User with username ${post.userId} not found.`);
      }
    }
  }

  addComment(post: any, commentText: string) {
    if (commentText.trim() !== '') {
      const newComment = {
        id: post.comments.length + 1,
        postId: post.id,
        postUserId: post.userId,
        userId: this.server.userId, // Replace with the ID of the currently logged-in user
        comment: commentText,
      };

      post.comments.push(newComment);

      // Find the user data associated with the post
      this.userdata = this.allUsers.find(
        (user) => user.username === post.userId
      );

      if (this.userdata) {
        // Find the index of the post in the userdata's posts array
        const postIndex = this.userdata.posts.findIndex(
          (p: any) => p.id === post.id
        );

        if (postIndex !== -1) {
          // Update the userdata with the modified post
          this.userdata.posts[postIndex] = post;
          console.log(this.userdata);
          // Save the updated userdata to the server or wherever you are storing the data
          this.server
            .addPosts(this.userdata.id, this.userdata)
            .subscribe(() => {
              console.log('User updated successfully with new comment');
              alert('Comments added successfully');
            });
        } else {
          console.log(`Post with ID ${post.id} not found in user data.`);
        }
      } else {
        console.log(`User with username ${post.userId} not found.`);
      }

  
      this.newComment = '';
    }
  }
  showMoreComments() {
   
    this.visibleComments += 2; 

  }
}


/*
// ... (same imports and component definition as before)

export class AllPostsComponent {
  // ... (same properties and OnInit as before)

  updateUserData(post: any) {
    // Find the user data associated with the post
    this.userdata = this.allUsers.find((user) => user.username === post.userId);

    if (this.userdata) {
      // Find the index of the post in the userdata's posts array
      const postIndex = this.userdata.posts.findIndex((p: any) => p.id === post.id);

      if (postIndex !== -1) {
        // Update the userdata with the modified post
        this.userdata.posts[postIndex] = post;
        console.log(this.userdata);
        // Save the updated userdata to the server or wherever you are storing the data
        this.server.addPosts(this.userdata.id, this.userdata).subscribe(() => {
          console.log('User updated successfully with new comment');
          alert('Comments added successfully');
        });
      } else {
        console.log(`Post with ID ${post.id} not found in user data.`);
      }
    } else {
      console.log(`User with username ${post.userId} not found.`);
    }
  }

  addlike(post: any) {
    if (this.likedPosts.has(post.id)) {
      console.log('Post is already liked by the user.');
    } else {
      post.likes++;
      this.likedPosts.add(post.id);
      this.updateUserData(post);
    }
  }

  addComment(post: any, commentText: string) {
    // ... (same logic as before)
    this.updateUserData(post);
  }

  // ... (same showMoreComments and other parts as before)
}
*/
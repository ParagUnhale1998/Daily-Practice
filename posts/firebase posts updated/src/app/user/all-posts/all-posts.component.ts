import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { DataService } from 'src/app/shared/data.service';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { HashtagServiceService } from 'src/app/shared/hashtag-service.service';

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
  visibleComments: number = 2;
  likedPosts: Set<string> = new Set();
  latestPosts: any[] = [];
  displayedPosts: any[] = [];
  initialPostsToShow: number = 10;
  // allPosts: any[] = [];
  searchInput: any;
  hashtagName: string = '';
  filteredPosts: any[] = [];
  allPostss: any[] = [];
  constructor(
    private server: ServerService,
    private dataService: DataService,
    private hashtagService: HashtagServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fireservice: FirestoreService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.hashtagName = params.get('hashtag') || '';
      console.log(this.hashtagName);
      this.filterPostsByHashtag()
      // this.loadUserData();
    });

    this.dataService.getUserIsRegister().subscribe((isRegistered) => {
      this.userIsRegistered = isRegistered;
    });

    const likedPostsString = localStorage.getItem('likedPosts');
    if (likedPostsString) {
      console.log(likedPostsString);
      this.likedPosts = new Set(JSON.parse(likedPostsString));
    }
    this.loadAllUserPosts();
  }

  loadUserData() {
    this.dataService.getAllUsersFunction$.subscribe(() => {
      this.filterPostsByHashtag();
    });
  }

  async loadAllUserPosts() {
    try {
      this.allUsers = await this.fireservice.getAllUsers();
      console.log('All users:', this.allUsers);

      for (const user of this.allUsers) {
        const UserallPosts = await this.fireservice.getAllUserPosts(user.id);
        console.log(`Posts for user ${user.id}:`, UserallPosts);

        // Update each post with username and userprofilepic
        const updatedPosts = UserallPosts.map((post) => {
          return {
            ...post,
            name: user.name, // Replace with the actual property name in your user object
            profilePic: user.profilePic, // Replace with the actual property name in your user object
          };
        });

        this.allPostss.push(...updatedPosts);
        console.log(this.allPostss);
      }
      this.allPostss.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
      this.displayedPosts = this.allPostss.slice(0, this.initialPostsToShow);
      this.hashtagService.updateTrendingHashtags(this.allPostss);
      // this.filterPostsByHashtag();
    } catch (error) {
      console.error('Error fetching users and posts:', error);
    }
    console.log(this.allPostss);
  }

  filterPostsByHashtag() {
    this.filteredPosts = [];
    this.allPostss.forEach((post: any) => {
      const hashtags = this.hashtagService.extractHashtagsFromPostContent(
        post.content
      );
      if (hashtags.includes(this.hashtagName)) {
        this.filteredPosts.push(post);
      }
    });

    this.filteredPosts.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    console.log('filetpost', this.filteredPosts);
  }

  showMorePosts() {
    // Calculate the index of the last post to be displayed after adding more posts
    const endIndex = this.displayedPosts.length + this.initialPostsToShow;
    // Get the additional posts to be displayed
    const additionalPosts = this.allPostss.slice(
      this.displayedPosts.length,
      endIndex
    );
    // Add the additional posts to the displayedPosts array
    this.displayedPosts.push(...additionalPosts);
  }

  async addlike(post: any) {
    const userId = post.userId;
    const postId = post.id;

    if (this.likedPosts.has(postId)) {
      console.log('Post is already liked by the user.');
    } else {
      // Increment the likes count and add the post ID to the likedPosts Set
      post.likes++;
      this.likedPosts.add(postId);
      localStorage.setItem(
        'likedPosts',
        JSON.stringify(Array.from(this.likedPosts))
      );

      const postIndex = this.allPostss.findIndex((p: any) => p.id === post.id);

      if (postIndex !== -1) {
        // Update the userdata with the modified post
        this.allPostss[postIndex] = post;

        await this.fireservice.incrementLikes(userId, postId);

        // Reload or refresh the post after incrementing likes
        // ...
      }
    }
  }
  async addComment(post: any, commentText: string) {
    console.log(this.newComment);
    if (commentText.trim() === '') {
      return;
    }

    const userId = post.userId;
    const postId = post.id;

    const newComment = {
      id: post.comments.length + 1,
      postId: post.id,
      postUserId: post.userId,
      userName: this.dataService.userName,
      userProfile: this.dataService.userProfilePic,
      userId: this.dataService.userId, // Replace with the ID of the currently logged-in user
      comment: commentText,
    };

    post.comments.push(newComment);

    const postIndex = this.allPostss.findIndex((p: any) => p.id === post.id);

    if (postIndex !== -1) {
      this.allPostss[postIndex] = post;
      await this.fireservice.addCommentToPost(userId, postId, newComment);
    }

    this.newComment = '';
  }

  showMoreComments() {
    this.visibleComments += 2;
  }

  navigateToUser(post: any) {
    // this.router.navigateByUrl('/showUser')
    this.router.navigateByUrl(`/profile?id=${post.userId}`);
  }
}
/*
  private updatePostInUserData(updatedPost: any) {
    this.userdata = this.allUsers.find(
      (user) => user.username === updatedPost.userId
    );

    if (this.userdata) {
      const postIndex = this.userdata.posts.findIndex(
        (p: any) => p.id === updatedPost.id
      );

      if (postIndex !== -1) {
        this.userdata.posts[postIndex] = updatedPost;

        this.server.updateUser(this.userdata.id, this.userdata).subscribe({
          next: () => {
            console.log('User data updated successfully with new content');
          },
          error: (error) => {
            console.error('Error updating user data:', error);
          },
        });
      } else {
        console.log(`Post with ID ${updatedPost.id} not found in user data.`);
      }
    } else {
      console.log(`User with username ${updatedPost.userId} not found.`);
    }
  }*/
/* old code without clean
import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { DataService } from 'src/app/shared/data.service';
import { HashtagServiceService } from 'src/app/shared/hashtag-service.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent{

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
  hashtagName: string = '';
  filteredPosts: any[] = [];
  
  constructor(private server: ServerService,private dataService:DataService,private hashtagService:HashtagServiceService ,private route: ActivatedRoute) {
    this.dataService.getAllUsersFunction$.subscribe(() => {
      this.getallUsers();
    });
    this.getallUsers()
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.hashtagName = params.get('hashtag') || '';
      // this.getallUsers()
    });

    this.dataService.getUserIsRegister().subscribe((isRegistered) => {
      this.userIsRegistered = isRegistered;
    });
   
    const likedPostsString = localStorage.getItem('likedPosts');
    if (likedPostsString) {
      console.log(likedPostsString)
      this.likedPosts = new Set(JSON.parse(likedPostsString));
    }

   
    
  }
 
  getallUsers(){
    this.server.getAllUser().subscribe((users) => {
      this.allUsers = users;
      this.hashtagService.updateTrendingHashtags(this.allUsers);
      this.getLatestPosts()
      this.filterPostsByHashtag();
    });
  }
 
  filterPostsByHashtag() {
    this.filteredPosts = [];

    this.allUsers.forEach((user: any) => {
      user.posts.forEach((post: any) => {
        const hashtags = this.hashtagService.extractHashtagsFromPostContent(post.content);
        if (hashtags.includes(this.hashtagName)) {
          post.profilePic = user.profilePic;
          post.name = user.name;
          this.filteredPosts.push(post);
           this.filteredPosts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
           console.log(this.filteredPosts)
        }
      });
    });
  }

  getLatestPosts() {

    this.allUsers.forEach((user) => {
      if (user.posts.length > 0) {
        user.posts.forEach((post: any) => {
          post.profilePic = user.profilePic;
          post.name = user.name;
        });

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
      localStorage.setItem('likedPosts', JSON.stringify(Array.from(this.likedPosts)));

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
              // alert('Comments added successfully');
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
        userId: this.dataService.userId, // Replace with the ID of the currently logged-in user
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
              // alert('Comments added successfully');
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
*/

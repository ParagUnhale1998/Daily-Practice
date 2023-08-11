// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  searchInput: any;
  visibleComments: number = 2;
  userData: any;
  latestPosts: any[] = [];
  displayedPosts: any[] = [];
  postsPerPage: number = 2;
  constructor(private server: ServerService) { }

  ngOnInit(): void {
    const id = this.server.userId;
    this.server.getUser(id).subscribe(data => {
      this.userData = data;
      this.getLatestPosts();
    });
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
}

import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-show-user-profile',
  templateUrl: './show-user-profile.component.html',
  styleUrls: ['./show-user-profile.component.scss']
})
export class ShowUserProfileComponent implements OnInit{
  userID:any;
  userData:any;
  searchInput: any;
  visibleComments: number = 2;
  latestPosts: any[] = [];
  displayedPosts: any[] = [];
  postsPerPage: number = 2;

 constructor(private route: ActivatedRoute,private server:ServerService){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.userID = params.get('id') || '';
    });
    this.fetchUserData()
  }

  fetchUserData(){
    this.server.getUser(this.userID).subscribe({
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


}

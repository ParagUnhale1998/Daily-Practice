import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { HashtagServiceService } from 'src/app/shared/hashtag-service.service';

@Component({
  selector: 'app-trending-posts',
  templateUrl: './trending-posts.component.html',
  styleUrls: ['./trending-posts.component.scss']
})
export class TrendingPostsComponent implements OnInit{
  hashtagName: string = '';
  allUsers: any;
  filteredPosts: any[] = [];
  searchInput:any;
  constructor(private route: ActivatedRoute,private server:ServerService,private hashtagService:HashtagServiceService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.hashtagName = params.get('hashtag') || '';
      this.getallUsers()
    });
    
  }
  
   getallUsers(){
    this.server.getAllUser().subscribe((users) => {
      this.allUsers = users;
      this.filterPostsByHashtag();
    });
  }

  filterPostsByHashtag() {
    this.filteredPosts = [];

    this.allUsers.forEach((user: any) => {
      user.posts.forEach((post: any) => {
        const hashtags = this.hashtagService.extractHashtagsFromPostContent(post.content);
        if (hashtags.includes(this.hashtagName)) {
          this.filteredPosts.push(post);
          
        }
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { HashtagServiceService } from 'src/app/shared/hashtag-service.service';

@Component({
  selector: 'app-trending-posts',
  templateUrl: './trending-posts.component.html',
  styleUrls: ['./trending-posts.component.scss'],
})
export class TrendingPostsComponent implements OnInit {
  hashtagName: string = '';
  allUsers: any;
  filteredPosts: any[] = [];
  searchInput: any;
  allPosts: any;
  constructor(
    private route: ActivatedRoute,
    private server: ServerService,
    private hashtagService: HashtagServiceService,
    private fireservice: FirestoreService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.hashtagName = params.get('hashtag') || '';
      this.getallUsers();
    });
  }

  getallUsers() {
    this.server.getAllUser().subscribe((users) => {
      this.allUsers = users;
      this.filterPostsByHashtag();
    });
  }

  async filterPostsByHashtag() {
    this.filteredPosts = [];

    try {
      this.allUsers = await this.fireservice.getAllUsers();

      for (const user of this.allUsers) {
        const UserallPosts = await this.fireservice.getAllUserPosts(user.id);

        const updatedPosts = UserallPosts.map((post) => {
          return {
            ...post,
            name: user.name,
            profilePic: user.profilePic,
          };
        });

        this.allPosts.push(...updatedPosts);
      }

      this.allPosts.forEach((post: any) => {
        const hashtags = this.hashtagService.extractHashtagsFromPostContent(
          post.content
        );
        if (hashtags.includes(this.hashtagName)) {
          this.filteredPosts.push(post);
        }
      });
    } catch (error) {
      console.error('Error fetching users and posts:', error);
    }
  }
}

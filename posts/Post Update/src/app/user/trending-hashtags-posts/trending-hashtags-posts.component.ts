import { Component ,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { HashtagServiceService } from 'src/app/shared/hashtag-service.service';

@Component({
  selector: 'app-trending-hashtags-posts',
  templateUrl: './trending-hashtags-posts.component.html',
  styleUrls: ['./trending-hashtags-posts.component.scss']
})
export class TrendingHashtagsPostsComponent implements AfterViewInit {
  trendingHashtags: any[] = [];

  constructor(private hastagService: HashtagServiceService,private dataService:DataService,private router:Router) {
 
   }

  ngAfterViewInit(): void {
    this.hastagService.trendingHashtags$.subscribe((hashtags) => {
      this.trendingHashtags = hashtags;
    });
  }

  navigateToHashtag(hashtagName:any){
    this.router.navigateByUrl(`allposts?hashtag=${hashtagName}`)
    this.dataService.callGetAllUsersFunction();
  }
}

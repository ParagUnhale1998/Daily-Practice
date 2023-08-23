import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

export interface Hashtag {
  name: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class HashtagServiceService {
  
  trendingHashtags: Hashtag[] = [];
  
  private trendingHashtagsSubject = new BehaviorSubject<Hashtag[]>([]);
  trendingHashtags$ = this.trendingHashtagsSubject.asObservable();

  extractHashtagsFromPostContent(content: string): string[] {
    // Regular expression to find hashtags in the post content
    const regex = /#(\w+)/g;
    const matches = content.match(regex);

    if (matches) {
      // Remove the '#' character from the matches
      return matches.map(match => match.substring(1));
    }

    return [];
  }


  updateTrendingHashtags(allUsers:any): void {
    // Clear the existing trending hashtags
    this.trendingHashtags = [];

    // Your logic to extract hashtags from all posts and update the trendingHashtags array
    const hashtagsMap: Map<string, number> = new Map();
    allUsers.forEach((user:any) => {
      user.posts.forEach((post:any) => {
        const hashtags = this.extractHashtagsFromPostContent(post.content);
        hashtags.forEach((tag:any) => {
          const count = hashtagsMap.get(tag) || 0;
          hashtagsMap.set(tag, count + 1);
        });
      });
    });

    // Convert the map to an array of Hashtag objects
    this.trendingHashtags = Array.from(hashtagsMap.entries()).map(([name, count]) => ({ name, count }));

    // Sort the trending hashtags based on count in descending order
    this.trendingHashtags.sort((a, b) => b.count - a.count);

    // Get the top ten hashtags
    this.trendingHashtags = this.trendingHashtags.slice(0, 10);
    this.trendingHashtagsSubject.next(this.trendingHashtags);

  }


}

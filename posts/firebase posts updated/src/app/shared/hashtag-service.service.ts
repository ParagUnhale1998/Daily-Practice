import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { FirestoreService } from './firestore.service';

export interface Hashtag {
  name: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class HashtagServiceService {
  
  constructor(private fireservice:FirestoreService){}
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


  updateTrendingHashtags(allPostss:any): void {
    // Clear the existing trending hashtags
    this.trendingHashtags = [];

    // Your logic to extract hashtags from all posts and update the trendingHashtags array
    const hashtagsMap: Map<string, number> = new Map();
 console.log('allposthashtag0,',allPostss)
    allPostss.forEach((post:any) => {
        const hashtags = this.extractHashtagsFromPostContent(post.content);
        hashtags.forEach((tag:any) => {
          const lowercaseTag = tag.toLowerCase();
          const count = hashtagsMap.get(lowercaseTag) || 0;
          hashtagsMap.set(lowercaseTag, count + 1);
        });
      });
    

    // Convert the map to an array of Hashtag objects
    this.trendingHashtags = Array.from(hashtagsMap.entries()).map(([name, count]) => ({ name, count }));

    // Sort the trending hashtags based on count in descending order
    this.trendingHashtags.sort((a, b) => b.count - a.count);

    // Get the top ten hashtags
    this.trendingHashtags = this.trendingHashtags.slice(0, 5);
     console.log(this.trendingHashtags)
    this.trendingHashtagsSubject.next(this.trendingHashtags);

  }


}

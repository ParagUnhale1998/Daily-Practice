import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingHashtagsPostsComponent } from './trending-hashtags-posts.component';

describe('TrendingHashtagsPostsComponent', () => {
  let component: TrendingHashtagsPostsComponent;
  let fixture: ComponentFixture<TrendingHashtagsPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingHashtagsPostsComponent]
    });
    fixture = TestBed.createComponent(TrendingHashtagsPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

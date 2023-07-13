import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Services4LearningComponent } from './services4-learning.component';

describe('Services4LearningComponent', () => {
  let component: Services4LearningComponent;
  let fixture: ComponentFixture<Services4LearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Services4LearningComponent]
    });
    fixture = TestBed.createComponent(Services4LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

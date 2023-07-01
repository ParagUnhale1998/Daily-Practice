import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Components1LearningComponent } from './components1-learning.component';

describe('Components1LearningComponent', () => {
  let component: Components1LearningComponent;
  let fixture: ComponentFixture<Components1LearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Components1LearningComponent]
    });
    fixture = TestBed.createComponent(Components1LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

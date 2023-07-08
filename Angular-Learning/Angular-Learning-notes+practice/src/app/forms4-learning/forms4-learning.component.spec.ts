import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forms4LearningComponent } from './forms4-learning.component';

describe('Forms4LearningComponent', () => {
  let component: Forms4LearningComponent;
  let fixture: ComponentFixture<Forms4LearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Forms4LearningComponent]
    });
    fixture = TestBed.createComponent(Forms4LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

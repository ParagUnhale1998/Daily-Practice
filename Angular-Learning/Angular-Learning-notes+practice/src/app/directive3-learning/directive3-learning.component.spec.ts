import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Directive3LearningComponent } from './directive3-learning.component';

describe('Directive3LearningComponent', () => {
  let component: Directive3LearningComponent;
  let fixture: ComponentFixture<Directive3LearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Directive3LearningComponent]
    });
    fixture = TestBed.createComponent(Directive3LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

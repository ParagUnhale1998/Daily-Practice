import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCycleHook5LearningComponent } from './life-cycle-hook5-learning.component';

describe('LifeCycleHook5LearningComponent', () => {
  let component: LifeCycleHook5LearningComponent;
  let fixture: ComponentFixture<LifeCycleHook5LearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeCycleHook5LearningComponent]
    });
    fixture = TestBed.createComponent(LifeCycleHook5LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

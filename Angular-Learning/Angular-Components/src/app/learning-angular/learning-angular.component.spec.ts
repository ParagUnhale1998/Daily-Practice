import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningAngularComponent } from './learning-angular.component';

describe('LearningAngularComponent', () => {
  let component: LearningAngularComponent;
  let fixture: ComponentFixture<LearningAngularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningAngularComponent]
    });
    fixture = TestBed.createComponent(LearningAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

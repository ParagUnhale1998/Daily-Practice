import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBinding1LearningComponent } from './data-binding1-learning.component';

describe('DataBinding1LearningComponent', () => {
  let component: DataBinding1LearningComponent;
  let fixture: ComponentFixture<DataBinding1LearningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataBinding1LearningComponent]
    });
    fixture = TestBed.createComponent(DataBinding1LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

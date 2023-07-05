import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLearning6Component } from './api-learning6.component';

describe('ApiLearning6Component', () => {
  let component: ApiLearning6Component;
  let fixture: ComponentFixture<ApiLearning6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiLearning6Component]
    });
    fixture = TestBed.createComponent(ApiLearning6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

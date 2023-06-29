import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPostUdemyComponent } from './angular-post-udemy.component';

describe('AngularPostUdemyComponent', () => {
  let component: AngularPostUdemyComponent;
  let fixture: ComponentFixture<AngularPostUdemyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularPostUdemyComponent]
    });
    fixture = TestBed.createComponent(AngularPostUdemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

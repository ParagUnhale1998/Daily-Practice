import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFundamentalsUdemyComponent } from './angular-fundamentals-udemy.component';

describe('AngularFundamentalsUdemyComponent', () => {
  let component: AngularFundamentalsUdemyComponent;
  let fixture: ComponentFixture<AngularFundamentalsUdemyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularFundamentalsUdemyComponent]
    });
    fixture = TestBed.createComponent(AngularFundamentalsUdemyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

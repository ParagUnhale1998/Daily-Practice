import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHotelComponent } from './register-hotel.component';

describe('RegisterHotelComponent', () => {
  let component: RegisterHotelComponent;
  let fixture: ComponentFixture<RegisterHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterHotelComponent]
    });
    fixture = TestBed.createComponent(RegisterHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

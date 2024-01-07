import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUSComponent } from './contact-us.component';

describe('ContactUSComponent', () => {
  let component: ContactUSComponent;
  let fixture: ComponentFixture<ContactUSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUSComponent]
    });
    fixture = TestBed.createComponent(ContactUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

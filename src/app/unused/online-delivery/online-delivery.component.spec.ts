import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDeliveryComponent } from './online-delivery.component';

describe('OnlineDeliveryComponent', () => {
  let component: OnlineDeliveryComponent;
  let fixture: ComponentFixture<OnlineDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

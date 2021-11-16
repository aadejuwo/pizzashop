import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzashopPaymentComponent } from './pizzashop-payment.component';

describe('PizzashopPaymentComponent', () => {
  let component: PizzashopPaymentComponent;
  let fixture: ComponentFixture<PizzashopPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzashopPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzashopPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

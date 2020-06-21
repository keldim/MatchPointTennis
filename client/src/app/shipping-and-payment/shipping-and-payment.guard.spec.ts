import { TestBed, async, inject } from '@angular/core/testing';

import { ShippingAndPaymentGuard } from './shipping-and-payment.guard';

describe('ShippingAndPaymentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShippingAndPaymentGuard]
    });
  });

  it('should ...', inject([ShippingAndPaymentGuard], (guard: ShippingAndPaymentGuard) => {
    expect(guard).toBeTruthy();
  }));
});

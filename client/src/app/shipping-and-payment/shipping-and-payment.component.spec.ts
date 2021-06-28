import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShippingAndPaymentComponent } from './shipping-and-payment.component';
import { By } from '@angular/platform-browser';

describe('ShippingAndPaymentComponent', () => {
  let component: ShippingAndPaymentComponent;
  let fixture: ComponentFixture<ShippingAndPaymentComponent>;
  let mockRouter, mockBackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockBackendService = jasmine.createSpyObj(['getBackendURL']);
    TestBed.configureTestingModule({
      declarations: [ShippingAndPaymentComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BackendService, useValue: mockBackendService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should send request to get shipping and payment info', () => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ShippingAndPaymentComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    const request = httpTestingController.expectOne(
      {
        method: 'GET',
        url: "http://localhost:5000/form-input/ephemeral-data"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  });

  it('should send shipping and payment info when the \'Continue\' button is clicked', () => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ShippingAndPaymentComponent);
    component = fixture.componentInstance;
    component.shoppingAndPaymentInfo = {};
    component.shippingAndPaymentForm = new FormBuilder().group({
      firstName: "josh",
      lastName: "lee",
      email: "random@email.com",
      phoneNumber: "1111111111",

      address1: "random address",
      address2: "random address",
      city: "Ann Arbor",
      state: "MI",
      zipcode: "10456",

      cardNumber: "0000000000000000",
      expGroup: new FormBuilder().group({
        expMonth: "12",
        expYear: "2025"
      }),
      cvc: "301"
    });
    fixture.detectChanges();
    fixture.debugElement.query(By.css(".right-button")).triggerEventHandler('click', {});

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/form-input/data"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  });

  it('should send request for clean up when the \'window:beforeunload\' event is triggered', () => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ShippingAndPaymentComponent);
    component = fixture.componentInstance;
    window.dispatchEvent(new Event('beforeunload'));

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/form-input/clean-up"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  });

  it('should send cancel request when the \'Cancel\' button is clicked', () => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ShippingAndPaymentComponent);
    component = fixture.componentInstance;
    component.shoppingAndPaymentInfo = {};
    component.shippingAndPaymentForm = new FormBuilder().group({
      firstName: "josh",
      lastName: "lee",
      email: "random@email.com",
      phoneNumber: "1111111111",

      address1: "random address",
      address2: "random address",
      city: "Ann Arbor",
      state: "MI",
      zipcode: "10456",

      cardNumber: "0000000000000000",
      expGroup: new FormBuilder().group({
        expMonth: "12",
        expYear: "2025"
      }),
      cvc: "301"
    });
    fixture.detectChanges();
    fixture.debugElement.query(By.css(".left-button")).triggerEventHandler('click', {});

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/form-input/cancel"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  });
});

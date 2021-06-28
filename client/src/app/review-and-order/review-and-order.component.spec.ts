import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgZone, NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { By } from '@angular/platform-browser';

import { ReviewAndOrderComponent } from './review-and-order.component';

describe('ReviewAndOrderComponent', () => {
  let component: ReviewAndOrderComponent;
  let fixture: ComponentFixture<ReviewAndOrderComponent>;
  let mockRouter, mockBackendService, mockAuthService, mockStorageService;
  let zone;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['getSelectedRacquets', 'getSelectedShoes', 'getSelectedApparel', 'getSelectedItems',
      'getTotal', 'watchRacquets', 'watchShoes', 'watchApparel', 'watchItems', 'watchTotal', 'clear']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockBackendService = jasmine.createSpyObj(['getBackendURL']);
    mockAuthService = {
      isLoggedIn: (input: any) => { return new Promise<void>(resolve => resolve()); },
      getAccessToken: (input: any) => { return new Promise<void>(resolve => resolve()); },
      loginChanged: of()
    };
    TestBed.configureTestingModule({
      declarations: [ReviewAndOrderComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BackendService, useValue: mockBackendService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: StorageService, useValue: mockStorageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should send request to get shipping and payment info', fakeAsync(() => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.watchRacquets.and.returnValue(of([]));
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchItems.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ReviewAndOrderComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'GET',
        url: "http://localhost:5000/form-input/ephemeral-data"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  }));

  it('should send cancel request when the \'Cancel\' button is clicked', () => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.watchRacquets.and.returnValue(of([]));
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchItems.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ReviewAndOrderComponent);
    component = fixture.componentInstance;
    component.shoppingAndPaymentInfo = {
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
      expGroup: {
        expMonth: "12",
        expYear: "2025"
      },
      cvc: "301"
    };
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

  it('should send credit card charge request for registered user', fakeAsync(() => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.clear.and.returnValue(null);
    zone = TestBed.get(NgZone);
    spyOn(zone, 'run').and.callFake((fn: Function) => fn());
    spyOn(localStorage, 'getItem')
      .and.returnValue([]);
    mockStorageService.watchRacquets.and.returnValue(of([]));
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchItems.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ReviewAndOrderComponent);
    component = fixture.componentInstance;
    component.shoppingAndPaymentInfo = {
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
      expGroup: {
        expMonth: "12",
        expYear: "2025"
      },
      cvc: "301"
    };
    component.isLoggedIn = true;
    fixture.detectChanges();
    component.chargeCard("randomToken");
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/registered-user/charge"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  }));

  it('should send credit card charge request for unregistered user', fakeAsync(() => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.clear.and.returnValue(null);
    zone = TestBed.get(NgZone);
    spyOn(zone, 'run').and.callFake((fn: Function) => fn());
    spyOn(localStorage, 'getItem')
      .and.returnValue([]);
    mockStorageService.watchRacquets.and.returnValue(of([]));
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchItems.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(ReviewAndOrderComponent);
    component = fixture.componentInstance;
    component.shoppingAndPaymentInfo = {
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
      expGroup: {
        expMonth: "12",
        expYear: "2025"
      },
      cvc: "301"
    };
    // component.isLoggedIn = true;
    fixture.detectChanges();
    component.chargeCard("randomToken");
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/unregistered-user/charge"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  }));

});

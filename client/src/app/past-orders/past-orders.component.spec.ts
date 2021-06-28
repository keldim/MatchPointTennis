import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgZone, NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { FormsModule } from '@angular/forms';
import { PastOrdersComponent } from './past-orders.component';

describe('PastOrdersComponent', () => {
  let component: PastOrdersComponent;
  let fixture: ComponentFixture<PastOrdersComponent>;
  let mockAuthService, mockRouter, mockBackendService;
  let zone;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['getAccessToken']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockBackendService = jasmine.createSpyObj(['getBackendURL']);
    TestBed.configureTestingModule({
      declarations: [PastOrdersComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: BackendService, useValue: mockBackendService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should send request for past orders', fakeAsync(() => {
    mockAuthService.getAccessToken.and.returnValue(
      new Promise<void>(resolve => resolve())
    );
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockRouter.navigate.and.returnValue(null);
    zone = TestBed.get(NgZone);
    spyOn(zone, 'run').and.callFake((fn: Function) => fn());
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(PastOrdersComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/registered-user/past-orders"
      }
    );
    request.flush({});
    httpTestingController.verify();
  }));
});

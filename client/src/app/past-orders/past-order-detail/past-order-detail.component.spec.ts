import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PastOrderDetailComponent } from './past-order-detail.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { FormsModule } from '@angular/forms';

describe('PastOrderDetailComponent', () => {
  let component: PastOrderDetailComponent;
  let fixture: ComponentFixture<PastOrderDetailComponent>;
  let mockAuthService, mockActivatedRoute, mockRouter, mockBackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['getAccessToken']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: { params: { id: 3 } }
    };
    mockBackendService = jasmine.createSpyObj(['getBackendURL']);
    TestBed.configureTestingModule({
      declarations: [PastOrderDetailComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: BackendService, useValue: mockBackendService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should send request for past order', fakeAsync(() => {
    mockAuthService.getAccessToken.and.returnValue(
      new Promise<void>(resolve => resolve())
    );
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(PastOrderDetailComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/registered-user/past-order/3"
      }
    );
    request.flush({});
    httpTestingController.verify();
  }));
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalStorageStub } from 'src/app/services/local-storage-stub';
import { StorageService } from 'src/app/services/storage.service';
import { ApparelList } from '../apparel-list';

import { ApparelDetailComponent } from './apparel-detail.component';

describe('ApparelDetailComponent', () => {
  let fixture: ComponentFixture<ApparelDetailComponent>;
  let mockStorageService, mockActivatedRoute, mockRouter;
  let menApparel = ApparelList.men;
  let womenApparel = ApparelList.women;

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['getSelectedApparel', 'updateApparel', 'updateTotal', 'watchApparel', 'watchTotal', 'getTotal', 'calculateTotal']);
    mockRouter = {
      navigate: (input: any) => { return null; },
      url: { includes: (input: string) => { return null; } }
    };
    mockActivatedRoute = {
      snapshot: { params: { id: 3 } }
    };
    TestBed.configureTestingModule({
      declarations: [ApparelDetailComponent],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should add the male apparel to the cart when the \'Add To Cart\' button is clicked', () => {
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedApparel.and.returnValue([]);
    mockStorageService.updateApparel.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedApparel", JSON.stringify(new Array(menApparel.apparelList[2]))));
    mockStorageService.updateTotal.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("total", menApparel.apparelList[2].price));

    fixture = TestBed.createComponent(ApparelDetailComponent);
    fixture.debugElement.query(By.css("button")).triggerEventHandler('click', {});

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedApparel"))[0]).toEqual(menApparel.apparelList[2]);
    expect(LocalStorageStub.mockLocalStorage.getItem("total")).toBe(menApparel.apparelList[2].price);
  });

  it('should add the female apparel to the cart when the \'Add To Cart\' button is clicked', () => {
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedApparel.and.returnValue([]);
    mockStorageService.updateApparel.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedApparel", JSON.stringify(new Array(womenApparel.apparelList[2]))));
    mockStorageService.updateTotal.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("total", womenApparel.apparelList[2].price));

    fixture = TestBed.createComponent(ApparelDetailComponent);
    fixture.debugElement.query(By.css("button")).triggerEventHandler('click', {});

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedApparel"))[0]).toEqual(womenApparel.apparelList[2]);
    expect(LocalStorageStub.mockLocalStorage.getItem("total")).toBe(womenApparel.apparelList[2].price);
  });
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalStorageStub } from 'src/app/services/local-storage-stub';
import { StorageService } from 'src/app/services/storage.service';
import { ItemList } from '../item-list';

import { OtherItemsDetailComponent } from './other-items-detail.component';

describe('OtherItemsDetailComponent', () => {
  let fixture: ComponentFixture<OtherItemsDetailComponent>;
  let mockStorageService, mockActivatedRoute, mockRouter;
  let items = ItemList.items;

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['getSelectedItems', 'updateItems', 'updateTotal', 'watchItems', 'watchTotal', 'getTotal', 'calculateTotal']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: { params: { id: 3 } }
    };
    TestBed.configureTestingModule({
      declarations: [OtherItemsDetailComponent],
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

  it('should add the item to the cart when the \'Add To Cart\' button is clicked', () => {
    mockStorageService.watchItems.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedItems.and.returnValue([]);
    mockStorageService.updateItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedItems", JSON.stringify(new Array(items.itemList[2]))));
    mockStorageService.updateTotal.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("total", items.itemList[2].price));
    mockRouter.navigate.and.returnValue(null);

    fixture = TestBed.createComponent(OtherItemsDetailComponent);
    fixture.debugElement.query(By.css("button")).triggerEventHandler('click', {});

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedItems"))[0]).toEqual(items.itemList[2]);
    expect(LocalStorageStub.mockLocalStorage.getItem("total")).toBe(items.itemList[2].price);
  });
});

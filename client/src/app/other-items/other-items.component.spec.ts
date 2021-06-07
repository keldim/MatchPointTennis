import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { ItemList } from './item-list';

import { OtherItemsComponent } from './other-items.component';

describe('OtherItemsComponent', () => {
  let fixture: ComponentFixture<OtherItemsComponent>;
  let mockStorageService;
  let items = ItemList.items;
  const itemFilterValue = {
    typeFilter: { balls: false, towels: false, grips: false, dampeners: false, sunscreen: false },
    priceFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false, range7: false, range8: false, range9: false, range10: false }
  };

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['watchItemFilter', 'getItemFilter', 'updateItemFilter']);

    TestBed.configureTestingModule({
      declarations: [OtherItemsComponent],
      imports: [
        FormsModule,
        NgxPaginationModule
      ],
      providers: [
        { provide: StorageService, useValue: mockStorageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should filter the items when the string value filter checkbox is clicked', () => {
    mockStorageService.watchItemFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(OtherItemsComponent);
    fixture.componentInstance.itemFilter = JSON.parse(JSON.stringify(itemFilterValue));
    fixture.detectChanges();

    // Type => Sunscreen
    fixture.debugElement.queryAll(By.css(".filter-choice"))[4].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(2);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(items.itemList[40]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(items.itemList[41]);
  });

  it('should filter the items when more than one string value filter checkbox are clicked', () => {
    mockStorageService.watchItemFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(OtherItemsComponent);
    fixture.componentInstance.itemFilter = JSON.parse(JSON.stringify(itemFilterValue));
    fixture.detectChanges();

    // Type => Sunscreen, Tennis Towels
    fixture.debugElement.queryAll(By.css(".filter-choice"))[4].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[1].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(9);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(items.itemList[13]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(items.itemList[14]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(items.itemList[15]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(items.itemList[16]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(items.itemList[17]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(items.itemList[18]);
    expect(fixture.componentInstance.filteredProducts[6]).toEqual(items.itemList[19]);
    expect(fixture.componentInstance.filteredProducts[7]).toEqual(items.itemList[40]);
    expect(fixture.componentInstance.filteredProducts[8]).toEqual(items.itemList[41]);
  });

  it('should filter the items when the numeric value filter checkbox is clicked', () => {
    mockStorageService.watchItemFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(OtherItemsComponent);
    fixture.componentInstance.itemFilter = JSON.parse(JSON.stringify(itemFilterValue));
    fixture.detectChanges();

    // Price => $90 - $99.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[14].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(1);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(items.itemList[9]);
  });

  it('should filter the items when more than one numeric value filter checkbox are clicked', () => {
    mockStorageService.watchItemFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(OtherItemsComponent);
    fixture.componentInstance.itemFilter = JSON.parse(JSON.stringify(itemFilterValue));
    fixture.detectChanges();

    // Price => $90 - $99.99, $80 - $89.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[13].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[14].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(3);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(items.itemList[0]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(items.itemList[9]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(items.itemList[10]);
  });

  it('should filter the items when more than one type of the filter checkbox are clicked', () => {
    mockStorageService.watchItemFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(OtherItemsComponent);
    fixture.componentInstance.itemFilter = JSON.parse(JSON.stringify(itemFilterValue));
    fixture.detectChanges();

    // Type => Tennis Balls
    // Price => $0 - $9.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[0].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[5].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(3);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(items.itemList[4]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(items.itemList[8]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(items.itemList[12]);
  });
});

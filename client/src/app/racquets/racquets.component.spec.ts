import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, PatternValidator } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { LocalStorageStub } from '../services/local-storage-stub';
import { StorageService } from '../services/storage.service';
import { RacquetList } from './racquet-list';

import { RacquetsComponent } from './racquets.component';

describe('RacquetsComponent', () => {
  let fixture: ComponentFixture<RacquetsComponent>;
  let racquets = RacquetList.racquets;
  let mockStorageService;
  const racquetFilterValue = {
    brandFilter: { Babolat: false, Head: false, Prince: false, Wilson: false, Yonex: false },
    headSizeFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false },
    stringPatternFilter: { pattern1: false, pattern2: false, pattern3: false, pattern4: false, pattern5: false, pattern6: false },
    lengthFilter: { length1: false, length2: false, length3: false, length4: false },
    strungWeightFilter: { range1: false, range2: false, range3: false, range4: false, range5: false },
    priceFilter: { range1: false, range2: false, range3: false, range4: false }
  };

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['watchRacquetFilter', 'getRacquetFilter', 'updateRacquetFilter']);

    TestBed.configureTestingModule({
      declarations: [RacquetsComponent],
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

  it('should filter the racquets when the string value filter checkbox is clicked', () => {
    mockStorageService.watchRacquetFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(RacquetsComponent);
    fixture.componentInstance.racquetFilter = JSON.parse(JSON.stringify(racquetFilterValue));
    fixture.detectChanges();

    // String Pattern => 14 x 18
    fixture.debugElement.queryAll(By.css(".filter-choice"))[11].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(1);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(racquets.racquetList[40]);
  });

  it('should filter the racquets when more than one string value filter checkbox are clicked', () => {
    mockStorageService.watchRacquetFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(RacquetsComponent);
    fixture.componentInstance.racquetFilter = JSON.parse(JSON.stringify(racquetFilterValue));
    fixture.detectChanges();

    // String Pattern => 14 x 18, 18 x 19
    fixture.debugElement.queryAll(By.css(".filter-choice"))[11].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[15].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(2);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(racquets.racquetList[27]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(racquets.racquetList[40]);
  });

  it('should filter the racquets when the numeric value filter checkbox is clicked', () => {
    mockStorageService.watchRacquetFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(RacquetsComponent);
    fixture.componentInstance.racquetFilter = JSON.parse(JSON.stringify(racquetFilterValue));
    fixture.detectChanges();

    // Head Size => 90 ~ 94 sq in
    fixture.debugElement.queryAll(By.css(".filter-choice"))[5].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(3);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(racquets.racquetList[24]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(racquets.racquetList[39]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(racquets.racquetList[40]);
  });

  it('should filter the racquets when more than one numeric value filter checkbox are clicked', () => {
    mockStorageService.watchRacquetFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(RacquetsComponent);
    fixture.componentInstance.racquetFilter = JSON.parse(JSON.stringify(racquetFilterValue));
    fixture.detectChanges();

    // Head Size => 90 ~ 94 sq in, 115 ~ 119 sq in
    fixture.debugElement.queryAll(By.css(".filter-choice"))[5].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[10].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(5);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(racquets.racquetList[24]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(racquets.racquetList[35]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(racquets.racquetList[39]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(racquets.racquetList[40]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(racquets.racquetList[72]);
  });

  it('should filter the racquets when more than one type of the filter checkbox are clicked', () => {
    mockStorageService.watchRacquetFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(RacquetsComponent);
    fixture.componentInstance.racquetFilter = JSON.parse(JSON.stringify(racquetFilterValue));
    fixture.detectChanges();

    // Head Size => 90 ~ 94 sq in
    // String Pattern => 14 x 18
    fixture.debugElement.queryAll(By.css(".filter-choice"))[5].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[11].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(1);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(racquets.racquetList[40]);
  });
});

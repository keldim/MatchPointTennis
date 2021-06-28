import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RacquetList } from '../../racquets/racquet-list';
import { RacquetDetailComponent } from './racquet-detail.component';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LocalStorageStub } from 'src/app/services/local-storage-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('RacquetDetailComponent', () => {
  let fixture: ComponentFixture<RacquetDetailComponent>;
  let racquets = RacquetList.racquets;
  let mockStorageService, mockActivatedRoute, mockRouter;


  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['getSelectedRacquets', 'updateRacquets', 'updateTotal', 'watchRacquets', 'watchTotal', 'getTotal', 'calculateTotal']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: { params: { id: 3 } }
    };
    TestBed.configureTestingModule({
      declarations: [RacquetDetailComponent],
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

  it('should add the racquet to the cart when the \'Add To Cart\' button is clicked', () => {
    mockStorageService.watchRacquets.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedRacquets.and.returnValue([]);
    mockStorageService.updateRacquets.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedRacquets", JSON.stringify(new Array(racquets.racquetList[2]))));
    mockStorageService.updateTotal.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("total", racquets.racquetList[2].price));
    mockRouter.navigate.and.returnValue(null);

    fixture = TestBed.createComponent(RacquetDetailComponent);
    fixture.debugElement.query(By.css("button")).triggerEventHandler('click', {});

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedRacquets"))[0]).toEqual(racquets.racquetList[2]);
    expect(LocalStorageStub.mockLocalStorage.getItem("total")).toBe(racquets.racquetList[2].price);
  });
});

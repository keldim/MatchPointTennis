import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { LocalStorageStub } from 'src/app/services/local-storage-stub';
import { StorageService } from 'src/app/services/storage.service';
import { ShoeList } from '../shoe-list';

import { ShoeDetailComponent } from './shoe-detail.component';

describe('ShoeDetailComponent', () => {
  let fixture: ComponentFixture<ShoeDetailComponent>;
  let mockStorageService, mockActivatedRoute, mockRouter;
  let menShoe = ShoeList.men;
  let womenShoe = ShoeList.women;

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['getSelectedShoes', 'updateShoes', 'updateTotal', 'watchShoes', 'watchTotal', 'getTotal', 'calculateTotal']);
    mockRouter = {
      navigate: (input: any) => { return null; },
      url: { includes: (input: string) => { return null; } }
    };
    mockActivatedRoute = {
      snapshot: { params: { id: 3 } }
    };
    TestBed.configureTestingModule({
      declarations: [ShoeDetailComponent],
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

  it('should add the male shoe to the cart when the \'Add To Cart\' button is clicked', () => {
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedShoes.and.returnValue([]);
    mockStorageService.updateShoes.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedShoes", JSON.stringify(new Array(menShoe.shoeList[2]))));
    mockStorageService.updateTotal.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("total", menShoe.shoeList[2].price));

    fixture = TestBed.createComponent(ShoeDetailComponent);
    fixture.debugElement.query(By.css("button")).triggerEventHandler('click', {});

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedShoes"))[0]).toEqual(menShoe.shoeList[2]);
    expect(LocalStorageStub.mockLocalStorage.getItem("total")).toBe(menShoe.shoeList[2].price);
  });

  it('should add the female shoe to the cart when the \'Add To Cart\' button is clicked', () => {
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedShoes.and.returnValue([]);
    mockStorageService.updateShoes.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedShoes", JSON.stringify(new Array(womenShoe.shoeList[2]))));
    mockStorageService.updateTotal.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("total", womenShoe.shoeList[2].price));

    fixture = TestBed.createComponent(ShoeDetailComponent);
    fixture.debugElement.query(By.css("button")).triggerEventHandler('click', {});

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedShoes"))[0]).toEqual(womenShoe.shoeList[2]);
    expect(LocalStorageStub.mockLocalStorage.getItem("total")).toBe(womenShoe.shoeList[2].price);
  });
});

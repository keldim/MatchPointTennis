import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { LocalStorageStub } from '../services/local-storage-stub';
import { StorageService } from '../services/storage.service';

import { CartComponent } from './cart.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockStorageService;

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['watchRacquets', 'watchShoes', 'watchApparel', 'watchItems', 'watchTotal',
      'getSelectedRacquets', 'getSelectedShoes', 'getSelectedApparel', 'getSelectedItems', 'getTotal', 'calculateTotal', 'updateRacquets', 'updateTotal']);
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        FormsModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: StorageService, useValue: mockStorageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should change the quanitity of an item in the cart', () => {
    mockStorageService.watchRacquets.and.returnValue(of([]));
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchItems.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedRacquets.and.returnValue([{
      id: "26", brand: "Head", headSize: "98 sq in", stringPattern: "18 x 20", length: "27 in", strungWeight: "11.9 oz",
      price: "229.95", name: "Head Graphene 360+ Prestige Midplus", quantity: "1", thumbURL: "../../assets/images/HPRMPR-thumb.jpg",
      zoomThumb: "../../../assets/images/prestige-midplus-thumb.jpeg", zoomFull: "../../../assets/images/prestige-midplus-detail.jpeg"
    }]);
    const event = {
      target: { value: "2" }
    };
    mockStorageService.calculateTotal.and.returnValue("2");
    mockStorageService.updateRacquets.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedRacquets", JSON.stringify(
      new Array({
        id: "26", brand: "Head", headSize: "98 sq in", stringPattern: "18 x 20", length: "27 in", strungWeight: "11.9 oz",
        price: "229.95", name: "Head Graphene 360+ Prestige Midplus", quantity: "2", thumbURL: "../../assets/images/HPRMPR-thumb.jpg",
        zoomThumb: "../../../assets/images/prestige-midplus-thumb.jpeg", zoomFull: "../../../assets/images/prestige-midplus-detail.jpeg"
      }))));
    mockStorageService.updateTotal.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("total", "2"));


    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.quantityChange(event, "racquet", 0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedRacquets"))[0].quantity).toBe("2");
    expect(LocalStorageStub.mockLocalStorage.getItem("total")).toBe("2");
  });

  it('should remove an item from the cart', () => {
    mockStorageService.watchRacquets.and.returnValue(of([]));
    mockStorageService.watchShoes.and.returnValue(of([]));
    mockStorageService.watchApparel.and.returnValue(of([]));
    mockStorageService.watchItems.and.returnValue(of([]));
    mockStorageService.watchTotal.and.returnValue(of([]));
    mockStorageService.getSelectedRacquets.and.returnValue([{
      id: "26", brand: "Head", headSize: "98 sq in", stringPattern: "18 x 20", length: "27 in", strungWeight: "11.9 oz",
      price: "229.95", name: "Head Graphene 360+ Prestige Midplus", quantity: "1", thumbURL: "../../assets/images/HPRMPR-thumb.jpg",
      zoomThumb: "../../../assets/images/prestige-midplus-thumb.jpeg", zoomFull: "../../../assets/images/prestige-midplus-detail.jpeg"
    }]);
    mockStorageService.updateRacquets.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("selectedRacquets", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.deleteModalComponent = new DeleteModalComponent(TestBed.get(NgbModal), mockStorageService);
    fixture.detectChanges();
    component.deleteModalComponent.itemType = "racquet";
    component.deleteModalComponent.delete();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("selectedRacquets"))).toEqual([]);
  });
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { of } from 'rxjs';
import { LocalStorageStub } from 'src/app/services/local-storage-stub';
import { StorageService } from 'src/app/services/storage.service';
import { ShoeList } from './shoe-list';
import { ShoesComponent } from './shoes.component';


describe('ShoesComponent', () => {
  let fixture: ComponentFixture<ShoesComponent>;
  let mockStorageService, mockActivatedRoute, mockRouter;
  let menShoe = ShoeList.men;
  let womenShoe = ShoeList.women;
  const shoeFilterValue = {
    brandFilter: { Adidas: false, Asics: false, Fila: false, NewBalance: false, Nike: false },
    sizeFilter: {
      size1: false, size2: false, size3: false, size4: false, size5: false, size6: false, size7: false,
      size8: false, size9: false, size10: false, size11: false, size12: false, size13: false, size14: false, size15: false,
      size16: false, size17: false
    },
    colorFilter: { color1: false, color2: false, color3: false, color4: false, color5: false, color6: false, color7: false, color8: false },
    outsoleWarrantyFilter: { warranty1: false, warranty2: false },
    priceFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false, range7: false, range8: false, range9: false }
  };
  const womenShoeFilterValue = {
    brandFilter: { Adidas: false, Asics: false, Fila: false, NewBalance: false, Nike: false },
    sizeFilter: {
      size1: false, size2: false, size3: false, size4: false, size5: false, size6: false, size7: false,
      size8: false, size9: false, size10: false, size11: false, size12: false, size13: false, size14: false, size15: false
    },
    colorFilter: { color1: false, color2: false, color3: false, color4: false, color5: false, color6: false, color7: false, color8: false },
    outsoleWarrantyFilter: { warranty1: false, warranty2: false },
    priceFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false, range7: false, range8: false, range9: false }
  };

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['watchShoeFilter', 'getShoeFilter', 'updateShoeFilter', 'watchWomenShoeFilter', 'getWomenShoeFilter', 'updateWomenShoeFilter']);
    mockRouter = {
      navigate: (input: any) => { return null; },
      url: { includes: (input: string) => { return true; } }
    };
    TestBed.configureTestingModule({
      declarations: [ShoesComponent],
      imports: [
        FormsModule,
        NgxPaginationModule
      ],
      providers: [
        { provide: StorageService, useValue: mockStorageService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should filter the male shoes when the string value filter checkbox is clicked', () => {
    mockStorageService.watchShoeFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(shoeFilterValue));
    fixture.detectChanges();

    // Color => Black
    fixture.debugElement.queryAll(By.css(".filter-choice"))[22].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(6);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menShoe.shoeList[11]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menShoe.shoeList[17]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(menShoe.shoeList[22]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(menShoe.shoeList[34]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(menShoe.shoeList[43]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(menShoe.shoeList[46]);
  });

  it('should filter the male shoes when more than one string value filter checkbox are clicked', () => {
    mockStorageService.watchShoeFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(shoeFilterValue));
    fixture.detectChanges();

    // Color => Black, Gray
    fixture.debugElement.queryAll(By.css(".filter-choice"))[22].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[25].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(11);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menShoe.shoeList[3]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menShoe.shoeList[8]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(menShoe.shoeList[11]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(menShoe.shoeList[17]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(menShoe.shoeList[22]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(menShoe.shoeList[33]);
    expect(fixture.componentInstance.filteredProducts[6]).toEqual(menShoe.shoeList[34]);
    expect(fixture.componentInstance.filteredProducts[7]).toEqual(menShoe.shoeList[42]);
    expect(fixture.componentInstance.filteredProducts[8]).toEqual(menShoe.shoeList[43]);
    expect(fixture.componentInstance.filteredProducts[9]).toEqual(menShoe.shoeList[44]);
    expect(fixture.componentInstance.filteredProducts[10]).toEqual(menShoe.shoeList[46]);
  });

  it('should filter the male shoes when the numeric value filter checkbox is clicked', () => {
    mockStorageService.watchShoeFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(shoeFilterValue));
    fixture.detectChanges();

    // Price => $120 - $129.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[40].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(4);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menShoe.shoeList[0]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menShoe.shoeList[12]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(menShoe.shoeList[13]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(menShoe.shoeList[36]);
  });

  it('should filter the male shoes when more than one numeric value filter checkbox are clicked', () => {
    mockStorageService.watchShoeFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(shoeFilterValue));
    fixture.detectChanges();

    // Price => $40 - $49.99, $120 - $129.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[32].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[40].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(9);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menShoe.shoeList[0]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menShoe.shoeList[10]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(menShoe.shoeList[11]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(menShoe.shoeList[12]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(menShoe.shoeList[13]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(menShoe.shoeList[22]);
    expect(fixture.componentInstance.filteredProducts[6]).toEqual(menShoe.shoeList[23]);
    expect(fixture.componentInstance.filteredProducts[7]).toEqual(menShoe.shoeList[36]);
    expect(fixture.componentInstance.filteredProducts[8]).toEqual(menShoe.shoeList[47]);
  });

  it('should filter the male shoes when more than one type of the filter checkbox are clicked', () => {
    mockStorageService.watchShoeFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(shoeFilterValue));
    fixture.detectChanges();

    // Color => Black
    // Price => $40 - $49.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[22].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[32].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(2);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menShoe.shoeList[11]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menShoe.shoeList[22]);
  });












  it('should filter the female shoes when the string value filter checkbox is clicked', () => {
    mockStorageService.watchWomenShoeFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(womenShoeFilterValue));
    fixture.detectChanges();

    // Color => Black
    fixture.debugElement.queryAll(By.css(".filter-choice"))[20].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(3);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenShoe.shoeList[3]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenShoe.shoeList[21]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(womenShoe.shoeList[33]);
  });

  it('should filter the female shoes when more than one string value filter checkbox are clicked', () => {
    mockStorageService.watchWomenShoeFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(womenShoeFilterValue));
    fixture.detectChanges();

    // Color => Black, Gray
    fixture.debugElement.queryAll(By.css(".filter-choice"))[20].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[23].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(6);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenShoe.shoeList[3]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenShoe.shoeList[4]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(womenShoe.shoeList[21]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(womenShoe.shoeList[33]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(womenShoe.shoeList[38]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(womenShoe.shoeList[45]);
  });

  it('should filter the female shoes when the numeric value filter checkbox is clicked', () => {
    mockStorageService.watchWomenShoeFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(womenShoeFilterValue));
    fixture.detectChanges();

    // Price => $120 - $129.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[38].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(3);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenShoe.shoeList[0]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenShoe.shoeList[12]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(womenShoe.shoeList[34]);
  });

  it('should filter the female shoes when more than one numeric value filter checkbox are clicked', () => {
    mockStorageService.watchWomenShoeFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(womenShoeFilterValue));
    fixture.detectChanges();

    // Price => $40 - $49.99, $120 - $129.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[30].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[38].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(7);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenShoe.shoeList[0]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenShoe.shoeList[11]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(womenShoe.shoeList[12]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(womenShoe.shoeList[23]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(womenShoe.shoeList[33]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(womenShoe.shoeList[34]);
    expect(fixture.componentInstance.filteredProducts[6]).toEqual(womenShoe.shoeList[45]);
  });

  it('should filter the female shoes when more than one type of the filter checkbox are clicked', () => {
    mockStorageService.watchWomenShoeFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ShoesComponent);
    fixture.componentInstance.shoeFilter = JSON.parse(JSON.stringify(womenShoeFilterValue));
    fixture.detectChanges();

    // Color => Black
    // Price => $40 - $49.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[20].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[30].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(1);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenShoe.shoeList[33]);
  });
});

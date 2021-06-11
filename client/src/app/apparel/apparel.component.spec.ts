import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { of } from "rxjs";
import { StorageService } from "../services/storage.service";
import { ApparelList } from "./apparel-list";
import { ApparelComponent } from "./apparel.component";


describe('ApparelComponent', () => {
  let fixture: ComponentFixture<ApparelComponent>;
  let mockStorageService, mockActivatedRoute, mockRouter;
  let menApparel = ApparelList.men;
  let womenApparel = ApparelList.women;
  const apparelFilterValue = {
    brandFilter: { Adidas: false, Asics: false, Fila: false, Lacoste: false, Nike: false },
    styleFilter: { style1: false, style2: false, style3: false, style4: false, style5: false, style6: false },
    sizeFilter: { size1: false, size2: false, size3: false, size4: false, size5: false, size6: false },
    colorFilter: { color1: false, color2: false, color3: false, color4: false, color5: false, color6: false, color7: false, color8: false },
    priceFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false }
  };
  const womenApparelFilterValue = {
    brandFilter: { Adidas: false, Asics: false, Fila: false, Lacoste: false, Nike: false },
    styleFilter: { style1: false, style2: false, style3: false, style4: false, style5: false, style6: false, style7: false },
    sizeFilter: { size1: false, size2: false, size3: false, size4: false, size5: false, size6: false },
    colorFilter: { color1: false, color2: false, color3: false, color4: false, color5: false, color6: false, color7: false, color8: false },
    priceFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false }
  };

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['watchApparelFilter', 'getApparelFilter', 'updateApparelFilter', 'watchWomenApparelFilter', 'getWomenApparelFilter', 'updateWomenApparelFilter']);
    mockRouter = {
      navigate: (input: any) => { return null; },
      url: { includes: (input: string) => { return true; } }
    };
    TestBed.configureTestingModule({
      declarations: [ApparelComponent],
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

  it('should filter the male apparel when the string value filter checkbox is clicked', () => {
    mockStorageService.watchApparelFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(apparelFilterValue));
    fixture.detectChanges();

    // Color => Yellow
    fixture.debugElement.queryAll(By.css(".filter-choice"))[24].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(1);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menApparel.apparelList[47]);
  });

  it('should filter the male apparel when more than one string value filter checkbox are clicked', () => {
    mockStorageService.watchApparelFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(apparelFilterValue));
    fixture.detectChanges();

    // Color => Yellow, Green
    fixture.debugElement.queryAll(By.css(".filter-choice"))[24].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[19].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(8);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menApparel.apparelList[29]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menApparel.apparelList[31]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(menApparel.apparelList[35]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(menApparel.apparelList[38]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(menApparel.apparelList[43]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(menApparel.apparelList[44]);
    expect(fixture.componentInstance.filteredProducts[6]).toEqual(menApparel.apparelList[47]);
    expect(fixture.componentInstance.filteredProducts[7]).toEqual(menApparel.apparelList[48]);
  });

  it('should filter the male apparel when the numeric value filter checkbox is clicked', () => {
    mockStorageService.watchApparelFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(apparelFilterValue));
    fixture.detectChanges();

    // Price => $10 - $19.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[25].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(2);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menApparel.apparelList[31]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menApparel.apparelList[50]);
  });

  it('should filter the male apparel when more than one numeric value filter checkbox are clicked', () => {
    mockStorageService.watchApparelFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(apparelFilterValue));
    fixture.detectChanges();

    // Price => $10 - $19.99, $60+
    fixture.debugElement.queryAll(By.css(".filter-choice"))[25].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[30].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(10);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menApparel.apparelList[0]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menApparel.apparelList[2]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(menApparel.apparelList[14]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(menApparel.apparelList[24]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(menApparel.apparelList[31]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(menApparel.apparelList[34]);
    expect(fixture.componentInstance.filteredProducts[6]).toEqual(menApparel.apparelList[35]);
    expect(fixture.componentInstance.filteredProducts[7]).toEqual(menApparel.apparelList[38]);
    expect(fixture.componentInstance.filteredProducts[8]).toEqual(menApparel.apparelList[40]);
    expect(fixture.componentInstance.filteredProducts[9]).toEqual(menApparel.apparelList[50]);
  });

  it('should filter the male apparel when more than one type of the filter checkbox are clicked', () => {
    mockStorageService.watchApparelFilter.and.returnValue(of([]));
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(apparelFilterValue));
    fixture.detectChanges();

    // Color => Green
    // Price => $60+
    fixture.debugElement.queryAll(By.css(".filter-choice"))[19].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[30].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(2);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(menApparel.apparelList[35]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(menApparel.apparelList[38]);
  });












  it('should filter the female apparel when the string value filter checkbox is clicked', () => {
    mockStorageService.watchWomenApparelFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(womenApparelFilterValue));
    fixture.detectChanges();

    // Color => Yellow
    fixture.debugElement.queryAll(By.css(".filter-choice"))[25].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(2);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenApparel.apparelList[46]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenApparel.apparelList[53]);
  });

  it('should filter the female apparel when more than one string value filter checkbox are clicked', () => {
    mockStorageService.watchWomenApparelFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(womenApparelFilterValue));
    fixture.detectChanges();

    // Color => Yellow, Green
    fixture.debugElement.queryAll(By.css(".filter-choice"))[25].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[20].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(6);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenApparel.apparelList[31]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenApparel.apparelList[43]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(womenApparel.apparelList[46]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(womenApparel.apparelList[50]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(womenApparel.apparelList[52]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(womenApparel.apparelList[53]);
  });

  it('should filter the female apparel when the numeric value filter checkbox is clicked', () => {
    mockStorageService.watchWomenApparelFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(womenApparelFilterValue));
    fixture.detectChanges();

    // Price => $10 - $19.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[26].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(4);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenApparel.apparelList[7]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenApparel.apparelList[13]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(womenApparel.apparelList[23]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(womenApparel.apparelList[47]);
  });

  it('should filter the female apparel when more than one numeric value filter checkbox are clicked', () => {
    mockStorageService.watchWomenApparelFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(womenApparelFilterValue));
    fixture.detectChanges();

    // Price => $10 - $19.99, $50 - $59.99
    fixture.debugElement.queryAll(By.css(".filter-choice"))[26].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[30].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(9);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenApparel.apparelList[5]);
    expect(fixture.componentInstance.filteredProducts[1]).toEqual(womenApparel.apparelList[7]);
    expect(fixture.componentInstance.filteredProducts[2]).toEqual(womenApparel.apparelList[13]);
    expect(fixture.componentInstance.filteredProducts[3]).toEqual(womenApparel.apparelList[14]);
    expect(fixture.componentInstance.filteredProducts[4]).toEqual(womenApparel.apparelList[16]);
    expect(fixture.componentInstance.filteredProducts[5]).toEqual(womenApparel.apparelList[23]);
    expect(fixture.componentInstance.filteredProducts[6]).toEqual(womenApparel.apparelList[27]);
  });

  it('should filter the female apparel when more than one type of the filter checkbox are clicked', () => {
    mockStorageService.watchWomenApparelFilter.and.returnValue(of([]));
    mockRouter.url = { includes: (input: string) => { return false; } };
    fixture = TestBed.createComponent(ApparelComponent);
    fixture.componentInstance.apparelFilter = JSON.parse(JSON.stringify(womenApparelFilterValue));
    fixture.detectChanges();

    // Color => Green
    // Price => $60+
    fixture.debugElement.queryAll(By.css(".filter-choice"))[20].triggerEventHandler('click', {});
    fixture.debugElement.queryAll(By.css(".filter-choice"))[31].triggerEventHandler('click', {});

    expect(fixture.componentInstance.filteredProducts.length).toBe(1);
    expect(fixture.componentInstance.filteredProducts[0]).toEqual(womenApparel.apparelList[43]);
  });
});

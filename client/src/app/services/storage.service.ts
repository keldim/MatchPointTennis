import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  onSubjectForRacquets = new Subject<any[]>();
  onSubjectForShoes = new Subject<any[]>();
  onSubjectForApparel = new Subject<any[]>();
  onSubjectForItems = new Subject<any[]>();
  onSubjectForTotal = new Subject<any[]>();
  onSubjectForRacquetFilter = new Subject<any[]>();
  onSubjectForShoeFilter = new Subject<any[]>();
  onSubjectForApparelFilter = new Subject<any[]>();
  onSubjectForItemFilter = new Subject<any[]>();

  constructor() {
    if (localStorage.getItem("selectedRacquets") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("selectedRacquets", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("selectedShoes") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("selectedShoes", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("selectedApparel") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("selectedApparel", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("selectedItems") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("selectedItems", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("total") == null) {
      localStorage.setItem("total", "0");
    }
    if (localStorage.getItem("racquetFilter") == null) {
      const racquetFilter = {
        brandFilter: { Babolat: false, Head: false, Prince: false, Wilson: false, Yonex: false },
        headSizeFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false },
        stringPatternFilter: { pattern1: false, pattern2: false, pattern3: false, pattern4: false, pattern5: false, pattern6: false },
        lengthFilter: { length1: false, length2: false, length3: false, length4: false },
        strungWeightFilter: { range1: false, range2: false, range3: false, range4: false, range5: false },
        priceFilter: { range1: false, range2: false, range3: false, range4: false }
      };
      localStorage.setItem("racquetFilter", JSON.stringify(racquetFilter));
    }
    if (localStorage.getItem("shoeFilter") == null) {
      const shoeFilter = {
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
      localStorage.setItem("shoeFilter", JSON.stringify(shoeFilter));
    }
    if (localStorage.getItem("apparelFilter") == null) {
      const apparelFilter = {
        brandFilter: { Adidas: false, Asics: false, Fila: false, Lacoste: false, Nike: false },
        styleFilter: { style1: false, style2: false, style3: false, style4: false, style5: false, style6: false },
        sizeFilter: { size1: false, size2: false, size3: false, size4: false, size5: false, size6: false },
        colorFilter: { color1: false, color2: false, color3: false, color4: false, color5: false, color6: false, color7: false, color8: false },
        priceFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false }
      };
      localStorage.setItem("apparelFilter", JSON.stringify(apparelFilter));
    }
    if (localStorage.getItem("itemFilter") == null) {
      const itemFilter = {
        typeFilter: { balls: false, towels: false, grips: false, dampeners: false, sunscreen: false },
        priceFilter: { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false, range7: false, range8: false, range9: false, range10: false }
      };
      localStorage.setItem("itemFilter", JSON.stringify(itemFilter));
    }
  }

  watchRacquets(): Observable<any[]> {
    return this.onSubjectForRacquets.asObservable();
  }

  watchShoes(): Observable<any[]> {
    return this.onSubjectForShoes.asObservable();
  }

  watchApparel(): Observable<any[]> {
    return this.onSubjectForApparel.asObservable();
  }

  watchItems(): Observable<any[]> {
    return this.onSubjectForItems.asObservable();
  }

  watchTotal(): Observable<any[]> {
    return this.onSubjectForTotal.asObservable();
  }

  watchRacquetFilter(): Observable<any[]> {
    return this.onSubjectForRacquetFilter.asObservable();
  }

  watchShoeFilter(): Observable<any[]> {
    return this.onSubjectForShoeFilter.asObservable();
  }

  watchApparelFilter(): Observable<any[]> {
    return this.onSubjectForApparelFilter.asObservable();
  }

  watchItemFilter(): Observable<any[]> {
    return this.onSubjectForItemFilter.asObservable();
  }


  public getSelectedRacquets() {
    return JSON.parse(localStorage.getItem("selectedRacquets"));
  }

  public getSelectedShoes() {
    return JSON.parse(localStorage.getItem("selectedShoes"));
  }

  public getSelectedApparel() {
    return JSON.parse(localStorage.getItem("selectedApparel"));
  }

  public getSelectedItems() {
    return JSON.parse(localStorage.getItem("selectedItems"));
  }

  public getTotal() {
    return localStorage.getItem("total");
  }

  public getRacquetFilter() {
    return JSON.parse(localStorage.getItem("racquetFilter"));
  }

  public getShoeFilter() {
    return JSON.parse(localStorage.getItem("shoeFilter"));
  }

  public getApparelFilter() {
    return JSON.parse(localStorage.getItem("apparelFilter"));
  }

  public getItemFilter() {
    return JSON.parse(localStorage.getItem("itemFilter"));
  }

  calculateTotal() {
    let total = 0;
    for (let racquet of this.getSelectedRacquets()) {
      total += Number(racquet.quantity);
    }
    for (let shoe of this.getSelectedShoes()) {
      total += Number(shoe.quantity);
    }
    for (let apparelItem of this.getSelectedApparel()) {
      total += Number(apparelItem.quantity);
    }
    for (let item of this.getSelectedItems()) {
      total += Number(item.quantity);
    }
    return total;
  }

  public updateRacquets(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForRacquets.next(data);
  }
  public updateShoes(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForShoes.next(data);
  }
  public updateApparel(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForApparel.next(data);
  }
  public updateItems(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForItems.next(data);
  }
  public updateTotal(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForTotal.next(data);
  }
  public updateRacquetFilter(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForRacquetFilter.next(data);
  }
  public updateShoeFilter(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForShoeFilter.next(data);
  }
  public updateApparelFilter(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForApparelFilter.next(data);
  }
  public updateItemFilter(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForItemFilter.next(data);
  }




  public clear() {
    let emptyArray: any[] = [];

    localStorage.setItem("selectedRacquets", JSON.stringify(emptyArray));
    localStorage.setItem("selectedShoes", JSON.stringify(emptyArray));
    localStorage.setItem("selectedApparel", JSON.stringify(emptyArray));
    localStorage.setItem("selectedItems", JSON.stringify(emptyArray));

    this.onSubjectForRacquets.next(emptyArray);
    this.onSubjectForShoes.next(emptyArray);
    this.onSubjectForApparel.next(emptyArray);
    this.onSubjectForItems.next(emptyArray);

    this.updateTotal("total", 0);
  }
}

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
  }
}

import { Component, OnInit } from '@angular/core';
import { ItemList } from './item-list';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-other-items',
  templateUrl: './other-items.component.html',
  styleUrls: ['./other-items.component.css']
})
export class OtherItemsComponent implements OnInit {
  filterExpand1: boolean = false;
  filterExpand2: boolean = false;
  items = ItemList.items;
  p: number = 1;
  filteredProducts: any[] = [];
  typeFilter: any;
  priceFilter: any;
  itemFilter: any = this.storageService.getItemFilter();

  constructor(private storageService: StorageService) {
    this.storageService.watchItemFilter().subscribe(itemFilter => {
      this.itemFilter = itemFilter;
    });
  }

  ngOnInit() {
    this.filteredProducts = [...this.items.itemList];

    this.typeFilter = this.itemFilter.typeFilter;
    this.priceFilter = this.itemFilter.priceFilter;

    if (Object.values(this.typeFilter).includes(true)) {
      this.filterExpand1 = true;
    }
    if (Object.values(this.priceFilter).includes(true)) {
      this.filterExpand2 = true;
    }

    this.performFilter();
  }

  changeCheckbox(filter, key) {
    if (filter == "typeFilter") {
      this.typeFilter[key] = !this.typeFilter[key];
    } else {
      this.priceFilter[key] = !this.priceFilter[key];
    }
    this.performFilter();
  }

  typeFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.typeFilter.balls && x.type == "balls") ||
      (this.typeFilter.towels && x.type == "towels") ||
      (this.typeFilter.grips && x.type == "grips") ||
      (this.typeFilter.dampeners && x.type == "dampeners") ||
      (this.typeFilter.sunscreen && x.type == "sunscreen")
    );
    return filteredProductList;
  }

  priceFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.priceFilter.range1 && (Number(x.price) >= 0.00 && Number(x.price) <= 9.99)) ||
      (this.priceFilter.range2 && (Number(x.price) >= 10.00 && Number(x.price) <= 19.99)) ||
      (this.priceFilter.range3 && (Number(x.price) >= 20.00 && Number(x.price) <= 29.99)) ||
      (this.priceFilter.range4 && (Number(x.price) >= 30.00 && Number(x.price) <= 39.99)) ||
      (this.priceFilter.range5 && (Number(x.price) >= 40.00 && Number(x.price) <= 49.99)) ||
      (this.priceFilter.range6 && (Number(x.price) >= 50.00 && Number(x.price) <= 59.99)) ||
      (this.priceFilter.range7 && (Number(x.price) >= 60.00 && Number(x.price) <= 69.99)) ||
      (this.priceFilter.range8 && (Number(x.price) >= 70.00 && Number(x.price) <= 79.99)) ||
      (this.priceFilter.range9 && (Number(x.price) >= 80.00 && Number(x.price) <= 89.99)) ||
      (this.priceFilter.range10 && (Number(x.price) >= 90.00 && Number(x.price) <= 99.99))
    );
    return filteredProductList;
  }

  performFilter() {
    this.storageService.updateItemFilter("itemFilter", this.itemFilter);
    let temporaryList: any[] = [...this.items.itemList];
    for (var key of Object.keys(this.typeFilter)) {
      if (this.typeFilter[key]) {
        temporaryList = this.typeFilterChange(temporaryList);
        break;
      }
    }
    for (var key of Object.keys(this.priceFilter)) {
      if (this.priceFilter[key]) {
        temporaryList = this.priceFilterChange(temporaryList);
        break;
      }
    }
    this.filteredProducts = temporaryList;
    this.p = 1;
  }

}

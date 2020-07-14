import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ShoeList } from './shoe-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent implements OnInit {
  filterExpand1: boolean = false;
  filterExpand2: boolean = false;
  filterExpand3: boolean = false;
  filterExpand4: boolean = false;
  filterExpand5: boolean = false;
  shoes: any;
  p: number = 1;
  filteredProducts: any[] = [];
  brandFilter: any;
  sizeFilter: any;
  colorFilter: any;
  outsoleWarrantyFilter: any;
  priceFilter: any;
  shoeFilter: any = this.setShoeFilter();



  constructor(private storageService: StorageService, private router: Router) {
    this.setWatchShoeFilter().subscribe(shoeFilter => {
      this.shoeFilter = shoeFilter;
    });
  }

  ngOnInit() {
    if (this.isMen()) {
      this.shoes = ShoeList.men;
    } else {
      this.shoes = ShoeList.women;
    }

    this.filteredProducts = [...this.shoes.shoeList];

    this.brandFilter = this.shoeFilter.brandFilter;
    this.sizeFilter = this.shoeFilter.sizeFilter;
    this.colorFilter = this.shoeFilter.colorFilter;
    this.outsoleWarrantyFilter = this.shoeFilter.outsoleWarrantyFilter;
    this.priceFilter = this.shoeFilter.priceFilter;

    if (Object.values(this.brandFilter).includes(true)) {
      this.filterExpand1 = true;
    }
    if (Object.values(this.sizeFilter).includes(true)) {
      this.filterExpand2 = true;
    }
    if (Object.values(this.colorFilter).includes(true)) {
      this.filterExpand3 = true;
    }
    if (Object.values(this.outsoleWarrantyFilter).includes(true)) {
      this.filterExpand4 = true;
    }
    if (Object.values(this.priceFilter).includes(true)) {
      this.filterExpand5 = true;
    }

    this.performFilter();
  }


  brandFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.brandFilter.Adidas && x.brand == "Adidas") ||
      (this.brandFilter.Asics && x.brand == "Asics") ||
      (this.brandFilter.Fila && x.brand == "Fila") ||
      (this.brandFilter.NewBalance && x.brand == "New Balance") ||
      (this.brandFilter.Nike && x.brand == "Nike")
    );
    return filteredProductList;
  }

  sizeFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.sizeFilter.size1 && x.size.includes("6")) ||
      (this.sizeFilter.size2 && x.size.includes("6.5")) ||
      (this.sizeFilter.size3 && x.size.includes("7")) ||
      (this.sizeFilter.size4 && x.size.includes("7.5")) ||
      (this.sizeFilter.size5 && x.size.includes("8")) ||
      (this.sizeFilter.size6 && x.size.includes("8.5")) ||
      (this.sizeFilter.size7 && x.size.includes("9")) ||
      (this.sizeFilter.size8 && x.size.includes("9.5")) ||
      (this.sizeFilter.size9 && x.size.includes("10")) ||
      (this.sizeFilter.size10 && x.size.includes("10.5")) ||
      (this.sizeFilter.size11 && x.size.includes("11")) ||
      (this.sizeFilter.size12 && x.size.includes("11.5")) ||
      (this.sizeFilter.size13 && x.size.includes("12")) ||
      (this.sizeFilter.size14 && x.size.includes("12.5")) ||
      (this.sizeFilter.size15 && x.size.includes("13")) ||
      (this.sizeFilter.size16 && x.size.includes("14")) ||
      (this.sizeFilter.size17 && x.size.includes("15"))
    );
    return filteredProductList;
  }

  womenSizeFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.sizeFilter.size1 && x.size.includes("5")) ||
      (this.sizeFilter.size2 && x.size.includes("5.5")) ||
      (this.sizeFilter.size3 && x.size.includes("6")) ||
      (this.sizeFilter.size4 && x.size.includes("6.5")) ||
      (this.sizeFilter.size5 && x.size.includes("7")) ||
      (this.sizeFilter.size6 && x.size.includes("7.5")) ||
      (this.sizeFilter.size7 && x.size.includes("8")) ||
      (this.sizeFilter.size8 && x.size.includes("8.5")) ||
      (this.sizeFilter.size9 && x.size.includes("9")) ||
      (this.sizeFilter.size10 && x.size.includes("9.5")) ||
      (this.sizeFilter.size11 && x.size.includes("10")) ||
      (this.sizeFilter.size12 && x.size.includes("10.5")) ||
      (this.sizeFilter.size13 && x.size.includes("11")) ||
      (this.sizeFilter.size14 && x.size.includes("11.5")) ||
      (this.sizeFilter.size15 && x.size.includes("12"))
    );
    return filteredProductList;
  }


  colorFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.colorFilter.color1 && x.color.includes("Black")) ||
      (this.colorFilter.color2 && x.color.includes("Blue")) ||
      (this.colorFilter.color3 && x.color.includes("Green")) ||
      (this.colorFilter.color4 && x.color.includes("Gray")) ||
      (this.colorFilter.color5 && x.color.includes("Purple")) ||
      (this.colorFilter.color6 && x.color.includes("Red")) ||
      (this.colorFilter.color7 && x.color.includes("White")) ||
      (this.colorFilter.color8 && x.color.includes("Yellow"))
    );
    return filteredProductList;
  }

  outsoleWarrantyFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.outsoleWarrantyFilter.warranty1 && x.outsoleWarranty == "Yes") ||
      (this.outsoleWarrantyFilter.warranty2 && x.outsoleWarranty == "No")
    );
    return filteredProductList;
  }


  priceFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.priceFilter.range1 && (Number(x.price) >= 40.00 && Number(x.price) <= 49.99)) ||
      (this.priceFilter.range2 && (Number(x.price) >= 50.00 && Number(x.price) <= 59.99)) ||
      (this.priceFilter.range3 && (Number(x.price) >= 60.00 && Number(x.price) <= 69.99)) ||
      (this.priceFilter.range4 && (Number(x.price) >= 70.00 && Number(x.price) <= 79.99)) ||
      (this.priceFilter.range5 && (Number(x.price) >= 80.00 && Number(x.price) <= 89.99)) ||
      (this.priceFilter.range6 && (Number(x.price) >= 90.00 && Number(x.price) <= 99.99)) ||
      (this.priceFilter.range7 && (Number(x.price) >= 100.00 && Number(x.price) <= 109.99)) ||
      (this.priceFilter.range8 && (Number(x.price) >= 110.00 && Number(x.price) <= 119.99)) ||
      (this.priceFilter.range9 && (Number(x.price) >= 120.00 && Number(x.price) <= 129.99))
    );
    return filteredProductList;
  }

  performFilter() {
    this.runUpdateShoeFilter();
    let temporaryList: any[] = [...this.shoes.shoeList];
    for (var key of Object.keys(this.brandFilter)) {
      if (this.brandFilter[key]) {
          temporaryList = this.brandFilterChange(temporaryList);
          break;
      }
    }

    if (this.isMen()) {
      for (var key of Object.keys(this.sizeFilter)) {
        if (this.sizeFilter[key]) {
          temporaryList = this.sizeFilterChange(temporaryList);
          break;
        }
      }
    } else {
      for (var key of Object.keys(this.sizeFilter)) {
        if (this.sizeFilter[key]) {
          temporaryList = this.womenSizeFilterChange(temporaryList);
          break;
        }
      }
    }

    for (var key of Object.keys(this.colorFilter)) {
      if (this.colorFilter[key]) {
        temporaryList = this.colorFilterChange(temporaryList);
        break;
      }
    }
    for (var key of Object.keys(this.outsoleWarrantyFilter)) {
      if (this.outsoleWarrantyFilter[key]) {
          temporaryList = this.outsoleWarrantyFilterChange(temporaryList);
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


  setShoeFilter() {
    if (this.isMen()) {
      return this.storageService.getShoeFilter();
    } else {
      return this.storageService.getWomenShoeFilter();
    }
  }

  setWatchShoeFilter() {
    if (this.isMen()) {
      return this.storageService.watchShoeFilter();
    } else {
      return this.storageService.watchWomenShoeFilter();
    }
  }

  runUpdateShoeFilter() {
    if (this.isMen()) {
      this.storageService.updateShoeFilter("shoeFilter", this.shoeFilter);
    } else {
      this.storageService.updateWomenShoeFilter("womenShoeFilter", this.shoeFilter);
    }
  }

  isMen() {
    if (this.router.url.includes("shoe-men")) {
      return true;
    } else {
      return false;
    }
  }
}

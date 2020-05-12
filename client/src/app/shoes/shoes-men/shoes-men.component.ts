import { Component, OnInit } from '@angular/core';
import { ShoeList } from '../shoe-list';

@Component({
  selector: 'app-shoes-men',
  templateUrl: './shoes-men.component.html',
  styleUrls: ['./shoes-men.component.css']
})
export class ShoesMenComponent implements OnInit {
  filterExpand1: boolean = false;
  filterExpand2: boolean = false;
  filterExpand3: boolean = false;
  filterExpand4: boolean = false;
  filterExpand5: boolean = false;
  menShoe = ShoeList.men;
  p: number = 1;
  filteredProducts: any[] = [];
  brandFilter: any;
  sizeFilter: any;
  colorFilter: any;
  outsoleWarrantyFilter: any;
  priceFilter: any;

  constructor() { }

  ngOnInit() {
    this.filteredProducts = [...this.menShoe.shoeList];
    this.brandFilter = { Adidas: false, Asics: false, Fila: false, NewBalance: false, Nike: false };
    this.sizeFilter = {
      size1: false, size2: false, size3: false, size4: false, size5: false, size6: false, size7: false,
      size8: false, size9: false, size10: false, size11: false, size12: false, size13: false, size14: false, size15: false,
      size16: false, size17: false
    };
    this.colorFilter = { color1: false, color2: false, color3: false, color4: false, color5: false, color6: false, color7: false, color8: false };
    this.outsoleWarrantyFilter = { warranty1: false, warranty2: false };
    this.priceFilter = { range1: false, range2: false, range3: false, range4: false, range5: false, range6: false, range7: false, range8: false, range9: false };
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
    let temporaryList: any[] = [...this.menShoe.shoeList];
    for (var key of Object.keys(this.brandFilter)) {
      if (this.brandFilter[key]) {
          temporaryList = this.brandFilterChange(temporaryList);
          break;
      }
    }
    for (var key of Object.keys(this.sizeFilter)) {
      if (this.sizeFilter[key]) {
        temporaryList = this.sizeFilterChange(temporaryList);
        break;
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
  }

}

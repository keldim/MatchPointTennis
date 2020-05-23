import { Component, OnInit } from '@angular/core';
import { ApparelList } from '../apparel-list';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-apparel-men',
  templateUrl: './apparel-men.component.html',
  styleUrls: ['./apparel-men.component.css']
})
export class ApparelMenComponent implements OnInit {
  filterExpand1: boolean = false;
  filterExpand2: boolean = false;
  filterExpand3: boolean = false;
  filterExpand4: boolean = false;
  filterExpand5: boolean = false;
  menApparel = ApparelList.men;
  p: number = 1;
  filteredProducts: any[] = [];
  brandFilter: any;
  styleFilter: any;
  sizeFilter: any;
  colorFilter: any;
  priceFilter: any;
  apparelFilter: any = this.storageService.getApparelFilter();

  constructor(private storageService: StorageService) {
    this.storageService.watchApparelFilter().subscribe(apparelFilter => {
      this.apparelFilter = apparelFilter;
    });
  }

  ngOnInit() {
    this.filteredProducts = [...this.menApparel.apparelList];

    this.brandFilter = this.apparelFilter.brandFilter;
    this.styleFilter = this.apparelFilter.styleFilter;
    this.sizeFilter = this.apparelFilter.sizeFilter;
    this.colorFilter = this.apparelFilter.colorFilter;
    this.priceFilter = this.apparelFilter.priceFilter;

    if (Object.values(this.brandFilter).includes(true)) {
      this.filterExpand1 = true;
    }
    if (Object.values(this.styleFilter).includes(true)) {
      this.filterExpand2 = true;
    }
    if (Object.values(this.sizeFilter).includes(true)) {
      this.filterExpand3 = true;
    }
    if (Object.values(this.colorFilter).includes(true)) {
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
      (this.brandFilter.Lacoste && x.brand == "Lacoste") ||
      (this.brandFilter.Nike && x.brand == "Nike")
    );
      return filteredProductList;
  }

  styleFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.styleFilter.style1 && x.style == "Jacket") ||
      (this.styleFilter.style2 && x.style == "Long Sleeve") ||
      (this.styleFilter.style3 && x.style == "Pant") ||
      (this.styleFilter.style4 && x.style == "Polo") ||
      (this.styleFilter.style5 && x.style == "Shirt") ||
      (this.styleFilter.style6 && x.style == "Short")
    );
      return filteredProductList;
  }

  sizeFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.sizeFilter.size1 && x.size.includes("XS")) ||
      (this.sizeFilter.size2 && x.size.includes("S")) ||
      (this.sizeFilter.size3 && x.size.includes("M")) ||
      (this.sizeFilter.size4 && x.size.includes("L")) ||
      (this.sizeFilter.size5 && x.size.includes("XL")) ||
      (this.sizeFilter.size6 && x.size.includes("XXL"))
    );
      return filteredProductList;
  }

  colorFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.colorFilter.color1 && this.colorFinder("Black", x.color)) ||
      (this.colorFilter.color2 && this.colorFinder("Blue", x.color)) ||
      (this.colorFilter.color3 && this.colorFinder("Green", x.color)) ||
      (this.colorFilter.color4 && this.colorFinder("Gray", x.color)) ||
      (this.colorFilter.color5 && this.colorFinder("Purple", x.color)) ||
      (this.colorFilter.color6 && this.colorFinder("Red", x.color)) ||
      (this.colorFilter.color7 && this.colorFinder("White", x.color)) ||
      (this.colorFilter.color8 && this.colorFinder("Yellow", x.color))
    );
      return filteredProductList;
  }

  colorFinder(colorChoice: string, colorList: any[]) {
    for(let i = 0; i < colorList.length; i++) {
      if (colorList[i].includes(colorChoice)) {
        return true;
      }
    }
    return false;
  }

  priceFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.priceFilter.range1 && (Number(x.price) >= 10.00 && Number(x.price) <= 19.99)) ||
      (this.priceFilter.range2 && (Number(x.price) >= 20.00 && Number(x.price) <= 29.99)) ||
      (this.priceFilter.range3 && (Number(x.price) >= 30.00 && Number(x.price) <= 39.99)) ||
      (this.priceFilter.range4 && (Number(x.price) >= 40.00 && Number(x.price) <= 49.99)) ||
      (this.priceFilter.range5 && (Number(x.price) >= 50.00 && Number(x.price) <= 59.99)) ||
      (this.priceFilter.range6 && Number(x.price) >= 60.00)
    );
    return filteredProductList;
  }

  performFilter() {
    this.storageService.updateApparelFilter("apparelFilter", this.apparelFilter);
    let temporaryList: any[] = [...this.menApparel.apparelList];
    for (var key of Object.keys(this.brandFilter)) {
      if (this.brandFilter[key]) {
          temporaryList = this.brandFilterChange(temporaryList);
          break;
      }
    }
    for (var key of Object.keys(this.styleFilter)) {
      if (this.styleFilter[key]) {
          temporaryList = this.styleFilterChange(temporaryList);
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

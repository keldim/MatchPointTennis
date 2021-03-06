import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RacquetList } from '../racquets/racquet-list';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-racquets',
  templateUrl: './racquets.component.html',
  styleUrls: ['./racquets.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RacquetsComponent implements OnInit {
  filterExpand1: boolean = false;
  filterExpand2: boolean = false;
  filterExpand3: boolean = false;
  filterExpand4: boolean = false;
  filterExpand5: boolean = false;
  filterExpand6: boolean = false;
  racquets = RacquetList.racquets;
  p: number = 1;
  filteredProducts: any[] = [];
  brandFilter: any;
  headSizeFilter: any;
  stringPatternFilter: any;
  lengthFilter: any;
  strungWeightFilter: any;
  priceFilter: any;
  racquetFilter: any = this.storageService.getRacquetFilter();

  constructor(private storageService: StorageService) {
    this.storageService.watchRacquetFilter().subscribe(racquetFilter => {
      this.racquetFilter = racquetFilter;
    });
  }

  ngOnInit() {
    this.filteredProducts = [...this.racquets.racquetList];

    this.brandFilter = this.racquetFilter.brandFilter;
    this.headSizeFilter = this.racquetFilter.headSizeFilter;
    this.stringPatternFilter = this.racquetFilter.stringPatternFilter;
    this.lengthFilter = this.racquetFilter.lengthFilter;
    this.strungWeightFilter = this.racquetFilter.strungWeightFilter;
    this.priceFilter = this.racquetFilter.priceFilter;

    if (Object.values(this.brandFilter).includes(true)) {
      this.filterExpand1 = true;
    }
    if (Object.values(this.headSizeFilter).includes(true)) {
      this.filterExpand2 = true;
    }
    if (Object.values(this.stringPatternFilter).includes(true)) {
      this.filterExpand3 = true;
    }
    if (Object.values(this.lengthFilter).includes(true)) {
      this.filterExpand4 = true;
    }
    if (Object.values(this.strungWeightFilter).includes(true)) {
      this.filterExpand5 = true;
    }
    if (Object.values(this.priceFilter).includes(true)) {
      this.filterExpand6 = true;
    }

    this.performFilter();
  }

  changeCheckbox(filter, key) {
    if (filter == "brandFilter") {
      this.brandFilter[key] = !this.brandFilter[key];
    } else if (filter == "headSizeFilter") {
      this.headSizeFilter[key] = !this.headSizeFilter[key];
    } else if (filter == "stringPatternFilter") {
      this.stringPatternFilter[key] = !this.stringPatternFilter[key];
    } else if (filter == "lengthFilter") {
      this.lengthFilter[key] = !this.lengthFilter[key];
    } else if (filter == "strungWeightFilter") {
      this.strungWeightFilter[key] = !this.strungWeightFilter[key];
    } else {
      this.priceFilter[key] = !this.priceFilter[key];
    }
    this.performFilter();
  }

  brandFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.brandFilter.Babolat && x.brand == "Babolat") ||
      (this.brandFilter.Head && x.brand == "Head") ||
      (this.brandFilter.Prince && x.brand == "Prince") ||
      (this.brandFilter.Wilson && x.brand == "Wilson") ||
      (this.brandFilter.Yonex && x.brand == "Yonex")
    );
      return filteredProductList;
  }

  headSizeFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.headSizeFilter.range1 && (Number(x.headSize.split(" ")[0]) >= 90 && Number(x.headSize.split(" ")[0]) <= 94)) ||
      (this.headSizeFilter.range2 && (Number(x.headSize.split(" ")[0]) >= 95 && Number(x.headSize.split(" ")[0]) <= 99)) ||
      (this.headSizeFilter.range3 && (Number(x.headSize.split(" ")[0]) >= 100 && Number(x.headSize.split(" ")[0]) <= 104)) ||
      (this.headSizeFilter.range4 && (Number(x.headSize.split(" ")[0]) >= 105 && Number(x.headSize.split(" ")[0]) <= 109)) ||
      (this.headSizeFilter.range5 && (Number(x.headSize.split(" ")[0]) >= 110 && Number(x.headSize.split(" ")[0]) <= 114)) ||
      (this.headSizeFilter.range6 && (Number(x.headSize.split(" ")[0]) >= 115 && Number(x.headSize.split(" ")[0]) <= 119))
    );
      return filteredProductList;
  }

  stringPatternFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.stringPatternFilter.pattern1 && x.stringPattern == "14 x 18") ||
      (this.stringPatternFilter.pattern2 && x.stringPattern == "16 x 18") ||
      (this.stringPatternFilter.pattern3 && x.stringPattern == "16 x 19") ||
      (this.stringPatternFilter.pattern4 && x.stringPattern == "16 x 20") ||
      (this.stringPatternFilter.pattern5 && x.stringPattern == "18 x 19") ||
      (this.stringPatternFilter.pattern6 && x.stringPattern == "18 x 20")
    );
      return filteredProductList;
  }

  lengthFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.lengthFilter.length1 && x.length == "27 in") ||
      (this.lengthFilter.length2 && x.length == "27.25 in") ||
      (this.lengthFilter.length3 && x.length == "27.5 in") ||
      (this.lengthFilter.length4 && x.length == "27.75 in")
    );
      return filteredProductList;
  }

  strungWeightFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.strungWeightFilter.range1 && (Number(x.strungWeight.split(" ")[0]) >= 8.0 && Number(x.strungWeight.split(" ")[0]) <= 8.9)) ||
      (this.strungWeightFilter.range2 && (Number(x.strungWeight.split(" ")[0]) >= 9.0 && Number(x.strungWeight.split(" ")[0]) <= 9.9)) ||
      (this.strungWeightFilter.range3 && (Number(x.strungWeight.split(" ")[0]) >= 10.0 && Number(x.strungWeight.split(" ")[0]) <= 10.9)) ||
      (this.strungWeightFilter.range4 && (Number(x.strungWeight.split(" ")[0]) >= 11.0 && Number(x.strungWeight.split(" ")[0]) <= 11.9)) ||
      (this.strungWeightFilter.range5 && (Number(x.strungWeight.split(" ")[0]) >= 12.0 && Number(x.strungWeight.split(" ")[0]) <= 12.9))
    );
      return filteredProductList;
  }

  priceFilterChange(productList: any[]) {
    let filteredProductList: any[] = [];
    filteredProductList = productList.filter(x =>
      (this.priceFilter.range1 && (Number(x.price) >= 50.00 && Number(x.price) <= 99.99)) ||
      (this.priceFilter.range2 && (Number(x.price) >= 100.00 && Number(x.price) <= 149.99)) ||
      (this.priceFilter.range3 && (Number(x.price) >= 150.00 && Number(x.price) <= 199.99)) ||
      (this.priceFilter.range4 && (Number(x.price) >= 200.00 && Number(x.price) <= 249.99))
    );
      return filteredProductList;
  }

  performFilter() {
    this.storageService.updateRacquetFilter("racquetFilter", this.racquetFilter);
    let temporaryList: any[] = [...this.racquets.racquetList];
    for (var key of Object.keys(this.brandFilter)) {
      if (this.brandFilter[key]) {
          temporaryList = this.brandFilterChange(temporaryList);
          break;
      }
    }
    for (var key of Object.keys(this.headSizeFilter)) {
      if (this.headSizeFilter[key]) {
          temporaryList = this.headSizeFilterChange(temporaryList);
          break;
      }
    }
    for (var key of Object.keys(this.stringPatternFilter)) {
      if (this.stringPatternFilter[key]) {
        temporaryList = this.stringPatternFilterChange(temporaryList);
        break;
      }
    }
    for (var key of Object.keys(this.lengthFilter)) {
      if (this.lengthFilter[key]) {
        temporaryList = this.lengthFilterChange(temporaryList);
        break;
      }
    }
    for (var key of Object.keys(this.strungWeightFilter)) {
      if (this.strungWeightFilter[key]) {
        temporaryList = this.strungWeightFilterChange(temporaryList);
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

import { Component, OnInit } from '@angular/core';
import { ShoeList } from '../shoe-list';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-shoe-detail',
  templateUrl: './shoe-detail.component.html',
  styleUrls: ['./shoe-detail.component.css']
})
export class ShoeDetailComponent implements OnInit {
  selectedShoes: any[] = this.storageService.getSelectedShoes();
  total: any = this.storageService.getTotal();
  menShoe = ShoeList.men;
  womenShoe = ShoeList.women;
  currentShoe: any;
  size: string;
  quantity: string;

  constructor(private route: ActivatedRoute, private storageService: StorageService, private router: Router) {
    this.storageService.watchShoes().subscribe(selectedShoes => {
      this.selectedShoes = selectedShoes;
    });
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
  }

  ngOnInit() {
    let shoeId: number = parseInt(this.route.snapshot.params['id']);
    if (this.isMen()) {
      this.currentShoe  = this.menShoe.shoeList[shoeId - 1];
    } else {
      this.currentShoe  = this.womenShoe.shoeList[shoeId - 1];
    }
    this.size = "- Select Size -";
    this.quantity = "1";
  }

  addToCart() {
    const shoe = { ...this.currentShoe };
    shoe["size"] = this.size;
    shoe["quantity"] = this.quantity;
    let newArrayWithAddedItem = this.storageService.getSelectedShoes();
    newArrayWithAddedItem.push(shoe);
    this.storageService.updateShoes("selectedShoes", newArrayWithAddedItem);
    this.storageService.updateTotal("total", this.storageService.calculateTotal());
    this.router.navigate(['/cart']);
  }

  backToShoes() {
    if (this.isMen()) {
      this.router.navigate(['/shoe-men']);
    } else {
      this.router.navigate(['/shoe-women']);
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

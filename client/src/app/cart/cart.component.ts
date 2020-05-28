import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild(DeleteModalComponent) deleteModalComponent;
  selectedRacquets: any[] = this.storageService.getSelectedRacquets();
  selectedShoes: any[] = this.storageService.getSelectedShoes();
  selectedApparel: any[] = this.storageService.getSelectedApparel();
  selectedItems: any[] = this.storageService.getSelectedItems();
  total: any = this.storageService.getTotal();

  constructor(private storageService: StorageService) {
    this.storageService.watchRacquets().subscribe(selectedRacquets => {
      this.selectedRacquets = selectedRacquets;
    });
    this.storageService.watchShoes().subscribe(selectedShoes => {
      this.selectedShoes = selectedShoes;
    });
    this.storageService.watchApparel().subscribe(selectedApparel => {
      this.selectedApparel = selectedApparel;
    });
    this.storageService.watchItems().subscribe(selectedItems => {
      this.selectedItems = selectedItems;
    });
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
  }

  ngOnInit() {
  }

  openDelete(index, itemType) {
    this.deleteModalComponent.open(index, itemType);
  }

  quantityChange(event, type, index) {
    if(type == "racquet") {
      let newArrayForUpdate = this.storageService.getSelectedRacquets();
      newArrayForUpdate[index].quantity = event.target.value;
      this.storageService.updateRacquets("selectedRacquets", newArrayForUpdate);
      this.storageService.updateTotal("total", this.storageService.calculateTotal());
    } else if (type == "shoe") {
      let newArrayForUpdate = this.storageService.getSelectedShoes();
      newArrayForUpdate[index].quantity = event.target.value;
      this.storageService.updateShoes("selectedShoes", newArrayForUpdate);
      this.storageService.updateTotal("total", this.storageService.calculateTotal());
    } else if (type == "apparelItem") {
      let newArrayForUpdate = this.storageService.getSelectedApparel();
      newArrayForUpdate[index].quantity = event.target.value;
      this.storageService.updateApparel("selectedApparel", newArrayForUpdate);
      this.storageService.updateTotal("total", this.storageService.calculateTotal());
    } else if (type == "item") {
      let newArrayForUpdate = this.storageService.getSelectedItems();
      newArrayForUpdate[index].quantity = event.target.value;
      this.storageService.updateItems("selectedItems", newArrayForUpdate);
      this.storageService.updateTotal("total", this.storageService.calculateTotal());
    }
  }

  calculateTotalForItem(price, quantity) {
    return (Number(price) * Number(quantity)).toFixed(2);
  }

  calculateSubtotal() {
    let subtotal = 0;
    for(let racquet of this.selectedRacquets) {
      subtotal += racquet.quantity * racquet.price;
    }
    for(let shoe of this.selectedShoes) {
      subtotal += shoe.quantity * shoe.price;
    }
    for(let apparelItem of this.selectedApparel) {
      subtotal += apparelItem.quantity * apparelItem.price;
    }
    for(let item of this.selectedItems) {
      subtotal += item.quantity * item.price;
    }
    return subtotal;
  }

  showSubtotal() {
    return this.calculateSubtotal().toFixed(2);
  }

  showGrandTotal() {
    if (this.calculateSubtotal() > 0.00 && this.calculateSubtotal() < 50.00) {
      return (this.calculateSubtotal() + 5.75).toFixed(2);
    }
      return this.calculateSubtotal().toFixed(2);
  }
}

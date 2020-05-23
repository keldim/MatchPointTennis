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

  // for quantity update, use [(ngModel)], use update method of storageService in "proceed to checkout" button

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
  }

  ngOnInit() {
  }

  openDelete(index, itemType) {
    this.deleteModalComponent.open(index, itemType);
  }
}

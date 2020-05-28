import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-review-and-order',
  templateUrl: './review-and-order.component.html',
  styleUrls: ['./review-and-order.component.css']
})
export class ReviewAndOrderComponent implements OnInit {

  selectedRacquets: any[] = this.storageService.getSelectedRacquets();
  selectedShoes: any[] = this.storageService.getSelectedShoes();
  selectedApparel: any[] = this.storageService.getSelectedApparel();
  selectedItems: any[] = this.storageService.getSelectedItems();

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

}

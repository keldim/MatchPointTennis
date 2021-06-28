import { Component, OnInit } from '@angular/core';
import { ItemList } from '../item-list';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-other-items-detail',
  templateUrl: './other-items-detail.component.html',
  styleUrls: ['./other-items-detail.component.css']
})
export class OtherItemsDetailComponent implements OnInit {
  selectedItems: any[] = this.storageService.getSelectedItems();
  total: any = this.storageService.getTotal();
  items = ItemList.items;
  currentItem: any;
  quantity: string;

  constructor(private route: ActivatedRoute, private storageService: StorageService, private router: Router) {
    this.storageService.watchItems().subscribe(selectedItems => {
      this.selectedItems = selectedItems;
    });
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
  }

  ngOnInit() {
    let itemId: number = parseInt(this.route.snapshot.params['id']);
    this.currentItem  = this.items.itemList[itemId - 1];
    this.quantity = "1";
  }

  addToCart() {
    const item = { ...this.currentItem };
    item["quantity"] = this.quantity;
    let newArrayWithAddedItem = this.storageService.getSelectedItems();
    newArrayWithAddedItem.push(item);
    this.storageService.updateItems("selectedItems", newArrayWithAddedItem);
    this.storageService.updateTotal("total", this.storageService.calculateTotal());
    this.router.navigate(['/cart']);
  }

  backToItems() {
      this.router.navigate(['/items']);
  }
}

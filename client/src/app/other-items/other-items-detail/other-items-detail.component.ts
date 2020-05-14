import { Component, OnInit } from '@angular/core';
import { ItemList } from '../item-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-items-detail',
  templateUrl: './other-items-detail.component.html',
  styleUrls: ['./other-items-detail.component.css']
})
export class OtherItemsDetailComponent implements OnInit {

  items = ItemList.items;
  currentItem: any;
  quantity: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let itemId: number = parseInt(this.route.snapshot.params['id']);
    console.log(itemId);
    this.currentItem  = this.items.itemList[itemId - 1];
    this.quantity = "1";
  }
}

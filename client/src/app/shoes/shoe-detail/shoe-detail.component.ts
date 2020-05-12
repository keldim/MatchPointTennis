import { Component, OnInit } from '@angular/core';
import { ShoeList } from '../shoe-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shoe-detail',
  templateUrl: './shoe-detail.component.html',
  styleUrls: ['./shoe-detail.component.css']
})
export class ShoeDetailComponent implements OnInit {

  menShoe = ShoeList.men;
  currentShoe: any;
  size: string;
  quantity: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let shoeId: number = parseInt(this.route.snapshot.params['id']);
    console.log(shoeId);
    this.currentShoe  = this.menShoe.shoeList[shoeId - 1];
    this.size = "- Select Size -";
    this.quantity = "1";
  }
}

import { Component, OnInit } from '@angular/core';
import { ApparelList } from '../apparel-list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apparel-detail',
  templateUrl: './apparel-detail.component.html',
  styleUrls: ['./apparel-detail.component.css']
})
export class ApparelDetailComponent implements OnInit {

  menApparel = ApparelList.men;
  currentApparel: any;
  size: string;
  color: string;
  quantity: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let apparelId: number = parseInt(this.route.snapshot.params['id']);
    console.log(apparelId);
    this.currentApparel  = this.menApparel.apparelList[apparelId - 1];
    this.size = "- Select Size -";
    this.color = "- Select Color -";
    this.quantity = "1";
  }

}

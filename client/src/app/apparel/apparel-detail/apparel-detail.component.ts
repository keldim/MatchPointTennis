import { Component, OnInit } from '@angular/core';
import { ApparelList } from '../apparel-list';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-apparel-detail',
  templateUrl: './apparel-detail.component.html',
  styleUrls: ['./apparel-detail.component.css']
})
export class ApparelDetailComponent implements OnInit {
  selectedApparel: any[] = this.storageService.getSelectedApparel();
  total: any = this.storageService.getTotal();
  menApparel = ApparelList.men;
  currentApparel: any;
  size: string;
  color: string;
  quantity: string;

  constructor(private route: ActivatedRoute, private storageService: StorageService, private router: Router) {
    this.storageService.watchApparel().subscribe(selectedApparel => {
      this.selectedApparel = selectedApparel;
    });
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
  }

  ngOnInit() {
    let apparelId: number = parseInt(this.route.snapshot.params['id']);
    console.log(apparelId);
    this.currentApparel  = this.menApparel.apparelList[apparelId - 1];
    this.size = "- Select Size -";
    this.color = "- Select Color -";
    this.quantity = "1";
  }

  addToCart() {
    const apparel = { ...this.currentApparel };
    apparel["size"] = this.size;
    apparel["color"] = this.color;
    apparel["quantity"] = this.quantity;
    let newArrayWithAddedItem = this.storageService.getSelectedApparel();
    newArrayWithAddedItem.push(apparel);
    this.storageService.updateApparel("selectedApparel", newArrayWithAddedItem);
    this.storageService.updateTotal("total", this.storageService.calculateTotal());
    this.router.navigate(['/cart']);
  }

  backToApparel() {
    if (this.router.url.includes("apparel-men")) {
      this.router.navigate(['/apparel-men']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RacquetList } from '../../racquets/racquet-list';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-racquet-detail',
  templateUrl: './racquet-detail.component.html',
  styleUrls: ['./racquet-detail.component.css']
})
export class RacquetDetailComponent implements OnInit {
  selectedRacquets: any[] = this.storageService.getSelectedRacquets();
  total: any = this.storageService.getTotal();
  racquets = RacquetList.racquets;
  currentRacquet: any;
  gripSize: string;
  racquetString: string;
  tension: string;
  quantity: string;

  constructor(private route: ActivatedRoute, private storageService: StorageService) {
    this.storageService.watchRacquets().subscribe(selectedRacquets => {
      this.selectedRacquets = selectedRacquets;
    });
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
  }

  ngOnInit() {
    let racquetId: number = parseInt(this.route.snapshot.params['id']);
    console.log(racquetId);
    this.currentRacquet  = this.racquets.racquetList[racquetId - 1];
    this.gripSize = "- Select Grip Size -";
    this.racquetString = "- Select String -";
    this.tension = "- Select Tension -";
    this.quantity = "1";
  }

  addToCart() {
    const racquet = { ...this.currentRacquet };
    racquet["gripSize"] = this.gripSize;
    racquet["racquetString"] = this.racquetString;
    racquet["tension"] = this.tension;
    racquet["quantity"] = this.quantity;
    let newArrayWithAddedItem = this.storageService.getSelectedRacquets();
    newArrayWithAddedItem.push(racquet);
    this.storageService.updateRacquets("selectedRacquets", newArrayWithAddedItem);
    this.storageService.updateTotal("total", this.storageService.calculateTotal());
  }

}

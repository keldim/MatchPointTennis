import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RacquetList } from '../../racquets/racquet-list';

@Component({
  selector: 'app-racquet-detail',
  templateUrl: './racquet-detail.component.html',
  styleUrls: ['./racquet-detail.component.css']
})
export class RacquetDetailComponent implements OnInit {
  racquets = RacquetList.racquets;
  currentRacquet: any;
  gripSize: string;
  racquetString: string;
  tension: string;
  quantity: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let racquetId: number = parseInt(this.route.snapshot.params['id']);
    console.log(racquetId);
    this.currentRacquet  = this.racquets.racquetList[racquetId - 1];
    this.gripSize = "- Select Grip Size -";
    this.racquetString = "- Select String -";
    this.tension = "- Select Tension -";
    this.quantity = "1";
  }

}

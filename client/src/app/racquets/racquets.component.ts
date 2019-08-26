import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-racquets',
  templateUrl: './racquets.component.html',
  styleUrls: ['./racquets.component.css']
})
export class RacquetsComponent implements OnInit {
  filterExpand1: boolean = false;
  filterExpand2: boolean = false;
  filterExpand3: boolean = false;
  filterExpand4: boolean = false;
  filterExpand5: boolean = false;
  filterExpand6: boolean = false;

  constructor() { }

  ngOnInit() {
  }
}

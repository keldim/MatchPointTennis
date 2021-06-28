import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-past-order-detail',
  templateUrl: './past-order-detail.component.html',
  styleUrls: ['./past-order-detail.component.css']
})
export class PastOrderDetailComponent implements OnInit {

  pastOrder: Object;

  constructor(private route: ActivatedRoute, private http: HttpClient, private _authService: AuthService, private router: Router, private backendService: BackendService) {
  }

  ngOnInit() {
    let pastOrderId: number = parseInt(this.route.snapshot.params['id']);
    this._authService.getAccessToken().then(accessToken => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ` + accessToken
      });

      this.http.post(`${this.backendService.getBackendURL()}registered-user/past-order/${pastOrderId}`, {}, { headers: headers }).subscribe(
        (pastOrderReceived: Object) => {
          this.pastOrder = pastOrderReceived;
          if (this.pastOrder == null) {
            this.router.navigate(['/error-page']);
          } else if (this.pastOrder['address1'] == "Not Found") {
            this.router.navigate(['/**']);
          }
        },
        (err: any) => {
          console.log(err);
          if(err.error.error == "invalid_token") {
            this.router.navigate(['/**']);
          }
        },
        () => console.log("past order successfully loaded")
      );
    });
  }

  calculatePriceForRacquet(string, mainItem) {
    if (string.includes("$17.95")) {
      return (17.95 + Number(mainItem)).toFixed(2);
    } else if (string.includes("$18.95")) {
      return (18.95 + Number(mainItem)).toFixed(2);
    } else if (string.includes("$20.95")) {
      return (20.95 + Number(mainItem)).toFixed(2);
    } else {
      return mainItem;
    }
  }

  calculateTotalForItem(price, quantity) {
    return (Number(price) * Number(quantity)).toFixed(2);
  }

  calculateSubtotal() {
    let subtotal = 0;
    for (let racquet of this.pastOrder['racquets']) {
      subtotal += racquet.quantity * this.calculatePriceForRacquet(racquet.racquetString, racquet.price);
    }
    for (let shoe of this.pastOrder['shoes']) {
      subtotal += shoe.quantity * shoe.price;
    }
    for (let apparelItem of this.pastOrder['apparel']) {
      subtotal += apparelItem.quantity * apparelItem.price;
    }
    for (let item of this.pastOrder['items']) {
      subtotal += item.quantity * item.price;
    }
    return subtotal;
  }

  showSubtotal() {
    return this.calculateSubtotal().toFixed(2);
  }

  showGrandTotal() {
    if (this.calculateSubtotal() > 0.00 && this.calculateSubtotal() < 50.00) {
      return (this.calculateSubtotal() + 5.75).toFixed(2);
    }
    return this.calculateSubtotal().toFixed(2);
  }

  backToPastOrders() {
    this.router.navigate(['/past-orders']);
  }

}

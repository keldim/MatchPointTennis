import { Component, OnInit, NgZone } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

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
  total: any = this.storageService.getTotal();
  shoppingAndPaymentInfo: Object;
  isLoggedIn = false;
  loading = false;

  constructor(private storageService: StorageService, private fb: FormBuilder, private http: HttpClient, private router: Router,
    private zone: NgZone, private _authService: AuthService, private backendService: BackendService) {
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
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    this.getShoppingAndPaymentInfo().subscribe(
      (data) => this.shoppingAndPaymentInfo = data,
      (err: any) => console.log(err),
      () => console.log("received response from the server 2")
    );
    this._authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  getShoppingAndPaymentInfo() {
    return this.http.get(this.backendService.getBackendURL() + 'form-input/ephemeral-data');
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
    for (let racquet of this.selectedRacquets) {
      subtotal += racquet.quantity * this.calculatePriceForRacquet(racquet.racquetString, racquet.price);
    }
    for (let shoe of this.selectedShoes) {
      subtotal += shoe.quantity * shoe.price;
    }
    for (let apparelItem of this.selectedApparel) {
      subtotal += apparelItem.quantity * apparelItem.price;
    }
    for (let item of this.selectedItems) {
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

  backToShippingAndPayment() {
    this.router.navigate(['/shipping-and-payment']);
  }

  showOnlyLastFourNumbers(creditCardNumber) {
    if (creditCardNumber == '') {
      return "";
    }
    return "**** **** **** " + creditCardNumber.slice(12);
  }

  getCreditCardType(creditCardNumber) {
    if (creditCardNumber == '') {
      return "";
    }

    let amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
    let visa_regex = new RegExp('^4[0-9]{0,}$'); //4
    let mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
    let discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');

    var type = "unknown";
    if (creditCardNumber.match(amex_regex)) {
      type = "Amex";
    } else if (creditCardNumber.match(visa_regex)) {
      type = "Visa";
    } else if (creditCardNumber.match(mastercard_regex)) {
      type = "Mastercard";
    } else if (creditCardNumber.match(discover_regex)) {
      type = "Discover";
    }

    return type;
  }

  formatPhoneNumber(phoneNumber) {
    if (phoneNumber == '') {
      return "";
    }
    return "(" + phoneNumber.slice(0, 3) + ") " + phoneNumber.slice(3, 6) + " - " + phoneNumber.slice(6, 11);
  }

  formatCityStateZipcode(city, state, zipcode) {
    if (city == '' || state == '' || zipcode == '') {
      return "";
    }
    return city + ', ' + state + ' ' + zipcode;
  }

  cancelAndCleanUp() {
    this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
      console.log(resp);
    });
    this.router.navigate(['/cart']);
  }

  chargeCreditCard() {
    this.loading = true;
    (<any>window).Stripe.card.createToken({
      number: this.shoppingAndPaymentInfo['cardNumber'],
      exp_month: this.shoppingAndPaymentInfo['expMonth'],
      exp_year: this.shoppingAndPaymentInfo['expYear'],
      cvc: this.shoppingAndPaymentInfo['cvc']
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        this.zone.run(() => {
          this.router.navigate(['/error-page']);
        });
      }
    });
  }

  chargeCard(token: string) {
    if (this.isLoggedIn) {
      this._authService.getAccessToken().then(accessToken => {
        console.log(accessToken);

        const headers = new HttpHeaders({
          'Authorization': `Bearer ` + accessToken,
          'token': token,
          'amount': this.showGrandTotal().toString(),
          'subtotal': this.showSubtotal().toString(),
          'selectedRacquets': localStorage.getItem("selectedRacquets"),
          'selectedShoes': localStorage.getItem("selectedShoes"),
          'selectedApparel': localStorage.getItem("selectedApparel"),
          'selectedItems': localStorage.getItem("selectedItems"),
          'firstName': this.shoppingAndPaymentInfo['firstName'],
          'lastName': this.shoppingAndPaymentInfo['lastName'],
          'email': this.shoppingAndPaymentInfo['email'],
          'phoneNumber': this.formatPhoneNumber(this.shoppingAndPaymentInfo['phoneNumber']),
          'address1': this.shoppingAndPaymentInfo['address1'],
          'address2': this.shoppingAndPaymentInfo['address2'],
          'city': this.shoppingAndPaymentInfo['city'],
          'state': this.shoppingAndPaymentInfo['state'],
          'zipcode': this.shoppingAndPaymentInfo['zipcode'],
          'cardLastFourNumbers': this.showOnlyLastFourNumbers(this.shoppingAndPaymentInfo['cardNumber']),
          'cardType': this.getCreditCardType(this.shoppingAndPaymentInfo['cardNumber'])
        });

        console.log(headers);

        this.http.post(this.backendService.getBackendURL() + 'registered-user/charge', {}, { headers: headers }).subscribe(resp => {
          console.log(resp);
          if (resp == null) {
            this.zone.run(() => {
              this.router.navigate(['/error-page']);
            });
          } else {
            this.zone.run(() => {
              this.router.navigate(['/thank-you']);
            });
          }
        });

        this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
          console.log(resp);
        });
        this.storageService.clear();
      });
    } else {
      const headers = new HttpHeaders({
        'token': token,
        'amount': this.showGrandTotal().toString(),
        'subtotal': this.showSubtotal().toString(),
        'selectedRacquets': localStorage.getItem("selectedRacquets"),
        'selectedShoes': localStorage.getItem("selectedShoes"),
        'selectedApparel': localStorage.getItem("selectedApparel"),
        'selectedItems': localStorage.getItem("selectedItems"),
        'firstName': this.shoppingAndPaymentInfo['firstName'],
        'lastName': this.shoppingAndPaymentInfo['lastName'],
        'email': this.shoppingAndPaymentInfo['email'],
        'phoneNumber': this.formatPhoneNumber(this.shoppingAndPaymentInfo['phoneNumber']),
        'address1': this.shoppingAndPaymentInfo['address1'],
        'address2': this.shoppingAndPaymentInfo['address2'],
        'city': this.shoppingAndPaymentInfo['city'],
        'state': this.shoppingAndPaymentInfo['state'],
        'zipcode': this.shoppingAndPaymentInfo['zipcode'],
        'cardLastFourNumbers': this.showOnlyLastFourNumbers(this.shoppingAndPaymentInfo['cardNumber']),
        'cardType': this.getCreditCardType(this.shoppingAndPaymentInfo['cardNumber'])



        // clear shoppingandpaymentinfo after placing order?


      });
      console.log(headers);

      this.http.post(this.backendService.getBackendURL() + 'unregistered-user/charge', {}, { headers: headers }).subscribe(resp => {
        console.log(resp);
        if (resp == null) {
          this.zone.run(() => {
            this.router.navigate(['/error-page']);
          });
        } else {
          this.zone.run(() => {
            this.router.navigate(['/thank-you']);
          });
        }
      });

      this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
        console.log(resp);
      });
      this.storageService.clear();
    }


  }


}

import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private storageService: StorageService, private fb: FormBuilder, private http: HttpClient, private router: Router) {
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
  }

  ngOnInit() {
    this.getShoppingAndPaymentInfo().subscribe(
      (data) => this.shoppingAndPaymentInfo = data,
      (err: any) => console.log(err),
      () => console.log("received response from the server 2")
    );
  }

  getShoppingAndPaymentInfo() {
    return this.http.get('http://localhost:8080/unregistered-user/shipping-and-payment-info');
  }

  calculateTotalForItem(price, quantity) {
    return (Number(price) * Number(quantity)).toFixed(2);
  }

  calculateSubtotal() {
    let subtotal = 0;
    for(let racquet of this.selectedRacquets) {
      subtotal += racquet.quantity * racquet.price;
    }
    for(let shoe of this.selectedShoes) {
      subtotal += shoe.quantity * shoe.price;
    }
    for(let apparelItem of this.selectedApparel) {
      subtotal += apparelItem.quantity * apparelItem.price;
    }
    for(let item of this.selectedItems) {
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
    return "**** **** **** " + creditCardNumber.slice(12);
  }

  getCreditCardType(creditCardNumber) {
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
    return "(" + phoneNumber.slice(0,3) + ") " + phoneNumber.slice(3,6) + " - " + phoneNumber.slice(6,11);
  }

}

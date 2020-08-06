import { Component, OnInit, HostListener } from '@angular/core';
import { StateList } from './state-list';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';

function expiredMonthYear(c: AbstractControl): { [key: string]: boolean } | null {
  let today = new Date();
  let someday = new Date();
  someday.setFullYear(c.get('expYear').value, c.get('expMonth').value - 1, someday.getDate());

  if (someday < today) {
    return { 'expired': true };
  } else {
    return null;
  }
}

@Component({
  selector: 'app-shipping-and-payment',
  templateUrl: './shipping-and-payment.component.html',
  styleUrls: ['./shipping-and-payment.component.css']
})
export class ShippingAndPaymentComponent implements OnInit {
  shippingAndPaymentForm: FormGroup;
  shoppingAndPaymentInfo: Object;
  stateList = StateList.states;

  constructor(private storageService: StorageService, private router: Router, private fb: FormBuilder, private http: HttpClient, private backendService: BackendService) {

  }

  namePattern = /^[a-zA-Z]{2,}/;
  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  phonePattern = /^((\\+91-?)|0)?[0-9]{10}$/;
  cardNumberPattern = /^\d{4}\d{4}\d{4}\d{4}$/;
  monthPattern = /^0[1-9]$|^1[0-2]$/;
  cvcPattern = /^[0-9]{3,4}$/;
  yearPattern = /^[0-9][0-9][0-9][0-9]$/;
  zipcodePattern = /^\d{5}(?:[-\s]\d{4})?$/;
  addressAndCityPattern = /^(?!\s*$).+/;

  ngOnInit() {
    this.getShoppingAndPaymentInfo().subscribe(
      (data) => this.shoppingAndPaymentInfo = data,
      (err: any) => console.log(err),
      () => {
        console.log("received response from the server 1");
        this.shippingAndPaymentForm = this.fb.group({
          firstName: [this.shoppingAndPaymentInfo['firstName'], [Validators.required, Validators.pattern(this.namePattern)]],
          lastName: [this.shoppingAndPaymentInfo['lastName'], [Validators.required, Validators.pattern(this.namePattern)]],
          email: [this.shoppingAndPaymentInfo['email'], [Validators.required, Validators.pattern(this.emailPattern)]],
          phoneNumber: [this.shoppingAndPaymentInfo['phoneNumber'], [Validators.required, Validators.pattern(this.phonePattern)]],

          address1: [this.shoppingAndPaymentInfo['address1'], [Validators.required, Validators.pattern(this.addressAndCityPattern)]],
          address2: [this.shoppingAndPaymentInfo['address2']],
          city: [this.shoppingAndPaymentInfo['city'], [Validators.required, Validators.pattern(this.addressAndCityPattern)]],
          state: [this.shoppingAndPaymentInfo['state'], Validators.required],
          zipcode: [this.shoppingAndPaymentInfo['zipcode'], [Validators.required, Validators.pattern(this.zipcodePattern)]],

          cardNumber: [this.shoppingAndPaymentInfo['cardNumber'], [Validators.required, Validators.pattern(this.cardNumberPattern)]],
          expGroup: this.fb.group({
            expMonth: [this.shoppingAndPaymentInfo['expMonth'], [Validators.required, Validators.pattern(this.monthPattern)]],
            expYear: [this.shoppingAndPaymentInfo['expYear'], [Validators.required, Validators.pattern(this.yearPattern)]]
          }, { validator: expiredMonthYear }),
          cvc: [this.shoppingAndPaymentInfo['cvc'], [Validators.required, Validators.pattern(this.cvcPattern)]]
        });
      }
    );
  }



  getShoppingAndPaymentInfo() {
    return this.http.get(this.backendService.getBackendURL() + 'form-input/ephemeral-data');
  }


  sendInfo() {
    const headers = new HttpHeaders({
      'firstName': this.shippingAndPaymentForm.controls.firstName.value.trim(),
      'lastName': this.shippingAndPaymentForm.controls.lastName.value.trim(),
      'email': this.shippingAndPaymentForm.controls.email.value,
      'phoneNumber': this.shippingAndPaymentForm.controls.phoneNumber.value,

      'address1': this.shippingAndPaymentForm.controls.address1.value.trim(),
      'address2': this.shippingAndPaymentForm.controls.address2.value.trim(),
      'city': this.shippingAndPaymentForm.controls.city.value.trim(),
      'state': this.shippingAndPaymentForm.controls.state.value,
      'zipcode': this.shippingAndPaymentForm.controls.zipcode.value,

      'cardNumber': this.shippingAndPaymentForm.controls.cardNumber.value,
      'expMonth': this.shippingAndPaymentForm.controls.expGroup.get('expMonth').value,
      'expYear': this.shippingAndPaymentForm.controls.expGroup.get('expYear').value,
      'cvc': this.shippingAndPaymentForm.controls.cvc.value

    });
    console.log(headers);

    this.http.post(this.backendService.getBackendURL() + 'form-input/data', {}, { headers: headers }).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/review-and-order']);
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  canLeavePage($event: any) {
    console.log("beforeunload reached");
    this.http.post(this.backendService.getBackendURL() + 'form-input/clean-up', {}).subscribe(resp => {
      console.log(resp);
    });
  }

  cancelAndCleanUp() {
    this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
      console.log(resp);
    });
    this.router.navigate(['/cart']);
  }

  // delete input data with 'cancel' and 'place order' buttons?

  // post data to server, save data in variables, send back data for review page, clean up when order is finished?

}

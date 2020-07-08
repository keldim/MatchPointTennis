import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  total: any = this.storageService.getTotal();
  isLoggedIn = false;

  constructor(private storageService: StorageService, private router: Router, private _authService: AuthService) {
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    this._authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

  hideNavBar() {
    if (this.router.url.includes("shipping-and-payment") || this.router.url.includes("review-and-order")) {
      return false;
    } else {
      return true;
    }
  }

  mainContentTopMargin() {
    if (this.router.url.includes("home")) {
      return 'type1';
    } else if (this.router.url.includes("shipping-and-payment") || this.router.url.includes("review-and-order")) {
      return 'type2';
    } else {
      return 'type3';
    }
  }

}

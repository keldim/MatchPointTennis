import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  total: any = this.storageService.getTotal();

  constructor(private storageService: StorageService, private router: Router) {
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
  }

  hideNavBar() {
    if (this.router.url.includes("shipping-and-payment") || this.router.url.includes("review-and-order")) {
      return false;
    } else {
      return true;
    }
  }

}

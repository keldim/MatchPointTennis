import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  total: any = this.storageService.getTotal();

  constructor(private storageService: StorageService) {
    this.storageService.watchTotal().subscribe(total => {
      this.total = total;
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {
  pastOrders: Object[] = [];

  constructor(private http: HttpClient, private _authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this._authService.getAccessToken().then(accessToken => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ` + accessToken
      });
      console.log("sending request for past orders");
      this.http.post('http://match-point-tennis-server.eba-8q6mbktj.us-east-2.elasticbeanstalk.com/registered-user/past-orders', {}, { headers: headers }).subscribe(
        // http://localhost:5000/
        (pastOrdersReceived: Object[]) => this.pastOrders = pastOrdersReceived,
        (err: any) => console.log(err),
        () => console.log("received response from the server")
      );
      if (this.pastOrders == null) {
        console.log("error in parsing JSON in the server");
        this.router.navigate(['/error-page']);
      }
    });
  }


}

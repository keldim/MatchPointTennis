import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const passwordConfirmationControl = c.get('passwordConfirmation');
  if (passwordControl.value === passwordConfirmationControl.value) {
    return null;
  }
  return { 'match': true };
}


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  newUserInfo: FormGroup;
  successAlert: boolean = false;
  failAlert: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  addNewUser() {
    const header1 = new HttpHeaders({
      'username': this.newUserInfo.controls.username.value
    });

    console.log(header1);

    // this.http.post('http://localhost:8080/openid-connect-server-webapp/username-duplicate', {}, { headers: header1 }).subscribe
    this.http.get(this.authService.getAuthorityURL() + 'username-duplicate', { headers: header1 }).subscribe((response: boolean) => {
      // http://new-mitreid-env.eba-ppwpqerk.us-east-2.elasticbeanstalk.com/username-duplicate
      if (response === true) {
        console.log("reached");

        this.failAlert = true;

        this.router.navigate(['/new-user']);
        return;
      } else {
        const header2 = new HttpHeaders({
          'username': this.newUserInfo.controls.username.value,
          'password': this.newUserInfo.controls.passwordGroup.get('password').value,
          'email': this.newUserInfo.controls.email.value,
          'enabled': this.newUserInfo.controls.enabled.value
        });

        console.log(header2);

        // this.http.post('http://localhost:8080/openid-connect-server-webapp/add-user', {}, { headers: header2 }).subscribe
        this.http.get(this.authService.getAuthorityURL() + 'add-user', { headers: header2 }).subscribe(resp => {
          // http://new-mitreid-env.eba-ppwpqerk.us-east-2.elasticbeanstalk.com/add-user
          console.log(resp);
        });

        this.newUserInfo.reset();
        this.newUserInfo.patchValue({
          username: "",
          passwordGroup: {
            password: "",
            passwordConfirmation: ""
          },
          email: "",
          enabled: "1"
        });

        // this.router.navigate(['/order-online/current-order']);
        this.successAlert = true;
      }
    });
  }

  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  passwordPattern = /^(?=.*\d).{4,8}$/;
  usernamePattern = /^[a-zA-Z]\w{3,14}$/;

  ngOnInit() {
    this.newUserInfo = this.fb.group({
      username: ["", [Validators.required, Validators.pattern(this.usernamePattern)]],
      passwordGroup: this.fb.group({
        password: ["", [Validators.required, Validators.pattern(this.passwordPattern)]],
        passwordConfirmation: ["", Validators.required]
      }, { validator: passwordMatcher }),
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      enabled: "1"
    });
  }

  resetSuccessAlert() {
    this.successAlert = false;
  }

  resetFailAlert() {
    this.failAlert = false;
  }
}


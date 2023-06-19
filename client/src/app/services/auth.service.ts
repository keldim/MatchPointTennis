import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserManager, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // http://localhost:8080/openid-connect-server-webapp/
  // http://localhost:4200/
  private authorityURL = "https://mitreid-backend.com/"
  private frontendURL = "https://www.cy-match-point-tennis.com/"

  private _userManager: UserManager;
  private _user : User;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();


  constructor(private http: HttpClient) {
    const config = {
      authority: this.authorityURL,
      client_id: '0a45ad9f-bd96-4f75-a57e-7dccf90a53ef',
      redirect_uri: this.frontendURL + 'signin-callback',
      scope: 'openid',
      response_type: 'id_token token',
      post_logout_redirect_uri: this.frontendURL + 'signout-callback'
    };
    // matchpointtennis

    this._userManager = new UserManager(config);
    this._userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });
  }

  login() {
    return this._userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;
      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      this._user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }


  logout() {
    this._userManager.signoutRedirect();
  }

  completeLogout() {
    this._user = null;
    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }

  getAuthorityURL() {
    return this.authorityURL;
  }
}

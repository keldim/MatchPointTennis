import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authenticated = false;
  private _userManager: UserManager;
  private _user : User;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();


  constructor(private http: HttpClient) {
    const config = {
      authority: 'http://mitre-id-server.eba-qjffpfif.us-east-2.elasticbeanstalk.com/',
      // http://localhost:8080/openid-connect-server-webapp/
      // http://new-mitreid-env.eba-ppwpqerk.us-east-2.elasticbeanstalk.com/
      client_id: 'matchpointtennis',
      redirect_uri: 'http://match-point-tennis-client.s3-website.us-east-2.amazonaws.com/signin-callback',
      // http://campania-pizza-client.s3-website.us-east-2.amazonaws.com/assets/oidc-login-redirect.html
      // http://localhost:4200/signin-callback
      scope: 'openid',
      response_type: 'id_token token',
      // projects-api profile
      // prompt: 'none',
      post_logout_redirect_uri: 'http://match-point-tennis-client.s3-website.us-east-2.amazonaws.com/signout-callback'
      // http://campania-pizza-client.s3-website.us-east-2.amazonaws.com/?postLogout=true
      // http://localhost:4200/
      // http://localhost:4200/signout-callback
      // userStore: new WebStorageStateStore({ store: window.localStorage })
    };

    this._userManager = new UserManager(config);
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
}

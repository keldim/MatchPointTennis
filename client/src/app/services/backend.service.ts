import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // http://localhost:5000/
  private backendURL = "https://match-point-tennis-backend.com/";

  constructor() { }

  getBackendURL() {
    return this.backendURL;
  }
}

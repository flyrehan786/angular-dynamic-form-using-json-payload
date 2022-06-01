import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signIn(endPoint, username, password) {
    return this.http.post(endPoint + 'auth', {
      username,
      password,
    });
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.clear();
  }
  getDecodedToken() {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(token);
    return decodedToken;
  }
  getToken() {
    return localStorage.getItem('token');
  }
  public isLoggedIn() {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if (token) {
      // const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);
      if (!isExpired) return true;
      else return false;
    } else return false;
  }
}

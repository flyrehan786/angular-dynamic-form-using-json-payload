import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Checking user is loggedIn or not.
// If username is login then return true.
// Otherwise return false.
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    if (this.authService.isLoggedIn) return true;
    this.router.navigate(['/']);
    alert('Access Denied');
    return false;
  }
}

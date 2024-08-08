import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (!this.isValidEmail(this.email)) {
      alert('Invalid email format.');
      return;
    }

    if (this.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    this.authService.signup(this.email, this.password).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/login']);
        } else {
          alert('Signup failed');
        }
      },
      error => {
        alert('Signup failed: ' + error.message);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}

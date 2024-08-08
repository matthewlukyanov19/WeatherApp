import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.isValidEmail(this.email)) {
      alert('Invalid email format.');
      return;
    }

    if (this.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      user => {
        if (user) {
          this.router.navigate(['/home']);
        } else {
          alert('Login failed');
        }
      },
      error => {
        alert('Login failed: ' + error.message);
      }
    );
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}

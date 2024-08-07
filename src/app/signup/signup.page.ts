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
    this.authService.signup(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      } else {
        
        alert('Signup failed');
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

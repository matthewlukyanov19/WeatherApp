import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(); // Use the Firebase auth instance

  signup(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map(userCredential => userCredential.user), // Extract user data
      catchError(error => {
        console.error('Signup error', error);
        return []; // Handle errors gracefully
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(userCredential => userCredential.user), // Extract user data
      catchError(error => {
        console.error('Login error', error);
        return []; // Handle errors gracefully
      })
    );
  }
}

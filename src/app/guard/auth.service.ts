import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, takeUntil, of, map, catchError} from 'rxjs';
import { tap } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Check if the user is already logged in when the service is initialized
    const token = localStorage.getItem('token');
    this.loggedIn.next(!!token);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(environment.loginUrl, credentials).pipe(
      tap((response: any) => {
        // Store the token in local storage
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true);
      })
    );
  }

  validateToken(): Observable<boolean> {
    if (!this.isLoggedIn()) {
      // No token found, consider the user as not authenticated
      return of(false);
    }

    const token = localStorage.getItem('token');

    // Make an API call to validate the token
    return this.http.post<{ isValid: boolean }>(environment.validateTokenUrl, { token })
      .pipe(
        map(response => response.isValid),
        catchError(() => {
          // Handle API error
          this.logout();
          return of(false);
        })
      );
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in by checking if a token exists in local storage
    const token = localStorage.getItem('token');
    return !!token;
  }
}

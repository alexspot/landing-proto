import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions'; 

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  isLoggedIn: boolean = false;
  redirectUrl: string;

  // user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  signUp(email: string, password: string) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(err => throwError(err)),
      tap(response => {
        console.log(response);
        this.isLoggedIn = true;
        this.storeUserDataInLocalStorage(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    );
  }

  signIn(email: string, password: string) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(err => throwError(err)),
      tap(response => {
        console.log(response);
        this.isLoggedIn = true;
        this.storeUserDataInLocalStorage(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    );
  }

  signOut(email: string) {
    const userData:any = JSON.parse(localStorage.getItem('userData'));
    if (userData.email == email) {
      localStorage.removeItem('userData');
      this.isLoggedIn = false;
      this.store.dispatch(new AuthActions.Logout());
    }
  }

  private storeUserDataInLocalStorage(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(new AuthActions.Login({email: user.email, userId: user.id, token: user.token, expirationDate: expirationDate}));
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user)); 
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authenticationForm: FormGroup;
  authenticationError: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authenticationForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
    this.store.select('auth').subscribe(authState => {
      if (authState.authError) {
        this.authenticationError = authState.authError;

      }

    })
  }

  onAuthFormSubmit() {
    let authObservable: Observable<any>; 
    let email                 = this.authenticationForm.get('email').value
    let password              = this.authenticationForm.get('password').value


    // authObservable          = this.authService.signIn(email, password);

    this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))

    // authObservable.subscribe(
    //   resData => {
    //     this.router.navigate(['/order/all']);
    //   },
    //   error => {
    //     console.log(this.authenticationForm);
    //   }
    // );
  }

}

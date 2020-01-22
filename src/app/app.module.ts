import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CountdownModule } from 'ngx-countdown';
import { HttpClientModule } from '@angular/common/http';


import { StoreModule } from '@ngrx/store';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationService } from './authentication.service';

import * as fromApp from './store/app.reducer';
import { AuthGuard } from './auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';


const appRoutes: Routes = [
  { path: '',                 component: MainPageComponent},
  { path: 'order',            component: OrderComponent, 
    children: [
      { path: 'create',       component: OrderCreateComponent },
      // { path: ':id/edit',     component: OrderEditComponent, canActivate: [AuthGuard] },
      { path: ':id/edit',     component: OrderEditComponent },
      // { path: 'all',          component: OrderListComponent, canActivate: [AuthGuard] },
      { path: 'all',          component: OrderListComponent },
    ] 
  },
  { path: 'admin',            component: AdminComponent },
  { path: 'thank-you',        component: ThankYouPageComponent},
  { path: 'login',            component: AuthComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    AdminComponent,
    ThankYouPageComponent,
    MainPageComponent,
    OrderEditComponent,
    OrderListComponent,
    OrderCreateComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    CountdownModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule
  ],
  providers: [
    DataStorageService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

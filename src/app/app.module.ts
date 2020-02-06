import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './orders/order.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DataStorageService } from './data-storage.service';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CountdownModule } from 'ngx-countdown';
import { HttpClientModule } from '@angular/common/http';


import { StoreModule } from '@ngrx/store';
import { OrderEditComponent } from './orders/order-edit/order-edit.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderCreateComponent } from './orders/order-create/order-create.component';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationService } from './authentication.service';

import * as fromApp from './store/app.reducer';
import { AuthGuard } from './auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { OrderEffects } from './orders/store/order.effects';
import { ProductsComponent } from './products/products.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductEffects } from './products/store/product.effects';


const appRoutes: Routes = [
  { path: '',                 component: MainPageComponent},
  { path: 'order',            component: OrderComponent, 
    children: [
      { path: ':id/create',   component: OrderCreateComponent },
      // { path: ':id/edit',     component: OrderEditComponent, canActivate: [AuthGuard] },
      { path: ':id/edit',     component: OrderEditComponent },
      // { path: 'all',          component: OrderListComponent, canActivate: [AuthGuard] },
      { path: 'all',          component: OrderListComponent },
    ] 
  },
  { path: 'product',          component: ProductsComponent,
    children: [
      { path: 'create',       component: ProductCreateComponent },
      { path: ':id/edit',     component: ProductEditComponent },
      { path: 'all',          component: ProductListComponent },
    ]},
  { path: 'admin',            component: AdminComponent },
  { path: 'thank-you',        component: ThankYouPageComponent},
  { path: 'login',            component: AuthComponent }
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
    AuthComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    CountdownModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, OrderEffects, ProductEffects]),
    HttpClientModule
  ],
  providers: [
    DataStorageService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

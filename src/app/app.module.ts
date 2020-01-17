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


import { StoreModule } from '@ngrx/store';
import { orderReducer } from './order/store/order.reducer';
import { OrderEditComponent } from './order/order-edit/order-edit.component';
import { OrderListComponent } from './order/order-list/order-list.component';


const appRoutes: Routes = [
  { path: '',                 component: MainPageComponent},
  { path: 'order',            component: OrderComponent, 
    children: [
      { path: ':id/edit',       component: OrderEditComponent },
      { path: 'all',            component: OrderListComponent },
    ] 
  },
  { path: 'admin',            component: AdminComponent },
  { path: 'thank-you',        component: ThankYouPageComponent}
]

// path: 'recipes',
// component: RecipesComponent,
// children: [
//   { path: '', component: RecipeStartComponent },
//   { path: 'new', component: RecipeEditComponent },
//   {
//     path: ':id',
//     component: RecipeDetailComponent,
//     resolve: [RecipesResolverService]
//   },
//   {
//     path: ':id/edit',
//     component: RecipeEditComponent,
//     resolve: [RecipesResolverService]
//   }
// ]
// },

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    AdminComponent,
    ThankYouPageComponent,
    MainPageComponent,
    OrderEditComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    CountdownModule,
    StoreModule.forRoot({order: orderReducer})
  ],
  providers: [
    DataStorageService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

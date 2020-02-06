import * as fromApp from '../../store/app.reducer'; 
import * as ProductActions from '../store/product.actions';

import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { withLatestFrom, switchMap, map } from 'rxjs/operators';
import { Product } from '../product.model';

@Injectable()
export class ProductEffects {

  @Effect({dispatch: false})
  storeProduct = this.actions$.pipe(
    ofType(ProductActions.CREATE_PRODUCT),
    withLatestFrom(this.store.select('product')),
    switchMap(([actionData, productState]) => {
      return this.http.put<Product>(
        'https://landing-prototype-d2dc6.firebaseio.com/products.json',
        productState.productList
      );
    })
  );

  @Effect()
  getProducts = this.actions$.pipe(
    ofType(ProductActions.GET_PRODUCTS),
    switchMap(() => {
      return this.http.get<Product[]>(
        'https://landing-prototype-d2dc6.firebaseio.com/products.json'
      );
    }),
    map(products => {
      return products.map(product => {
        return {
          ...product
        };
      });
    }),
    map(products => {
      return new ProductActions.setProducts(products);
    })
  );

  @Effect({dispatch: false})
  storeProducts = this.actions$.pipe(
    ofType(ProductActions.STORE_PRODUCTS),
    withLatestFrom(this.store.select('product')),
    switchMap(([actionData, productState]) => {
      return this.http.put(
        'https://landing-prototype-d2dc6.firebaseio.com/products.json',
        productState.productList
      );
    })
  )
  
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) {}
  
}
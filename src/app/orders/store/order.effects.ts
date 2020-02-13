import * as OrderActions from './order.actions';
import * as fromApp from '../../store/app.reducer';
import { environment } from 'src/environments/environment';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Order } from '../order.model';
import { Store } from '@ngrx/store';

@Injectable()
export class OrderEffects {

  @Effect({dispatch: false})
  storeOrder = this.actions$.pipe(
    ofType(OrderActions.CREATE_ORDER),
    withLatestFrom(this.store.select('order')),
    switchMap(([actionData, orderState]) => {
      return this.http.put<Order>(
        'https://landing-prototype-d2dc6.firebaseio.com/orders.json',
        orderState.orderList
      );
    })
  ); 
  
  @Effect()
  getOrders = this.actions$.pipe(
    ofType(OrderActions.GET_ORDERS),
    switchMap(() => {
      return this.http.get<Order[]>(
        'https://landing-prototype-d2dc6.firebaseio.com/orders.json'
      );
    }),
    map(orders => {
      return orders.map(order => {
        return {
          ...order
        };
      });
    }),
    map(orders => {
      return new OrderActions.setOrders(orders);
    })
  );

  @Effect({dispatch: false})
  storeOrders = this.actions$.pipe(
    ofType(OrderActions.STORE_ORDERS),
    withLatestFrom(this.store.select('order')),
    switchMap(([actionData, orderState]) => {
      return this.http.put(
        'https://landing-prototype-d2dc6.firebaseio.com/orders.json',
        orderState.orderList
      );
    })
  );

  @Effect({dispatch: false})
  createOrderSuccess = this.actions$.pipe(
    ofType(OrderActions.CREATE_ORDER),
    tap(() => {
      this.router.navigate(['/']);
    })
  )

  @Effect({dispatch: false})
  updateOrderSuccess = this.actions$.pipe(
    ofType(OrderActions.UPDATE_ORDER),
    tap(() => {
      this.router.navigate(['/order/all']);
    })
  )

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}
}
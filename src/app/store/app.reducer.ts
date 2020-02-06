import * as fromOrder   from '../orders/store/order.reducer'; 
import * as fromAuth    from '../auth/store/auth.reducer';
import * as fromProduct from '../products/store/product.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  order: fromOrder.State;
  product: fromProduct.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  order: fromOrder.orderReducer,
  product: fromProduct.productReducer,
  auth: fromAuth.authReducer
}
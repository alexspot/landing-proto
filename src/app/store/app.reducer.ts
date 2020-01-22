import * as fromOrder from '../order/store/order.reducer'; 
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  order: fromOrder.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  order: fromOrder.orderReducer,
  auth: fromAuth.authReducer
}
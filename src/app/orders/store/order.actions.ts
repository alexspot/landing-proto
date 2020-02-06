import { Action } from '@ngrx/store'
import { Order } from '../order.model';

export const CREATE_ORDER       = '[Order] Create Order';
export const UPDATE_ORDER       = '[Order] Update Order';
export const DELETE_ORDER       = '[Order] Delete Order';

export const GET_ORDERS         = '[Order] Get Orders';
export const STORE_ORDERS       = '[Order] Store Orders';
export const SET_ORDERS         = '[Order] Set Orders';

export class createOrder implements Action {
  readonly type = CREATE_ORDER;

  constructor(public payload: Order) {}
}

export class updateOrder implements Action {
  readonly type = UPDATE_ORDER;

  constructor(public payload: {index: number, order: Order}) {}
}

export class deleteOrder implements Action {
  readonly type = DELETE_ORDER;

  constructor(public payload: number) {}
}

export class getOrders implements Action {
  readonly type = GET_ORDERS
}

export class storeOrders implements Action {
  readonly type = STORE_ORDERS
}

export class setOrders implements Action {
  readonly type = SET_ORDERS

  constructor(public payload: Order[]) {}
}

export type OrderActions = 
  | createOrder
  | updateOrder 
  | deleteOrder 
  | storeOrders
  | getOrders
  | setOrders;

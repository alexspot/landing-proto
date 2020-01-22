import { Action } from '@ngrx/store'
import { Order } from '../order.model';

export const CREATE_ORDER = '[Order] Create Order';
export const UPDATE_ORDER = '[Order] Update Order';
export const DELETE_ORDER = '[Order] Delete Order';
// export const START_EDIT   = '[Order] START_EDIT';
// export const STOP_EDIT    = '[Order] STOP_EDIT';

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

// export class startEdit implements Action {
//   readonly type = START_EDIT;

//   constructor(public payload: number) {}
// }

// export class stopEdit implements Action {
//   readonly type = STOP_EDIT;
// }



export type OrderActions = 
  | createOrder
  | updateOrder 
  | deleteOrder 
  // | startEdit 
  // | stopEdit;
import { Action } from '@ngrx/store'
import { Order } from '../order.model';

export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const START_EDIT   = 'START_EDIT';
export const STOP_EDIT    = 'STOP_EDIT';

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

export class startEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class stopEdit implements Action {
  readonly type = STOP_EDIT;
}



export type OrderActions = 
  | createOrder
  | updateOrder 
  | deleteOrder 
  | startEdit 
  | stopEdit;
import { Product } from '../product.model'

import { Action } from '@ngrx/store'

export const CREATE_PRODUCT         = '[Product] Create Product'
export const UPDATE_PRODUCT         = '[Product] Update Product'
export const DELETE_PRODUCT         = '[Product] Delete Product'

export const GET_PRODUCTS           = '[Product] Get Products'
export const STORE_PRODUCTS         = '[Product] Store Products'
export const SET_PRODUCTS           = '[Product] Set Products'

export class createProduct implements Action {
  readonly type = CREATE_PRODUCT
  
  constructor(public payload: Product) {}
}

export class updateProduct implements Action {
  readonly type = UPDATE_PRODUCT

  constructor(public payload: {index: number, product: Product}) {}
}

export class deleteProduct implements Action {
  readonly type = DELETE_PRODUCT

  constructor(public payload: number) {}
}

export class getProducts implements Action {
  readonly type = GET_PRODUCTS
}

export class storeProducts implements Action {
  readonly type = STORE_PRODUCTS
}

export class setProducts implements Action {
  readonly type = SET_PRODUCTS

  constructor(public payload: Product[]) {}
}

export type ProductActions = 
  | createProduct
  | updateProduct
  | deleteProduct
  | getProducts
  | storeProducts
  | setProducts
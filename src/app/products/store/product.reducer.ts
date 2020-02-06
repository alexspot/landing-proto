import { Product } from '../product.model';
import * as ProductActions from './product.actions';

export interface State {
  productList: Product[];
}

const initialState: State = {
  productList: [
    // new Product('Product 1', 'Description 1', 15, 'http://cheb-room.ru/uploads/cheb/2016/11/w9RC4W-QqXw-200x200.jpg'),
    // new Product('Product 2', 'Description 2', 25, 'http://cheb-room.ru/uploads/cheb/2016/11/w9RC4W-QqXw-200x200.jpg')
  ]
};

export function productReducer(state: State = initialState, action: ProductActions.ProductActions) {
  switch (action.type) {

    case ProductActions.CREATE_PRODUCT:
      return {
        ...state,
        productList: [...state.productList, action.payload]
      }

    case ProductActions.UPDATE_PRODUCT:
      const product = state.productList[action.payload.index]
      const updatedProduct = {
        ...product,
        ...action.payload.product
      }
      const updatedProducts = [...state.productList]
      updatedProducts[action.payload.index] = updatedProduct

      return {
        ...state,
        productList: updatedProducts
      }

    case ProductActions.DELETE_PRODUCT:
      return {
        ...state,
        productList: state.productList.filter((prodItem, index) => {
          return index !== action.payload
        })
      }
      
    case ProductActions.SET_PRODUCTS:
      return {
        ...state,
        productList: action.payload
      }  

    default: 
      return state;  
  }


}
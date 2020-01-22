import * as OrderActions from './order.actions';
import { Order } from '../order.model'

export interface State {
  orderList: Order[]
}

const initialState: State = {
  orderList: [
    new Order('Alex', 'Petrov', '38073012345', 'Kyiv', '#33', 'New'),
    new Order('Anna', 'Maylath', '38073543211', 'Lviv', '#32', 'Pending confirmation')
  ]
};

export function orderReducer(state: State = initialState, action: OrderActions.OrderActions) {
  switch (action.type) {
    case OrderActions.CREATE_ORDER:
      return {
        ...state,
        orderList: [...state.orderList, action.payload]
      };

      case OrderActions.UPDATE_ORDER:
        const order = state.orderList[action.payload.index];
        const updatedOrder = {
          ...order,
          ...action.payload.order
        }
        const updatedOrders = [...state.orderList];
        updatedOrders[action.payload.index] = updatedOrder;

        return {
          ...state,
          orderList: updatedOrders
        };

      case OrderActions.DELETE_ORDER:
        return {
          ...state,
          orderList: state.orderList.filter((orderItem, index) => {
            return index !== action.payload;
          })
        }

      // case OrderActions.START_EDIT:
      //   return {
      //     ...state,
      //     editedOrder: {...state.orderList[action.payload],
      //     editedOrderIndex: action.payload}

      //   };

      // case OrderActions.STOP_EDIT:    
      //   return {
      //     ...state,
      //     editedOrder: null,
      //     editedOrderIndex: null

      //   };
      default: return state;
  }
}
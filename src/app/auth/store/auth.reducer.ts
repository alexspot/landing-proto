import { User } from 'src/app/models/user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
}

const initialState: State = {
  user: null,
  authError: null
}

export function authReducer(state = initialState, action: authActions.AuthActions){
  switch (action.type) {
    case authActions.LOGIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate)
      return {
        ...state,
        user: user,
        authError: null
      }
    case authActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case authActions.LOGIN_START:
      return {
        ...state,
        authError:null
      }  
    case authActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload

      }  
    default: 
      return state;
  }
}
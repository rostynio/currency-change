import * as types from '../types';
import { combineReducers } from 'redux';

const initialState = {
  currencyData:{},
  error: null
}

function getCurrency(state = initialState, action) {
  switch (action.type) {
    case types.GET_CURRENCY:
      return {
        ...state,
        currencyData: action.currencyData
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  getCurrency
});

export default rootReducer;
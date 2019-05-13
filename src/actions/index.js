import axios from 'axios';
import * as types from '../types';

export function getCurrency() {
  return (dispatch) => {
    axios.get('https://api.exchangeratesapi.io/latest')   
    .then((res) =>{
      dispatch({
        type: types.GET_CURRENCY,
        currencyData: res.data
      })
    })
    .catch((error)=> {
      dispatch({
        type: types.ERROR,
        error: error
      })
    });
  }
}

export default {
  getCurrency
}
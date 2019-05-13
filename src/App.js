import React from "react";

import Currency from "./currency/currency.controller";
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const App = (props) => {
  return (
    <div>
      <Provider store={store}>
        <Currency />
      </Provider>
    </div>
  )
}

export default App

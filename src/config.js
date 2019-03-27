import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reactotron from 'reactotron-react-native';
import { create } from 'apisauce';

import reducers from './reducers';

const tron = Reactotron
  .configure({ host: '192.168.25.123'})
  .useReactNative()
  .connect();

  tron.clear();

  console.tron = tron;

  //const createAppropriateStore = console.tron.createStore;  

  

export const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(ReduxThunk)
  )
);

export const Api = create({
  baseURL: 'https://api.openweathermap.org',
  /*headers: {
    'appid': '2eee6880a428bb2ab12c7c34871f2b35',
    
  }*/
});
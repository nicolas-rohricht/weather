import React, {Component} from 'react';
import { Provider } from 'react-redux';

import { store } from './src/config'

import Main from './src/scenes/main';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Main />
      </Provider>
    );
  }
}

export default App;
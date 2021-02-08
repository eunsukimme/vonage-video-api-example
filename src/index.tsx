import React from 'react';
import ReactDOM from 'react-dom';
import App from '@components/App';
import './index.css';
import { RootStoreContext, rootStore } from '@stores/index';

ReactDOM.render(
  <RootStoreContext.Provider value={rootStore}>
    <App />
  </RootStoreContext.Provider>,
  document.getElementById('root'),
);

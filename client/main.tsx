import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from 'client/app/redux/store';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from 'client/app/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('client/app/App', () => {
    render(App)
  });
}
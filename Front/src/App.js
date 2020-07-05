import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Header from './components/Header';
import Container from './components/Container';
import history from './history';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <Container />
        </div>
      </Router>
    </div>
  );
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

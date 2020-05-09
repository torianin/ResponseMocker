import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Dashboard from "./components/Dashboard";
import reducers from './reducers';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={Dashboard} />
            </div>
        </BrowserRouter>
    )
};

const store = createStore(reducers, applyMiddleware(thunk));

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);

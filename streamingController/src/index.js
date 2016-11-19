'use strict';

import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import { Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import appReducer from './reducers';

import App from './containers/app';

// export const rootReducer = combineReducers({
//     badm : baDmReducer,
//     app : appReducer
// });
//
// const store = createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware
//     )
// );

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// ReactDOM.render(
// <Provider store={store}>
//     <Router history={hashHistory}>
//     <Route path="/" component={App} />
//     </Router>
//     </Provider>
//     , document.getElementById('content'));

import reducers from './reducers';
ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>
    , document.getElementById('content'));

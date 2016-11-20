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

import reducers from './reducers';

import App from './containers/app';
import EncoderContainer from './containers/encoderContainer';
import AssignDecoderToEncoder from './components/AssignDecoderToEncoder';
import BrightSigns from './components/BrightSigns';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/addEncoder" component={EncoderContainer} />
            <Route path="/assignDecoderToEncoder" component={AssignDecoderToEncoder} />
            <Route path="/brightSigns" component={BrightSigns} />
        </Router>
    </Provider>
    , document.getElementById('content'));

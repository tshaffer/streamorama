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
import EncoderContainer from './containers/EncoderContainer';
import DecoderContainer from './containers/DecoderContainer';
import AssignEncoderToDecoderContainer from './containers/AssignEncoderToDecoderContainer';
import BrightSignsContainer from './containers/BrightSignsContainer';

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
            <Route path="/addDecoder" component={DecoderContainer} />
            <Route path="/assignEncoderToDecoder" component={AssignEncoderToDecoderContainer} />
            <Route path="/brightSigns" component={BrightSignsContainer} />
        </Router>
    </Provider>
    , document.getElementById('content'));

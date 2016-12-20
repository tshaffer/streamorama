'use strict';

import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory } from 'react-router';
import { Route } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './store/reducers';

import App from './containers/app';
// import EncoderContainer from './containers/EncoderContainer';
// import DecoderContainer from './containers/DecoderContainer';
// import AssignEncoderToDecoderContainer from './containers/AssignEncoderToDecoderContainer';
// import BrightSignsContainer from './containers/BrightSignsContainer';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
    )
);

// <Route path="/addEncoder" component={EncoderContainer} />
// <Route path="/setDecoder" component={DecoderContainer} />
// <Route path="/assignEncoderToDecoder" component={AssignEncoderToDecoderContainer} />
// <Route path="/brightSigns" component={BrightSignsContainer} />

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('content'));

import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LandingContainer from './landingContainer';

export default class App extends Component {

  render() {

    return (
      <MuiThemeProvider>
        <LandingContainer />
      </MuiThemeProvider>
    );
  }
}



import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Decoder from '../components/decoder';
import DecoderContainer from '../containers/decoderContainer';

export default class App extends Component {

  componentDidMount() {
    console.log("app.js::componentDidMount invoked");
  }

  render() {

    return (
      <MuiThemeProvider>
        <DecoderContainer />
      </MuiThemeProvider>
    );
  }
}


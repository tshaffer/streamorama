import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Tabs, Tab} from 'material-ui/Tabs';

import Decoders from '../components/decoders';
import Encoders from '../components/encoders';

class Landing extends Component {

  componentWillMount() {
    this.props.onLoadEncoders();
    this.props.onLoadDecoders();
  }

  render() {

    return (
      <MuiThemeProvider>

        <div>
          <Tabs>
            <Tab label="Decoders">
              <Decoders
                onSetDecoder={this.props.onSetDecoder}
                encoders={this.props.encoders}
                decoders={this.props.decoders}
              />
            </Tab>
            <Tab label="Streams">
              <Encoders
                encoders={this.props.encoders}
              />
            </Tab>
          </Tabs>
        </div>

      </MuiThemeProvider>
    );
  }
}

Landing.propTypes = {
  onSetDecoder: React.PropTypes.func.isRequired,
  onLoadEncoders: React.PropTypes.func.isRequired,
  onLoadDecoders: React.PropTypes.func.isRequired,
  encoders: React.PropTypes.object.isRequired,
  decoders: React.PropTypes.object.isRequired,
};

export default Landing;

import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Tabs, Tab} from 'material-ui/Tabs';

import Decoders from '../components/decoders';
import Streams from '../components/streams';

class Landing extends Component {

  componentWillMount() {
    this.props.onLoadStreams();
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
                streams={this.props.streams}
                decoders={this.props.decoders}
              />
            </Tab>
            <Tab label="Streams">
              <Streams
                streams={this.props.streams}
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
  onLoadStreams: React.PropTypes.func.isRequired,
  onLoadDecoders: React.PropTypes.func.isRequired,
  streams: React.PropTypes.object.isRequired,
  decoders: React.PropTypes.object.isRequired,
};

export default Landing;

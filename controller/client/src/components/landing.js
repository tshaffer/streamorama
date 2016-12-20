import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Tabs, Tab} from 'material-ui/Tabs';

import Decoders from '../components/decoders';

class Landing extends Component {

  render() {

    return (
      <MuiThemeProvider>

        <div>
          <Tabs>
            <Tab label="Decoders">
              <Decoders
                {...this.props}
              />
            </Tab>
            <Tab label="Encoders">
              Encoders
            </Tab>
          </Tabs>
        </div>

      </MuiThemeProvider>
    );
  }
}

Landing.propTypes = {
  onLoadEncoders: React.PropTypes.func.isRequired,
  onLoadDecoders: React.PropTypes.func.isRequired,
  encoders: React.PropTypes.object.isRequired,
  decoders: React.PropTypes.object.isRequired,
};

export default Landing;

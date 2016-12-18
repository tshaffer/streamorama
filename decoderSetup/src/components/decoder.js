import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';


export default class Decoder extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      decoderEnabled: true,
      serialNumber: "TBD",
      latency: 0,
      encoderValue: ''
    };
  }

  componentWillMount() {
    console.log("Decoder::componentWillMount");
  }

  handleConnectToServer() {

    let self = this;

    let serverUrl = this.serverUrlField.input.value;
    // serverUrl = "http://10.1.0.180:8080";
    serverUrl = "http://192.168.0.105:8080";

    axios.get(serverUrl + '/getEncoders', {})
      .then( (response) => {
        console.log(response);
        const encoders = response.data;

        for (let serialNumber in encoders) {
          if (encoders.hasOwnProperty(serialNumber)) {
            const encoder = encoders[serialNumber];
            self.props.onAddEncoder(encoder);
            this.setState( { encoderValue: encoder.serialNumber });

          }
        }
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  handleEncoderChange(_, __, serialNumber) {
    this.setState( { encoderValue: serialNumber });
  }

  buildEncoderRow(encoder) {

    // <MenuItem value={'hdmi'} primaryText="HDMI"/>
    // <MenuItem value={'display'} primaryText="Display"/>

    const serialNumber = encoder.serialNumber;
    const primaryText = encoder.name;

    return (
      <MenuItem
        value={serialNumber}
        primaryText={primaryText}
        key={serialNumber}
      />
    );
  }

  getEncodersJSX() {

    let self = this;

    let encoder = null;

    const encoders = [];
    for (let serialNumber in this.props.encoders.encodersBySerialNumber) {
      if (this.props.encoders.encodersBySerialNumber.hasOwnProperty(serialNumber)) {
        encoder = this.props.encoders.encodersBySerialNumber[serialNumber];
        encoders.push(encoder);
      }
    }

    let encoderRows = encoders.map(function(encoder) {
      const encoderRow = self.buildEncoderRow(encoder);
      return encoderRow;
    });

    return encoderRows;
  }

  render() {

    let self = this;

    const style = {
      marginLeft: '2px',
      marginTop: '16px',
      fontSize: '24px',
      checkbox: {
        marginBottom: 16,
      }
    };

    let encoders;
    if (this.props.encoders.length === 0) {
      encoders = <noscript/>;
    }
    else {
      encoders = this.getEncodersJSX();
    }

    return (
      <MuiThemeProvider>
        <div>
          <h1>BrightSign Decoder Setup</h1>
          <div>
            <Checkbox
              ref={(c) => {
                self.enableDecodingCB = c;
              }}
              label="Enable Decoding"
              onCheck={(_, isInputChecked) => {
                this.setState({decoderEnabled : isInputChecked});
              }}
              style={style.checkbox}
              defaultChecked={true}
            />
          </div>
          <div id="serverUrl">
            <TextField
              ref={(c) => {
                self.serverUrlField = c;
              }}
              defaultValue={"http://192.168.0.105:8080"}
              floatingLabelText="Server Url"
              floatingLabelFixed={true}
              disabled={!this.state.decoderEnabled}
            />
            <RaisedButton
              onClick={this.handleConnectToServer.bind(this)}
              label="Connect"
              style={style}
            />
          </div>
          <div>
            <SelectField
              floatingLabelText="Encoders"
              value={this.state.encoderValue}
              onChange={this.handleEncoderChange.bind(this)}
              disabled={!this.state.decoderEnabled}
            >
              {encoders}
            </SelectField>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Decoder.propTypes = {
  onAddEncoder: React.PropTypes.func.isRequired,
  encoders: React.PropTypes.object.isRequired
};


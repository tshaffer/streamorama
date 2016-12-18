import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';


export default class Decoder extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      decoderEnabled: true,
      serialNumber: "TBD",
      latency: 0,
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
          }
        }
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  handleEncoderChange(_, __, encoderValue) {
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

    let encoders = <noscript/>;

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
  onAddEncoder: React.PropTypes.func.isRequired
};


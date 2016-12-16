import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

class Encoder extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      encoderEnabled: true,
      serialNumber: "TBD",
      sourceValue: 'display',
      protocolValue: 0,
      videoCodecValue: 0,
      videoFormatValue: '1080p60',
      videoFormatEnabled: true,
      destinationAddress: "239.0.153.200",
      bitrateValue: 2,
      maxBitrateValue: 8,   // TODO: find out what this should really be set to
      port: "1234"
    };
  }

  componentWillMount() {
    axios.get('/GetSystemInfo', {})
      .then( (response) => {
        console.log(response);
        const serialNumber = response.data.deviceuniqueid$;
        this.setState({serialNumber: serialNumber});
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  handleAddEncoder() {

    console.log('handleAddEncoder');

    let encoder = {};

    encoder.enabled = this.state.encoderEnabled;

    if (encoder.enabled) {

      encoder.serverUrl = this.serverUrlField.input.value;
      encoder.name = this.nameField.input.value;
      encoder.serialNumber = this.state.serialNumber;

      if (this.state.sourceValue === 'hdmi') {
        encoder.source = "HDMI";
        encoder.mode = "2";
      }
      else {
        encoder.source = "Display";
        encoder.mode = "1";
      }

      if (this.state.protocolValue === 0) {
        encoder.protocol = 'UDP';
      }
      else {
        encoder.protocol = 'RTP';
      }

      encoder.ttl = this.ttlField.input.value;

      encoder.destinationAddress = this.destinationAddressField.input.value;

      encoder.port = this.portField.input.value;

      encoder.videoCodec = 'H264';

      switch (this.state.videoFormatValue) {
        case '720p30':
          encoder.videoFormat = '720p30';
          break;
        case '1080i60':
          encoder.videoFormat = '1080i60';
          break;
        default:
          encoder.videoFormat = '1080p60';
          break;
      }

      encoder.bitRate = (this.bitrateField.state.value * 1000).toString();
      encoder.maxBitRate = (this.state.maxBitrateValue * 1000).toString();

      // build pipeline and stream strings
      let str = encoder.source + ":mode=" + encoder.mode + ", ";
      str = str + "encoder:vformat=" + encoder.videoFormat + "&vbitrate=" + encoder.bitRate;
      str = str + ", " + encoder.protocol.toLowerCase() + "://";
      str = str + encoder.destinationAddress + ":" + encoder.port + "/?ttl=" + encoder.ttl;
      str = str + "&maxbitrate=" + encoder.maxBitRate;
      encoder.pipeline = str;
      encoder.stream = encoder.protocol.toLowerCase() + "://" + encoder.destinationAddress + ":" + encoder.port + "/";
    }

    axios.get('/SetupEncoder', {
      params: {
        encoderParams: encoder
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://10.1.0.180:8080/setEncoderParams', {
      params: {
        encoderParams: encoder
      }
    })
      .then( (response) => {
        console.log(response);
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  // _ === event - to satisfy eslint rules
  handleSourceChange(_, __, sourceValue) {
    this.setState({sourceValue});
    this.setState({videoFormatEnabled: sourceValue === 'hdmi'});

  }

  handleStreamTypeChange(_, __, streamTypeValue) {
    this.setState({streamTypeValue});
  }

  handleProtocolChange(_, __, protocolValue) {
    this.setState({protocolValue});
  }

  handleVideoCodecChange(_, __, videoCodecValue) {
    this.setState({videoCodecValue});
  }

  handleVideoFormatChange(_, __, videoFormatValue) {
    this.setState({videoFormatValue});
  }

  handleMaxBitrateChange(_, maxBitrateValue) {
    this.setState({maxBitrateValue});
  }

  handleBitrateChange(_, bitrateValue) {
    this.setState({bitrateValue});
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

    return (

      <MuiThemeProvider>

        <div>
          <h1>BrightSign Encoder Setup</h1>
          <div>
            <Checkbox
              ref={(c) => {
                self.enableEncodingCB = c;
              }}
              label="Enable Encoding"
              onCheck={(_, isInputChecked) => {
                this.setState({encoderEnabled : isInputChecked});
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
              defaultValue=""
              floatingLabelText="Server Url"
              floatingLabelFixed={true}
              disabled={!this.state.encoderEnabled}
            />
          </div>
          <div id="encoderStreamOptions">
            <div>
              <TextField
                ref={(c) => {
                  self.nameField = c;
                }}
                defaultValue=""
                floatingLabelText="Name"
                floatingLabelFixed={true}
                disabled={!this.state.encoderEnabled}
              />
            </div>
            <div>
              <SelectField
                floatingLabelText="Source"
                value={this.state.sourceValue}
                onChange={this.handleSourceChange.bind(this)}
                disabled={!this.state.encoderEnabled}
              >
                <MenuItem value={'hdmi'} primaryText="HDMI"/>
                <MenuItem value={'display'} primaryText="Display"/>
              </SelectField>
            </div>
            <div>
              <SelectField
                floatingLabelText="Protocol"
                value={this.state.protocolValue}
                onChange={this.handleProtocolChange.bind(this)}
                disabled={!this.state.encoderEnabled}
              >
                <MenuItem value={0} primaryText="UDP"/>
                <MenuItem value={1} primaryText="RTP"/>
              </SelectField>
              <TextField
                ref={(c) => {
                  self.ttlField = c;
                }}
                defaultValue="1"
                floatingLabelText="TTL"
                floatingLabelFixed={true}
                disabled={!this.state.encoderEnabled}
              />
            </div>
            <div>
              <TextField
                ref={(c) => {
                  self.destinationAddressField = c;
                }}
                defaultValue="239.0.153.200"
                floatingLabelText="Destination Address"
                floatingLabelFixed={true}
                disabled={!this.state.encoderEnabled}
              />
              <TextField
                ref={(c) => {
                  self.portField = c;
                }}
                defaultValue="1234"
                floatingLabelText="Port"
                floatingLabelFixed={true}
                disabled={!this.state.encoderEnabled}
              />

            </div>
            <div>
              <RaisedButton
                onClick={this.handleAddEncoder.bind(this)}
                label="Set Encoder Parameters"
                style={style}
              />
            </div>
          </div>
          <div id="encoderEncodingOptions">
            <TextField
              ref={(c) => {
                self.serialNumberField = c;
              }}
              value={this.state.serialNumber}
              floatingLabelText="Serial Number"
              floatingLabelFixed={true}
              readOnly={true}
            />
            <div>
              <SelectField
                floatingLabelText="Video Codec"
                value={this.state.videoCodecValue}
                onChange={this.handleVideoCodecChange.bind(this)}
                disabled={!this.state.encoderEnabled}
              >
                <MenuItem value={0} primaryText="H264"/>
              </SelectField>
            </div>
            <div>
              <SelectField
                floatingLabelText="Video Format"
                value={this.state.videoFormatValue}
                onChange={this.handleVideoFormatChange.bind(this)}
                disabled={this.state.sourceValue === 'display' || !this.state.encoderEnabled}
              >
                <MenuItem value={'720p30'} primaryText="720p30"/>
                <MenuItem value={'1080i60'} primaryText="1080i60"/>
                <MenuItem value={'1080p60'} primaryText="1080p60"/>
              </SelectField>
            </div>
            <div>
              <p>
                <span>
                  Bitrate:
                </span>
                <span>
                  {this.state.bitrateValue.toFixed(1)}
                </span>
                <span>
                  Mb/s
                </span>
              </p>
              <Slider
                ref={(c) => {
                  self.bitrateField = c;
                }}
                defaultValue={2.0}
                min={1.0}
                max={40.0}
                onChange={this.handleBitrateChange.bind(this)}
                disabled={!this.state.encoderEnabled}
              />
            </div>
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}

// Encoder.propTypes = {
//   addEncoder: React.PropTypes.func.isRequired
// };

export default Encoder;

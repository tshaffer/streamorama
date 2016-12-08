import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

class Encoder extends Component {

  constructor(props) {
    super(props);
    this.state =
    {
      sourceValue: 0,
      protocolValue: 0,
      videoCodecValue: 0,
      videoFormatValue: 0,
      destinationAddress: "239.0.153.200",
      bitrateValue: 2,
      maxBitrateValue: 20,
    };
  }

  // maxBitrateValue: 80,

  handleAddEncoder() {
    console.log('handleAddEncoder');

    let encoder = {};

    if (this.state.sourceValue === 0) {
      encoder.source = "HDMI";
    }
    else {
      encoder.source = "Display";
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
      case 0:
        encoder.videoFormat = '720p30';
        break;
      case 1:
        encoder.videoFormat = '1080i60';
        break;
      default:
        encoder.videoFormat = '1080p60';
        break;
    }

    encoder.bitRate = (this.bitrateField.state.value * 1000).toString();
    encoder.maxBitRate = (this.state.maxBitrateValue * 1000).toString();

    // build pipeline and stream strings

    let str = "hdmi:, ";
    str = str + "encoder:vformat=" + encoder.videoFormat + "&vbitrate=" + encoder.bitRate;
    str = str + ", " + encoder.protocol.toLowerCase() + "://";
    str = str + encoder.destinationAddress + ":" + encoder.port + "/?ttl=" + encoder.ttl;
    str = str + "&maxbitrate=" + encoder.maxBitrate;
    encoder.pipeline = str;

    encoder.stream = encoder.protocol.toLowerCase() + "://" + encoder.destinationAddress + ":" + encoder.port + "/";

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
  }

  // _ === event - to satisfy eslint rules
  handleSourceChange(_, index, sourceValue) {
    this.setState({sourceValue});
  }

  handleStreamTypeChange(_, index, streamTypeValue) {
    this.setState({streamTypeValue});
  }

  handleProtocolChange(_, index, protocolValue) {
    this.setState({protocolValue});
  }

  handleVideoCodecChange(_, index, videoCodecValue) {
    this.setState({videoCodecValue});
  }

  handleVideoFormatChange(_, index, videoFormatValue) {
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
      fontSize: '24px'
    };

    return (

      <MuiThemeProvider>

        <div>
          <h1>BrightSign Encoder Setup</h1>
          <div id="encoderStreamOptions">
            <div>
              <SelectField
                floatingLabelText="Source"
                value={this.state.sourceValue}
                onChange={this.handleSourceChange.bind(this)}
              >
                <MenuItem value={0} primaryText="HDMI"/>
                <MenuItem value={1} primaryText="Display"/>
              </SelectField>
            </div>
            <div>
              <SelectField
                floatingLabelText="Protocol"
                value={this.state.protocolValue}
                onChange={this.handleProtocolChange.bind(this)}
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
              />
              <TextField
                ref={(c) => {
                  self.portField = c;
                }}
                defaultValue="1234"
                floatingLabelText="Port"
                floatingLabelFixed={true}
              />

            </div>
            <div>
              <RaisedButton
                onClick={this.handleAddEncoder.bind(this)}
                label="Setup Device"
                style={style}
              />
            </div>
          </div>
          <div id="encoderEncodingOptions">
            <div>
              <SelectField
                floatingLabelText="Video Codec"
                value={this.state.videoCodecValue}
                onChange={this.handleVideoCodecChange.bind(this)}
              >
                <MenuItem value={0} primaryText="H264"/>
              </SelectField>
            </div>
            <div>
              <SelectField
                floatingLabelText="Video Format"
                value={this.state.videoFormatValue}
                onChange={this.handleVideoFormatChange.bind(this)}
              >
                <MenuItem value={0} primaryText="720p30"/>
                <MenuItem value={1} primaryText="1080i60"/>
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

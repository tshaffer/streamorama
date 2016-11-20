import React, { Component } from 'react';
import { Link } from 'react-router';

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
            streamTypeValue: 1,
            protocolValue: 0,
            videoCodecValue: 0,
            videoFormatValue: 0,
            maxBitrateValue: 2,
            destinationAddress: "239.194.0.2",
            bitrateValue: 2
        };
    }

    handleAddEncoder(event) {
        console.log('handleStartStreaming');

        let encoder = {};

        if (this.state.sourceValue === 0) {
            encoder.source = "HDMI";
        }
        else {
            encoder.source = "File";
        }

        if (this.state.streamTypeValue == 0) {
            encoder.streamType = "Unicast";
        }
        else {
            encoder.streamType = 'Multicast';
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

        encoder.maxBitrate = this.maxBitrateField.state.value.toFixed(1);

        encoder.fileName = '';

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

        encoder.bitRate = this.bitrateField.state.value.toFixed(1);

        encoder.serialNumber = this.serialNumberField.input.value;

        this.props.addEncoder(encoder);
    }

    handleSourceChange(event, index, sourceValue) {
        this.setState({sourceValue});
    }

    handleStreamTypeChange(event, index, streamTypeValue) {
        this.setState({streamTypeValue});
    }

    handleProtocolChange(event, index, protocolValue) {
        this.setState({protocolValue});
    }

    handleVideoCodecChange(event, index, videoCodecValue) {
        this.setState({videoCodecValue});
    }

    handleVideoFormatChange(event, index, videoFormatValue) {
        this.setState({videoFormatValue});
    }

    handleMaxBitrateChange(event, maxBitrateValue) {
        this.setState({maxBitrateValue});
    }

    handleBitrateChange(event, bitrateValue) {
        this.setState({bitrateValue});
    }

    render() {

        let self = this;

        const style = {
            margin: 12,
        };

        // <div>
        //     <RaisedButton
        //         onClick={this.handleStartStreaming.bind(this)}
        //         label="Start"
        //         style={style}
        //     />
        //     <RaisedButton label="Stop" style={style} />
        // </div>

        return (

            <MuiThemeProvider>

                <div>
                    <Link to="/">Back</Link>
                    <br/>
                    <div id="encoderStreamOptions">
                        <div>
                            <TextField
                                ref={(c) => {
                                    self.nameField = c;
                                }}
                                defaultValue=""
                                floatingLabelText="Name"
                                floatingLabelFixed={true}
                            />
                        </div>
                        <div>
                            <SelectField
                                floatingLabelText="Source"
                                value={this.state.sourceValue}
                                onChange={this.handleSourceChange.bind(this)}
                            >
                                <MenuItem value={0} primaryText="HDMI"/>
                                <MenuItem value={1} primaryText="File"/>
                            </SelectField>
                        </div>
                        <p
                            className="sectionHeader">
                            Stream Options
                        </p>
                        <div>
                            <SelectField
                                floatingLabelText="Stream Type"
                                value={this.state.streamTypeValue}
                                onChange={this.handleStreamTypeChange.bind(this)}
                            >
                                <MenuItem value={0} primaryText="Unicast"/>
                                <MenuItem value={1} primaryText="Multicast"/>
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
                                defaultValue="239.194.0.2"
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
                            <p>
                                <span>
                                    Maximum Bitrate:
                                </span>
                                <span>
                                    {this.state.maxBitrateValue.toFixed(1)}
                                </span>
                                <span>
                                    Mb/s
                                </span>
                            </p>
                            <Slider
                                ref={(c) => {
                                    self.maxBitrateField = c;
                                }}
                                defaultValue={6.0}
                                min={1.0}
                                max={40.0}
                                onChange={this.handleMaxBitrateChange.bind(this)}
                            />
                        </div>
                        <div>
                            <RaisedButton
                                onClick={this.handleAddEncoder.bind(this)}
                                label="Add Encoder"
                                style={style}
                            />
                        </div>
                    </div>
                    <div id="encoderEncodingOptions">
                        <div>
                            <TextField
                                ref={(c) => {
                                    self.serialNumberField = c;
                                }}
                                defaultValue=""
                                floatingLabelText="Serial Number"
                                floatingLabelFixed={true}
                            />
                        </div>
                        <div>
                            <TextField
                                defaultValue=""
                                floatingLabelText="File Name"
                                floatingLabelFixed={true}
                            />
                        </div>
                        <p
                            className="sectionHeader">
                            Encoding Options
                        </p>
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

Encoder.propTypes = {
    addEncoder: React.PropTypes.func.isRequired
};

export default Encoder;

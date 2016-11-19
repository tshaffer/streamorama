import React from 'react';
import {Component} from 'react';

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
            destinationAddress: "239.194.0.2"
        };
    }

    handleStartStreaming(event) {
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

        encoder.ttl = '';

        encoder.destinationAddress = this.state.destinationAddress;

        encoder.maxBitrate = this.state.maxBitrateValue.toFixed(1);

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

        encoder.bitRate = 69;

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

    handleDestinationAddressChange(event, destinationAddress) {
        this.setState({destinationAddress});
    }

    render() {

        const style = {
            margin: 12,
        };

        return (
            <div>
                <div id="encoderStreamOptions">
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
                            defaultValue="1"
                            floatingLabelText="TTL"
                            floatingLabelFixed={true}
                        />
                    </div>
                    <div>
                        <TextField
                            defaultValue="239.194.0.2"
                            floatingLabelText="Destination Address"
                            floatingLabelFixed={true}
                            onChange={this.handleDestinationAddressChange.bind(this)}
                        />
                        <TextField
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
                            defaultValue={6.0}
                            min={1.0}
                            max={40.0}
                            onChange={this.handleMaxBitrateChange.bind(this)}

                        />
                    </div>
                </div>
                <div id="encoderEncodingOptions">
                    <div>
                        <TextField
                            defaultValue=""
                            floatingLabelText="File Name"
                            floatingLabelFixed={true}
                        />
                    </div>
                    <div>
                        <RaisedButton
                            onClick={this.handleStartStreaming.bind(this)}
                            label="Start"
                            style={style}
                        />
                        <RaisedButton label="Stop" style={style} />
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
                                2
                            </span>
                            <span>
                                Mb/s
                            </span>
                        </p>
                        <Slider
                            defaultValue={2.0}
                            min={1.0}
                            max={40.0}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Encoder.propTypes = {
    addEncoder: React.PropTypes.func.isRequired
};

export default Encoder;

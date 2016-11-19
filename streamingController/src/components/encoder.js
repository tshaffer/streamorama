import React from 'react';
import { Component } from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Encoder extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            sourceValue: 0,
            streamTypeValue: 1
        };
    }

    // <RaisedButton label="Default" />

    handleSourceChange(event, index, sourceValue) {
        this.setState({sourceValue});
    }

    handleStreamTypeChange(event, index, streamTypeValue) {
        this.setState({streamTypeValue});
    }

// <p>Source</p>

    render() {

        return (
            <div>
                <div id="encoderStreamOptions">
                    <div>
                        <SelectField
                            floatingLabelText="Source"
                            value={this.state.sourceValue}
                            onChange={this.handleSourceChange.bind(this)}
                        >
                            <MenuItem value={0} primaryText="HDMI" />
                            <MenuItem value={1} primaryText="File" />
                        </SelectField>
                    </div>
                    <p>
                        Stream Options
                    </p>
                    <div>
                        <SelectField
                            floatingLabelText="Stream Type"
                            value={this.state.streamTypeValue}
                            onChange={this.handleStreamTypeChange.bind(this)}
                        >
                            <MenuItem value={0} primaryText="Unicast" />
                            <MenuItem value={1} primaryText="Multicast" />
                        </SelectField>
                    </div>
                </div>
                <div id="encoderEncoderOptions">
                    <p>
                        Encoding Options
                    </p>
                </div>
            </div>
        );
    }
}

export default Encoder;

import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

class Landing extends Component {

    handleAddEncoder() {
        hashHistory.push('/addEncoder');
    }

    handleAssignDecoderToEncoder() {
        hashHistory.push('/assignDecoderToEncoder');
    }

    handleBrightSigns() {
        hashHistory.push('/brightSigns');
    }

    render() {

        let self = this;

        const style = {
            margin: 12,
        };

        return (
            <div>
                <RaisedButton
                    onClick={this.handleAddEncoder.bind(this)}
                    label="Add Encoder"
                    style={style}
                />

                <RaisedButton
                    onClick={this.handleAssignDecoderToEncoder.bind(this)}
                    label="Assign Decoder to Encoder"
                    style={style}
                />

                <RaisedButton
                    onClick={this.handleBrightSigns.bind(this)}
                    label="BrightSigns"
                    style={style}
                />
            </div>
        );
    }
}

export default Landing;

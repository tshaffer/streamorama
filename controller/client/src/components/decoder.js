import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class Decoder extends Component {

    handleSetDecoder(event) {
        console.log('handleSetDecoder');

        let decoder = {};

        decoder.name = this.nameField.input.value;
        decoder.serialNumber = this.serialNumberField.input.value;
        decoder.assignedEncoder = "";

        this.props.setDecoder(decoder);
    }

    render() {

        let self = this;

        const style = {
            margin: 12,
        };

        return (

            <MuiThemeProvider>

                <div>
                    <Link to="/">Back</Link>
                    <br/>
                    <div>
                        <p
                            className="sectionHeader">
                            Decoder
                        </p>
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
                            <RaisedButton
                                onClick={this.handleSetDecoder.bind(this)}
                                label="Add Decoder"
                                style={style}
                            />
                        </div>
                    </div>
                </div>

            </MuiThemeProvider>
        );
    }
}

Decoder.propTypes = {
    setDecoder: React.PropTypes.func.isRequired
};

export default Decoder;

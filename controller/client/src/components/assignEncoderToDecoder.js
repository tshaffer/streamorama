import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class AssignEncoderToDecoder extends Component {

    constructor(props) {
        super(props);

        // values in encoderIndicesByDecoderRow refer to index into this.props.encoders (for each decoder)
        this.state = {
            encoderIndicesByDecoderRow: [0, 0, 0]
        };
    }

    handleAssignEncoderToDecoder(decoder, encoder) {
        console.log("assignEncoderToDecoder:");
        console.log("assign encoder: ");
        console.log(encoder);
        console.log("to decoder: ");
        console.log(decoder);

        decoder.assignedEncoder = encoder;

        this.props.setDecoder(decoder);
    }

    handleEncoderChange(decoder, decoderIndex, event, index, encoderIndex) {
        const encoderIndicesByDecoderRow = this.state.encoderIndicesByDecoderRow;
        encoderIndicesByDecoderRow[decoderIndex] = encoderIndex;
        this.setState( { encoderIndicesByDecoderRow });
    }

    getEncoderByIndex(encoderIndex) {

        const encodersBySerialNumber = this.props.encoders.encodersBySerialNumber;

        let index = 0;

        for (let serialNumber in encodersBySerialNumber) {
            if (encodersBySerialNumber.hasOwnProperty(serialNumber)) {
                const encoder = encodersBySerialNumber[serialNumber];
                if (encoderIndex == index ) {
                    return encoder;
                }
                index++;
            }
        }
    }

    buildRow(decoder, decoderIndex, encoderOptions) {

        let self = this;

        return (
            <TableRow key={decoder.serialNumber}>
                <TableRowColumn>
                    {decoder.name}
                </TableRowColumn>
                <TableRowColumn>
                    <SelectField
                        value={this.state.encoderIndicesByDecoderRow[decoderIndex]}
                        onChange={(event, encoderRowIndex, encoderIndex) => {
                            self.handleEncoderChange(decoder, decoderIndex, event, encoderRowIndex, encoderIndex);
                        }}
                    >
                        {encoderOptions}
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={() => {
                            const encoderIndex = self.state.encoderIndicesByDecoderRow[decoderIndex];
                            const encoder = self.getEncoderByIndex(encoderIndex);
                            self.handleAssignEncoderToDecoder(decoder, encoder);
                        }}
                        label="Assign"
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    buildRows(encoderOptions) {

        const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;

        let rows = [];
        let decoderIndex = 0;

        for (let serialNumber in decodersBySerialNumber) {
            if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
                const decoder = decodersBySerialNumber[serialNumber];
                rows.push(this.buildRow(decoder, decoderIndex, encoderOptions));
                decoderIndex++;
            }
        }

        return rows;
    }


    buildEncoderOption(index, encoder) {

        return (
            <MenuItem key={index} value={index} primaryText={encoder.name}/>
        );
    }

    buildEncoderOptions() {

        const encodersBySerialNumber = this.props.encoders.encodersBySerialNumber;

        let encoderIndex = 0;
        let encoderOptions = [];

        for (let serialNumber in encodersBySerialNumber) {
            if (encodersBySerialNumber.hasOwnProperty(serialNumber)) {
                const encoder = encodersBySerialNumber[serialNumber];
                encoderOptions.push(this.buildEncoderOption(encoderIndex, encoder));
                encoderIndex++;
            }
        }

        return encoderOptions;
    }


    render() {

        let encoderOptions = this.buildEncoderOptions();
        let rows = this.buildRows(encoderOptions);

        return (

            <MuiThemeProvider>

                <div>
                    <Link to="/">Back</Link>
                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>Decoder Name</TableHeaderColumn>
                                <TableHeaderColumn>Encoders</TableHeaderColumn>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                        >
                            {rows}
                        </TableBody>
                    </Table>
                </div>

            </MuiThemeProvider>
        );
    }
}

AssignEncoderToDecoder.propTypes = {
    encoders: React.PropTypes.object.isRequired,
    decoders: React.PropTypes.object.isRequired,
    setDecoder: React.PropTypes.func.isRequired
};


export default AssignEncoderToDecoder;
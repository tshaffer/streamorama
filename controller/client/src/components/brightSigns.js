import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class BrightSigns extends Component {

    handleEditEncoder(encoder) {
        console.log('handleEditEncoder');
        console.log(encoder);
    }

    handleStartEncoder(encoder) {
        console.log('handleStartEncoder');
        console.log(encoder);
        this.props.startEncoder(encoder);
    }

    handleStopEncoder(encoder) {
        console.log('handleStopEncoder');
        console.log(encoder);
        this.props.stopEncoder(encoder);
    }

    handleEditDecoder(decoder) {
        console.log('handleEditDecoder');
        console.log(decoder);
    }

    buildEncoderRow(encoder) {

        const style = {
            // margin: 12,
            margin: 0,
        };
        
        return (
            <TableRow key={encoder.serialNumber}>
                <TableRowColumn>
                    {encoder.name}
                </TableRowColumn>
                <TableRowColumn>
                    {encoder.source}
                </TableRowColumn>
                <TableRowColumn>
                    {encoder.protocol}
                </TableRowColumn>
                <TableRowColumn>
                    {encoder.destinationAddress}
                </TableRowColumn>
                <TableRowColumn>
                    {encoder.port}
                </TableRowColumn>
                <TableRowColumn>
                    {encoder.videoFormat}
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={() => this.handleEditEncoder(encoder)}
                        label="Edit"
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={() => this.handleStartEncoder(encoder)}
                        label="Start"
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={() => this.handleStopEncoder(encoder)}
                        label="Stop"
                        style={style}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    buildEncoderRows() {

        const encodersBySerialNumber = this.props.encoders.encodersBySerialNumber;

        let encoderRows = [];

        for (let serialNumber in encodersBySerialNumber) {
            if (encodersBySerialNumber.hasOwnProperty(serialNumber)) {
                const encoder = encodersBySerialNumber[serialNumber];
                encoderRows.push(this.buildEncoderRow(encoder));
            }
        }

        return encoderRows;
    }

    buildDecoderRow(decoder) {

        const style = {
            // margin: 12,
            margin: 0,
        };

        return (
            <TableRow key={decoder.serialNumber}>
                <TableRowColumn>
                    {decoder.name}
                </TableRowColumn>
                <TableRowColumn>
                    {decoder.serialNumber}
                </TableRowColumn>
                <TableRowColumn>
                    {decoder.assignedEncoder === "" ? "None" : decoder.assignedEncoder}
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={() => this.handleEditDecoder(decoder)}
                        label="Edit"
                        style={style}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    buildDecoderRows() {

        const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;

        let decoderRows = [];

        for (let serialNumber in decodersBySerialNumber) {
            if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
                const decoder = decodersBySerialNumber[serialNumber];
                decoderRows.push(this.buildDecoderRow(decoder));
            }
        }

        return decoderRows;
    }


    render() {

        const encoderRows = this.buildEncoderRows();
        const decoderRows = this.buildDecoderRows();

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
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Source</TableHeaderColumn>
                                <TableHeaderColumn>Protocol</TableHeaderColumn>
                                <TableHeaderColumn>Address</TableHeaderColumn>
                                <TableHeaderColumn>Port</TableHeaderColumn>
                                <TableHeaderColumn>Format</TableHeaderColumn>
                                <TableHeaderColumn/>
                                <TableHeaderColumn/>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                        >
                            {encoderRows}
                        </TableBody>
                    </Table>

                    <Table>
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                        >
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Serial Number</TableHeaderColumn>
                                <TableHeaderColumn>Assigned Encoder</TableHeaderColumn>
                                <TableHeaderColumn/>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                        >
                            {decoderRows}
                        </TableBody>
                    </Table>
                </div>

            </MuiThemeProvider>
        );
    }
}

BrightSigns.propTypes = {
    encoders: React.PropTypes.object.isRequired,
    decoders: React.PropTypes.object.isRequired,
    startEncoder: React.PropTypes.func.isRequired,
    stopEncoder: React.PropTypes.func.isRequired
};

export default BrightSigns;

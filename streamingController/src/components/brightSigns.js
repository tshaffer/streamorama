import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BrightSigns extends Component {

    buildEncoderRow(encoder) {

        return (
            <TableRow>
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

    render() {

        const encoderRows = this.buildEncoderRows();

        return (

            <MuiThemeProvider>

                <div>
                    <Link to="/">Back</Link>
                    <Table
                    >
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
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                        >
                            {encoderRows}
                        </TableBody>
                    </Table>
                </div>

            </MuiThemeProvider>
        );
    }
}

BrightSigns.propTypes = {
    encoders: React.PropTypes.object.isRequired
};

export default BrightSigns;
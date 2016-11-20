import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BrightSigns extends Component {

    buildEncoderRow(encoder) {

        return (
            <TableRow>
                <TableRowColumn>
                    HDMI
                </TableRowColumn>
                <TableRowColumn>
                    239.194.0.2
                </TableRowColumn>
                <TableRowColumn>
                    720p30
                </TableRowColumn>
            </TableRow>
        );
    }

    buildEncoderRows() {
        // let encoderRows = this.props.encoders.map(function (encoder, index) {
        //     return this.buildEncoderRow(encoder);
        // });

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

// {/*<TableRow>*/}
// {/*<TableRowColumn>*/}
// {/*HDMI*/}
// {/*</TableRowColumn>*/}
// {/*<TableRowColumn>*/}
// {/*239.194.0.2*/}
// </TableRowColumn>
// <TableRowColumn>
// 720p30
// </TableRowColumn>
// </TableRow>
// <TableRow>
// <TableRowColumn>
//     HDMI
//     </TableRowColumn>
// <TableRowColumn>
//     239.194.0.3
// </TableRowColumn>
// <TableRowColumn>
//     1080i60
// </TableRowColumn>
// </TableRow>

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
                                <TableHeaderColumn>Source</TableHeaderColumn>
                                <TableHeaderColumn>Address</TableHeaderColumn>
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
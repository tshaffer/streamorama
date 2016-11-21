import React, { Component } from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

class BrightSigns extends Component {

    handleEditDecoder(decoder) {
        console.log('handleEditDecoder');
        console.log(decoder);
    }

    buildDecoderRow(decoder) {

        console.log("buildDecoderRow");
        console.log(decoder);

        const style = {
            // margin: 12,
            margin: 0,
        };

        return (
            <div>
                <TableRow key={decoder.serialNumber.toString()}>
                    <TableRowColumn>
                        {decoder.name}
                    </TableRowColumn>
                    <TableRowColumn>
                        {decoder.serialNumber}
                    </TableRowColumn>
                    <TableRowColumn>
                        <RaisedButton
                            onClick={() => this.handleEditDecoder(decoder)}
                            label="Edit"
                            style={style}
                        />
                    </TableRowColumn>
                </TableRow>
            </div>
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
                                <TableHeaderColumn>Serial Number</TableHeaderColumn>
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
    decoders: React.PropTypes.object.isRequired,
};

export default BrightSigns;

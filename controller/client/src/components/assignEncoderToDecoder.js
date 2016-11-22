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
        this.state = {
            decoderIndex: 0
        };
    }

    handleAssignEncoderToDecoder(decoder) {
        console.log("assignEncoderToDecoder:");
        console.log("decoder: ");
        console.log(decoder);
    }

    handleDecoderChange(event, index, decoderIndex) {
        this.setState({decoderIndex});
    }

    buildRow(decoder) {

        const style = {
            margin: 2,
        };

        return (
            <TableRow key={decoder.serialNumber}>
                <TableRowColumn>
                    {decoder.name}
                </TableRowColumn>
                <TableRowColumn>
                    <SelectField
                        value={this.state.decoderIndex}
                        onChange={this.handleDecoderChange.bind(this)}
                    >
                        <MenuItem value={0} primaryText="Encoder 1"/>
                        <MenuItem value={1} primaryText="Encoder 2"/>
                    </SelectField>
                </TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        onClick={() => this.handleAssignEncoderToDecoder(decoder)}
                        label="Assign"
                        style={style}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    buildRows() {

        const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;

        let rows = [];

        for (let serialNumber in decodersBySerialNumber) {
            if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
                const decoder = decodersBySerialNumber[serialNumber];
                rows.push(this.buildRow(decoder));
            }
        }

        return rows;
    }

    render() {

        let rows = this.buildRows();

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
};


export default AssignEncoderToDecoder;
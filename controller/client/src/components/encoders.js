import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/RaisedButton';

export default class Encoders extends Component {

  buildEncoderRow(encoder) {

    // const style = {
    //   // margin: 12,
    //   margin: 0,
    // };

    let ipAddress = '0.0.0.0';
    if (encoder.ipAddress) {
      ipAddress = encoder.ipAddress;
    }

    return (
      <TableRow key={encoder.serialNumber}>
        <TableRowColumn>
          {encoder.name}
        </TableRowColumn>
        <TableRowColumn>
          {encoder.stream}
        </TableRowColumn>
      </TableRow>
    );
  }

  buildEncoderRows() {

    const encodersBySerialNumber = this.props.encoders.encodersBySerialNumber;

    let encoderRows = [];
    let encoderIndex = 0;

    for (let serialNumber in encodersBySerialNumber) {
      if (encodersBySerialNumber.hasOwnProperty(serialNumber)) {
        const encoder = encodersBySerialNumber[serialNumber];
        encoderRows.push(this.buildEncoderRow(encoder, encoderIndex));
        encoderIndex++;
      }
    }

    return encoderRows;
  }

  handleAddStream() {
    console.log('handleAddStream invoked');
  }

  render() {

    const encoderRows = this.buildEncoderRows();

    return (

      <MuiThemeProvider>

        <div>

          <FlatButton
            disableTouchRipple={true}
            label='Add Stream'
            onTouchTap={this.handleAddStream.bind(this)}
          />
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Stream address</TableHeaderColumn>
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

Encoders.propTypes = {
  encoders: React.PropTypes.object.isRequired,
};

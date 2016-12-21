import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
          {ipAddress}
        </TableRowColumn>
        <TableRowColumn>
          {encoder.stream}
        </TableRowColumn>
        <TableRowColumn>
          {encoder.source}
        </TableRowColumn>
        <TableRowColumn>
          {encoder.bitRate}
        </TableRowColumn>
        <TableRowColumn>
          {encoder.videoCodec}
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
  
  render() {

    const encoderRows = this.buildEncoderRows();

    return (

      <MuiThemeProvider>

        <div>

          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>IP Address</TableHeaderColumn>
                <TableHeaderColumn>Stream</TableHeaderColumn>
                <TableHeaderColumn>Source</TableHeaderColumn>
                <TableHeaderColumn>Bit Rate</TableHeaderColumn>
                <TableHeaderColumn>Codec</TableHeaderColumn>
                <TableHeaderColumn>Video Format</TableHeaderColumn>
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

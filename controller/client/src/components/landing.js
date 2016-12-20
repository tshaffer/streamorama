import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import RaisedButton from 'material-ui/RaisedButton';

class Landing extends Component {

  componentWillMount() {
    this.props.onLoadEncoders();
    this.props.onLoadDecoders();
  }

  buildDecoderRow(decoder) {

    // const style = {
    //   // margin: 12,
    //   margin: 0,
    // };

    // TODO
    decoder.ipAddress = '0.0.0.0';

    let encoder = 'None';
    let stream = '';
    if (decoder.assignedEncoder) {
      encoder = decoder.assignedEncoder.name;
      stream = decoder.assignedEncoder.stream;
    }

    return (
      <TableRow key={decoder.serialNumber}>
        <TableRowColumn>
          {decoder.name}
        </TableRowColumn>
        <TableRowColumn>
          {decoder.ipAddress}
        </TableRowColumn>
        <TableRowColumn>
          {encoder}
        </TableRowColumn>
        <TableRowColumn>
          {stream}
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

    const decoderRows = this.buildDecoderRows();

    return (

      <MuiThemeProvider>

        <div>
          Decoders
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>IP Address</TableHeaderColumn>
                <TableHeaderColumn>Encoder</TableHeaderColumn>
                <TableHeaderColumn>Stream</TableHeaderColumn>
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

Landing.propTypes = {
  onLoadEncoders: React.PropTypes.func.isRequired,
  onLoadDecoders: React.PropTypes.func.isRequired,
  encoders: React.PropTypes.object.isRequired,
  decoders: React.PropTypes.object.isRequired,
  // startEncoder: React.PropTypes.func.isRequired,
  // stopEncoder: React.PropTypes.func.isRequired
};

export default Landing;

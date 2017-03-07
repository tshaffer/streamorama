import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddStreamDlg from './addStreamDlg';

export default class Streams extends Component {

  buildStreamRow(stream) {

    // const style = {
    //   // margin: 12,
    //   margin: 0,
    // };

    let ipAddress = '0.0.0.0';
    if (stream.ipAddress) {
      ipAddress = stream.ipAddress;
    }

    return (
      <TableRow key={stream.serialNumber}>
        <TableRowColumn>
          {stream.name}
        </TableRowColumn>
        <TableRowColumn>
          {stream.stream}
        </TableRowColumn>
      </TableRow>
    );
  }

  buildStreamRows() {

    const streamsBySerialNumber = this.props.streams.streamsBySerialNumber;

    let streamRows = [];
    let streamIndex = 0;

    for (let serialNumber in streamsBySerialNumber) {
      if (streamsBySerialNumber.hasOwnProperty(serialNumber)) {
        const stream = streamsBySerialNumber[serialNumber];
        streamRows.push(this.buildStreamRow(stream, streamIndex));
        streamIndex++;
      }
    }

    return streamRows;
  }

  handleAddStream(streamName, streamAddress) {
    console.log('handleAddStream invoked');
    console.log('streamName: ', streamName, ' streamAddress: ', streamAddress);
  }

  render() {

    const streamRows = this.buildStreamRows();

    return (

      <MuiThemeProvider>

        <div>

          <AddStreamDlg
            onAddStream={this.handleAddStream.bind(this)}
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
              {streamRows}
            </TableBody>
          </Table>
        </div>

      </MuiThemeProvider>
    );
  }
}

Streams.propTypes = {
  streams: React.PropTypes.object.isRequired,
};

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

    return (
      <TableRow key={stream.name}>
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

    const streamsByUniqueStreamId = this.props.streams.streamsByUniqueStreamId;

    let streamRows = [];
    let streamIndex = 0;

    for (let serialNumber in streamsByUniqueStreamId) {
      if (streamsByUniqueStreamId.hasOwnProperty(serialNumber)) {
        const stream = streamsByUniqueStreamId[serialNumber];
        streamRows.push(this.buildStreamRow(stream, streamIndex));
        streamIndex++;
      }
    }

    return streamRows;
  }

  handleAddStream(streamName, streamAddress) {
    console.log('handleAddStream invoked');
    console.log('streamName: ', streamName, ' streamAddress: ', streamAddress);

    const stream = {
      name: streamName,
      stream: streamAddress
    };
    this.props.onAddStream(stream);
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
  onAddStream: React.PropTypes.func.isRequired,
};

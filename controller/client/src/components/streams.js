import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AddStreamDlg from './addStreamDlg';

export default class Streams extends Component {

  handleDeleteStream(stream) {
    console.log('delete stream: ', stream);
    this.props.onDeleteStream(stream);
  }

  getHandleDeleteStream(stream){
    return () => {
      this.handleDeleteStream(stream);
    };
  }

  buildStreamRow(stream) {

    console.log('buildStreamRow: ', stream);

    return (
      <TableRow key={stream.name}>
        <TableRowColumn>
          <RaisedButton label="Delete" onTouchTap={this.getHandleDeleteStream(stream)} />
        </TableRowColumn>
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
                <TableHeaderColumn/>
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
  onDeleteStream: React.PropTypes.func.isRequired,
};

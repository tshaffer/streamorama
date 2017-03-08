import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

export default class Decoders extends Component {

  constructor(props) {
    super(props);
    this.streamIndicesByDecoderRow = [];
  }

  buildStreamIndicesByDecoderRow() {

    if (Object.keys(this.props.streams.streamsByUniqueStreamId).length === 0 ||
      Object.keys(this.props.decoders.decodersBySerialNumber).length === 0) return;

    let streamIndicesByDecoderRow = [];

    const streamsByUniqueStreamId = this.props.streams.streamsByUniqueStreamId;

    const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;
    for (let serialNumber in decodersBySerialNumber) {
      if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
        const decoder = decodersBySerialNumber[serialNumber];
        if (!decoder.assignedStream || decoder.assignedStream === '') {
          streamIndicesByDecoderRow.push(0);
        }
        else {
          const assignedStreamUniqueId = decoder.assignedStream;

          // walk through the streams to find the serial number associated with this stream
          let streamIndex = 1;
          for (let streamUniqueId in streamsByUniqueStreamId) {
            if (streamsByUniqueStreamId.hasOwnProperty(streamUniqueId)) {
              if (streamUniqueId === assignedStreamUniqueId) {
                streamIndicesByDecoderRow.push(streamIndex);
                // TODO break out of the loop
              }
              streamIndex++;
            }
          }
          // const assignedStream = streamsByUniqueStreamId[assignedStreamSerialNumber];
          // streamIndicesByDecoderRow.push(0);
        }
      }
    }

    this.streamIndicesByDecoderRow = streamIndicesByDecoderRow;
  }

  buildNoneAssignedStreamOption() {
    return (
      <MenuItem key={-1} value={0} primaryText={'None'}/>
    );
  }

  buildStreamOption(index, stream) {

    return (
      <MenuItem key={index} value={index} primaryText={stream.name}/>
    );
  }

  buildStreamOptions() {

    const streamsByUniqueStreamId = this.props.streams.streamsByUniqueStreamId;

    let streamOptions = [];

    streamOptions.push(this.buildNoneAssignedStreamOption());

    let streamIndex = 1;
    for (let serialNumber in streamsByUniqueStreamId) {
      if (streamsByUniqueStreamId.hasOwnProperty(serialNumber)) {
        const stream = streamsByUniqueStreamId[serialNumber];
        streamOptions.push(this.buildStreamOption(streamIndex, stream));
        streamIndex++;
      }
    }

    return streamOptions;
  }

  // handleStreamChange(decoder, decoderIndex, event, index, streamIndex) {
  handleStreamChange(_, decoderIndex, __, ___, streamIndex) {

    // TODO - combine into a single line of code?
    const streamIndicesByDecoderRow = this.streamIndicesByDecoderRow;
    streamIndicesByDecoderRow[decoderIndex] = streamIndex;
    this.streamIndicesByDecoderRow = streamIndicesByDecoderRow;

    // TODO get streams / decoders referenced by index - better way?
    const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;
    const streamsByUniqueStreamId = this.props.streams.streamsByUniqueStreamId;

    let index = 0;
    let decoder = null;

    for (let serialNumber in decodersBySerialNumber) {
      if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
        decoder = decodersBySerialNumber[serialNumber];
        if (index === decoderIndex) {
          break;
        }
      }
      index++;
    }
    // at this point, decoder now contains the specified decoder
    if (decoder === null) {
      debugger;
    }

    index = 0;
    let stream = null;

    if (streamIndex === 0) {
      // TODO assign to None - not yet handled!!
      debugger;
    }

    streamIndex--;
    for (let serialNumber in streamsByUniqueStreamId) {
      if (streamsByUniqueStreamId.hasOwnProperty(serialNumber)) {
        stream = streamsByUniqueStreamId[serialNumber];
        if (index === streamIndex) {
          break;
        }
        index++;
      }
    }
    // at this point, stream now contains the specified stream
    if (stream === null) {
      debugger;
    }

    decoder.assignedStream = stream.name;
    decoder.streamIndex = streamIndex;
    this.props.onSetDecoder(decoder);
  }

  buildDecoderRow(decoder, decoderIndex, streamOptions) {

    const self = this;

    // const style = {
    //   // margin: 12,
    //   margin: 0,
    // };

    let stream = '';
    if (decoder.assignedStream && decoder.assignedStream !== '') {
      const assignedStream = this.props.streams.streamsByUniqueStreamId[decoder.assignedStream];
      if (assignedStream) {
        stream = assignedStream.stream;
      }
    }

    return (
      <TableRow key={decoder.serialNumber}>
        <TableRowColumn>
          {decoder.name}
        </TableRowColumn>
        <TableRowColumn>
          <SelectField
            value={this.streamIndicesByDecoderRow[decoderIndex]}
            onChange={(event, streamRowIndex, streamIndex) => {
              self.handleStreamChange(decoder, decoderIndex, event, streamRowIndex, streamIndex);
            }}
          >
            {streamOptions}
          </SelectField>
        </TableRowColumn>
        <TableRowColumn>
          {stream}
        </TableRowColumn>
      </TableRow>
    );
  }

  buildDecoderRows(streamOptions) {

    const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;

    let decoderRows = [];
    let decoderIndex = 0;

    for (let serialNumber in decodersBySerialNumber) {
      if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
        const decoder = decodersBySerialNumber[serialNumber];
        decoderRows.push(this.buildDecoderRow(decoder, decoderIndex, streamOptions));
        decoderIndex++;
      }
    }

    return decoderRows;
  }

  render() {

    this.buildStreamIndicesByDecoderRow();

    const streamOptions = this.buildStreamOptions();
    const decoderRows = this.buildDecoderRows(streamOptions);

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
                <TableHeaderColumn>Select stream</TableHeaderColumn>
                <TableHeaderColumn>Currently playing</TableHeaderColumn>
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

Decoders.propTypes = {
  onSetDecoder: React.PropTypes.func.isRequired,
  streams: React.PropTypes.object.isRequired,
  decoders: React.PropTypes.object.isRequired,
};

import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';

export default class Decoders extends Component {

  constructor(props) {
    super(props);
    this.streamIndicesByDecoderRow = [];
  }

  buildStreamIndicesByDecoderRow() {

    if (Object.keys(this.props.streams.streamsBySerialNumber).length === 0 ||
      Object.keys(this.props.decoders.decodersBySerialNumber).length === 0) return;

    let streamIndicesByDecoderRow = [];

    const streamsBySerialNumber = this.props.streams.streamsBySerialNumber;

    const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;
    for (let serialNumber in decodersBySerialNumber) {
      if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
        const decoder = decodersBySerialNumber[serialNumber];
        if (!decoder.assignedStream || decoder.assignedStream === '') {
          streamIndicesByDecoderRow.push(0);
        }
        else {
          const assignedStreamSerialNumber = decoder.assignedStream;

          // walk through the streams to find the serial number associated with this stream
          let streamIndex = 1;
          for (let streamSerialNumber in streamsBySerialNumber) {
            if (streamsBySerialNumber.hasOwnProperty(streamSerialNumber)) {
              if (streamSerialNumber === assignedStreamSerialNumber) {
                streamIndicesByDecoderRow.push(streamIndex);
                // TODO break out of the loop
              }
              streamIndex++;
            }
          }
          // const assignedStream = streamsBySerialNumber[assignedStreamSerialNumber];
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

    const streamsBySerialNumber = this.props.streams.streamsBySerialNumber;

    let streamOptions = [];

    streamOptions.push(this.buildNoneAssignedStreamOption());

    let streamIndex = 1;
    for (let serialNumber in streamsBySerialNumber) {
      if (streamsBySerialNumber.hasOwnProperty(serialNumber)) {
        const stream = streamsBySerialNumber[serialNumber];
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
    const streamsBySerialNumber = this.props.streams.streamsBySerialNumber;

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
    for (let serialNumber in streamsBySerialNumber) {
      if (streamsBySerialNumber.hasOwnProperty(serialNumber)) {
        stream = streamsBySerialNumber[serialNumber];
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

    decoder.assignedStream = stream.serialNumber;
    decoder.streamIndex = streamIndex;
    this.props.onSetDecoder(decoder);
  }

  buildDecoderRow(decoder, decoderIndex, streamOptions) {

    const self = this;

    // const style = {
    //   // margin: 12,
    //   margin: 0,
    // };

    let ipAddress = '0.0.0.0';
    if (decoder.ipAddress) {
      ipAddress = decoder.ipAddress;
    }
    let stream = '';
    if (decoder.assignedStream && decoder.assignedStream !== '') {
      const assignedStream = this.props.streams.streamsBySerialNumber[decoder.assignedStream];
      if (assignedStream) {
        stream = assignedStream.stream;
      }
    }

    // didn't work!!
    // {/*<TextField*/}
    //   id='decoderNameField'
    //   defaultValue={decoder.name}
    //   onChange={() => {
    //     debugger;
    //     self.handleDecoderNameChange();
    //   }}
    // />

    return (
      <TableRow key={decoder.serialNumber}>
        <TableRowColumn>
          {decoder.name}
        </TableRowColumn>
        <TableRowColumn>
          {ipAddress}
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
                <TableHeaderColumn>IP address</TableHeaderColumn>
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

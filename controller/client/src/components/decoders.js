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
    this.encoderIndicesByDecoderRow = [];
  }

  componentWillMount() {
    this.props.onLoadEncoders();
    this.props.onLoadDecoders();
  }

  buildEncoderIndicesByDecoderRow() {

    if (Object.keys(this.props.encoders.encodersBySerialNumber).length === 0 ||
      Object.keys(this.props.decoders.decodersBySerialNumber).length === 0) return;

    let encoderIndicesByDecoderRow = [];

    const encodersBySerialNumber = this.props.encoders.encodersBySerialNumber;

    const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;
    for (let serialNumber in decodersBySerialNumber) {
      if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
        const decoder = decodersBySerialNumber[serialNumber];
        if (decoder.assignedEncoder === '') {
          encoderIndicesByDecoderRow.push(0);
        }
        else {
          const assignedEncoderSerialNumber = decoder.assignedEncoder.serialNumber;

          // walk through the encoders to find the serial number associated with this encoder
          let encoderIndex = 1;
          for (let encoderSerialNumber in encodersBySerialNumber) {
            if (encodersBySerialNumber.hasOwnProperty(encoderSerialNumber)) {
              if (encoderSerialNumber === assignedEncoderSerialNumber) {
                encoderIndicesByDecoderRow.push(encoderIndex);
                // break out of the loop
              }
              encoderIndex++;
            }
          }
          // const assignedEncoder = encodersBySerialNumber[assignedEncoderSerialNumber];
          // encoderIndicesByDecoderRow.push(0);
        }
      }
    }

    this.encoderIndicesByDecoderRow = encoderIndicesByDecoderRow;
  }

  buildNoneAssignedEncoderOption() {
    return (
      <MenuItem key={-1} value={0} primaryText={'None'}/>
    );
  }

  buildEncoderOption(index, encoder) {

    return (
      <MenuItem key={index} value={index} primaryText={encoder.name}/>
    );
  }

  buildEncoderOptions() {

    const encodersBySerialNumber = this.props.encoders.encodersBySerialNumber;

    let encoderOptions = [];

    encoderOptions.push(this.buildNoneAssignedEncoderOption());

    let encoderIndex = 1;
    for (let serialNumber in encodersBySerialNumber) {
      if (encodersBySerialNumber.hasOwnProperty(serialNumber)) {
        const encoder = encodersBySerialNumber[serialNumber];
        encoderOptions.push(this.buildEncoderOption(encoderIndex, encoder));
        encoderIndex++;
      }
    }

    return encoderOptions;
  }

  // handleEncoderChange(decoder, decoderIndex, event, index, encoderIndex) {
  handleEncoderChange(_, decoderIndex, __, ___, encoderIndex) {
    const encoderIndicesByDecoderRow = this.encoderIndicesByDecoderRow;
    encoderIndicesByDecoderRow[decoderIndex] = encoderIndex;
    this.encoderIndicesByDecoderRow = encoderIndicesByDecoderRow;
  }

  buildDecoderRow(decoder, decoderIndex, encoderOptions) {

    const self = this;

    // const style = {
    //   // margin: 12,
    //   margin: 0,
    // };

    // TODO
    decoder.ipAddress = '0.0.0.0';

    // let encoder = 'None';
    let stream = '';
    if (decoder.assignedEncoder) {
      // encoder = decoder.assignedEncoder.name;
      stream = decoder.assignedEncoder.stream;
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
          {decoder.ipAddress}
        </TableRowColumn>
        <TableRowColumn>
          <SelectField
            value={this.encoderIndicesByDecoderRow[decoderIndex]}
            onChange={(event, encoderRowIndex, encoderIndex) => {
              self.handleEncoderChange(decoder, decoderIndex, event, encoderRowIndex, encoderIndex);
            }}
          >
            {encoderOptions}
          </SelectField>
        </TableRowColumn>
        <TableRowColumn>
          {stream}
        </TableRowColumn>
      </TableRow>
    );
  }

  buildDecoderRows(encoderOptions) {

    const decodersBySerialNumber = this.props.decoders.decodersBySerialNumber;

    let decoderRows = [];
    let decoderIndex = 0;

    for (let serialNumber in decodersBySerialNumber) {
      if (decodersBySerialNumber.hasOwnProperty(serialNumber)) {
        const decoder = decodersBySerialNumber[serialNumber];
        decoderRows.push(this.buildDecoderRow(decoder, decoderIndex, encoderOptions));
        decoderIndex++;
      }
    }

    return decoderRows;
  }

  render() {

    this.buildEncoderIndicesByDecoderRow();

    const encoderOptions = this.buildEncoderOptions();
    const decoderRows = this.buildDecoderRows(encoderOptions);

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

Decoders.propTypes = {
  onLoadEncoders: React.PropTypes.func.isRequired,
  onLoadDecoders: React.PropTypes.func.isRequired,
  encoders: React.PropTypes.object.isRequired,
  decoders: React.PropTypes.object.isRequired,
};

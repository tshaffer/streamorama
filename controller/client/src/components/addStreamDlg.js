import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class AddStreamDlg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleAddStream() {

    const streamName = this.streamNameTxtField.input.value;
    const streamAddress = this.streamAddressTxtField.input.value;

    this.props.onAddStream(streamName, streamAddress);
    this.setState({open: false});
  }

  render() {

    let self = this;

    const actions = [
      <FlatButton
        key={'0'}
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        key={'1'}
        label="Submit"
        primary={true}
        onTouchTap={this.handleAddStream.bind(this)}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Add Stream" onTouchTap={this.handleOpen.bind(this)} />
        <Dialog
          title="Add Stream"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div>
            <TextField
              id={'streamNameTxtField'}
              ref={(c) => {
                self.streamNameTxtField = c;
              }}
              floatingLabelText="Stream name"
              floatingLabelFixed={true}
            />
            <TextField
              id={'streamAddressTxtField'}
              ref={(c) => {
                self.streamAddressTxtField = c;
              }}
              floatingLabelText="Stream address"
              floatingLabelFixed={true}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

AddStreamDlg.propTypes = {
  onAddStream: React.PropTypes.func.isRequired,
};

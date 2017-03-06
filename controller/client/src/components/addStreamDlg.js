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
    this.props.onAddStream('Flibbet', 'http://www.flibbet.com');
    this.setState({open: false});
  }

  render() {
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
            <p>Stream name</p>
            <TextField
              id={'streamNameTxtField'}
            />
            <p>Stream address</p>
            <TextField
              id={'streamAddressTxtField'}
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

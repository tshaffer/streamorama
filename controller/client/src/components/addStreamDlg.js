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

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
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
            <TextField/>
            <p>Stream address</p>
            <TextField
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
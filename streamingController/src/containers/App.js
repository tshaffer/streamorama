import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

// import Landing from '../components/landing';

// import EncoderContainer from '../containers/encoderContainer';

// return (
//     <MuiThemeProvider>
//         <Landing/>
//     </MuiThemeProvider>
// );

class App extends Component {

    handleAddEncoder() {
        hashHistory.push('/addEncoder');
    }

    handleAssignDecoderToEncoder() {
        hashHistory.push('/assignDecoderToEncoder');
    }

    handleViewBrightSigns() {
        hashHistory.push('/viewBrightSigns');
    }

    render() {

        let self = this;

        const style = {
            margin: 12,
        };

        return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton
                        onClick={this.handleAddEncoder.bind(this)}
                        label="Add Encoder"
                        style={style}
                    />

                    <RaisedButton
                        onClick={this.handleAssignDecoderToEncoder.bind(this)}
                        label="Assign Decoder to Encoder"
                        style={style}
                    />

                    <RaisedButton
                        onClick={this.handleViewBrightSigns.bind(this)}
                        label="View BrightSigns"
                        style={style}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

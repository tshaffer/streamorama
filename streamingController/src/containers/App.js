import React from 'react';
import {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EncoderContainer from '../containers/encoderContainer';

class App extends Component {

    render() {

        return (
            <MuiThemeProvider>
                <EncoderContainer/>
            </MuiThemeProvider>
        );
    }
}

export default App;

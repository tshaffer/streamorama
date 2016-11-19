import React from 'react';
import {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Encoder from '../components/encoder';

class App extends Component {

    render() {

        return (
            <MuiThemeProvider>
                <Encoder/>
            </MuiThemeProvider>
        );
    }
}

export default App;

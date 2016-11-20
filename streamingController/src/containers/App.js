import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import Landing from '../components/landing';

import EncoderContainer from '../containers/encoderContainer';

// return (
//     <MuiThemeProvider>
//         <Landing/>
//     </MuiThemeProvider>
// );

class App extends Component {

    render() {

        return (
            <MuiThemeProvider>
                <Landing/>
            </MuiThemeProvider>
        );
    }
}

export default App;

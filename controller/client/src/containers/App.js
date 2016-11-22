import React, { Component } from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Landing from '../components/landing';

class App extends Component {

    componentWillMount() {

        let encoders = [];
        let decoders = [];

        console.log("app.js::componentWillMount");

        let getEncodersUrl = "http://localhost:8080/getEncoders";

        axios.get(getEncodersUrl)
            .then(function (encodersResponse) {
                console.log(encodersResponse);

                const encodersBySerialNumber = encodersResponse.data;
                for (let encoderSerialNumber in encodersBySerialNumber) {
                    const encoder = encodersBySerialNumber[encoderSerialNumber];
                    encoders.push(encoder);
                }
                
                console.log("found ", encoders.length + " encoders");
            })
            .catch(function (encodersError) {
                console.log(encodersError);
            });

        let getDecodersUrl = "http://localhost:8080/getDecoders";

        axios.get(getDecodersUrl)
            .then(function (decodersResponse) {
                console.log(decodersResponse);

                const decodersBySerialNumber = decodersResponse.data;
                for (let decoderSerialNumber in decodersBySerialNumber) {
                    const decoder = decodersBySerialNumber[decoderSerialNumber];
                    decoders.push(decoder);
                }

                console.log("found ", decoders.length + " decoders");
            })
            .catch(function (decodersError) {
                console.log(decodersError);
            });
    }
    
    render() {
        return (
            <MuiThemeProvider>
                <Landing/>
            </MuiThemeProvider>
        );
    }
}

export default App;

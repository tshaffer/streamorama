import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Landing from '../components/landing';

import { setEncoders, setDecoders } from '../actions/index';

class App extends Component {

    componentWillMount() {

        let self = this;

        let encoders = [];
        let decoders = [];

        console.log("app.js::componentWillMount");

        let getEncodersUrl = "http://localhost:8080/getEncoders";

        axios.get(getEncodersUrl)
            .then(function (encodersResponse) {
                console.log(encodersResponse);

                self.props.setEncoders(encodersResponse.data);
                console.log("populate store with encoders");
            })
            .catch(function (encodersError) {
                console.log(encodersError);
            });

        let getDecodersUrl = "http://localhost:8080/getDecoders";

        axios.get(getDecodersUrl)
            .then(function (decodersResponse) {
                console.log(decodersResponse);

                self.props.setDecoders(decodersResponse.data);
                console.log("populate store with decoders");
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

App.propTypes = {
    setEncoders: React.PropTypes.func.isRequired,
    setDecoders: React.PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators(
        { setEncoders, setDecoders },
        dispatch)
);

export default connect(null, mapDispatchToProps)(App);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BrightSigns from '../components/brightSigns';
import { startEncoder, stopEncoder } from '../actions/index';

const mapStateToProps = (state, ownProps) => ( {
    encoders: state.encoders
});

const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators(
        { startEncoder, stopEncoder },
        dispatch)
);

const BrightSignsContainer = connect(
    mapStateToProps, mapDispatchToProps
)(BrightSigns);

export default BrightSignsContainer;

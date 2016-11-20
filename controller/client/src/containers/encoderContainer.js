import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Encoder from '../components/encoder';

import { addEncoder } from '../actions/index';

const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators(
        { addEncoder },
        dispatch)
);

const EncoderContainer = connect(
    null,
    mapDispatchToProps
)(Encoder);

export default EncoderContainer;
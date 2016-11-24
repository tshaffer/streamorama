import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Decoder from '../components/decoder';

import { setDecoder } from '../actions/index';

const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators(
        { setDecoder },
        dispatch)
);

const DecoderContainer = connect(
    null,
    mapDispatchToProps
)(Decoder);

export default DecoderContainer;

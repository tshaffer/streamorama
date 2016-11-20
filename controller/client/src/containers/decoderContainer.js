import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Decoder from '../components/decoder';

import { addDecoder } from '../actions/index';

const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators(
        { addDecoder },
        dispatch)
);

const DecoderContainer = connect(
    null,
    mapDispatchToProps
)(Decoder);

export default DecoderContainer;

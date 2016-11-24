import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AssignEncoderToDecoder from '../components/assignEncoderToDecoder';

import { assignEncoderToDecoder, setDecoder } from '../actions/index';

const mapStateToProps = (state, ownProps) => ( {
    encoders: state.encoders,
    decoders: state.decoders
});

const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators(
        { assignEncoderToDecoder, setDecoder },
        dispatch)
);

const AssignEncoderToDecoderContainer = connect(
    mapStateToProps, mapDispatchToProps
)(AssignEncoderToDecoder);

export default AssignEncoderToDecoderContainer;

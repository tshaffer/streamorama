import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AssignEncoderToDecoder from '../components/assignEncoderToDecoder';

import { assignEncoderToDecoder } from '../actions/index';

const mapStateToProps = (state, ownProps) => ( {
    encoders: state.encoders,
    decoders: state.decoders
});

const mapDispatchToProps = (dispatch, ownProps) => (
    bindActionCreators(
        { assignEncoderToDecoder },
        dispatch)
);

const AssignEncoderToDecoderContainer = connect(
    mapStateToProps, mapDispatchToProps
)(AssignEncoderToDecoder);

export default AssignEncoderToDecoderContainer;

import React from 'react';
import { connect } from 'react-redux';

import BrightSigns from '../components/brightSigns';

const mapStateToProps = (state, ownProps) => ( {
    encoders: state.encoders
});

const BrightSignsContainer = connect(
    mapStateToProps
)(BrightSigns);

export default BrightSignsContainer;

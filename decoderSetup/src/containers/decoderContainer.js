import { connect } from 'react-redux';

import Decoder from '../components/decoder';

import { addEncoder } from '../actions/index';

function mapStateToProps (state, ownProps) {
  return {
    encoders: state.encoders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddEncoder: (encoder) => {
      dispatch(addEncoder(encoder));
    }
  };
}

const DecoderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Decoder);

export default DecoderContainer;


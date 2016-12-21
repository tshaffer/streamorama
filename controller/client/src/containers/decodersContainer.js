import { connect } from 'react-redux';

import Decoders from '../components/decoders';

import { loadEncoders } from '../store/encoders';
import { loadDecoders } from '../store/decoders';
import { setDecoder } from '../store/decoders';

function mapStateToProps (state) {
  return {
    encoders: state.encoders,
    decoders: state.decoders,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadEncoders: () => {
      dispatch(loadEncoders());
    },
    onLoadDecoders: () => {
      dispatch(loadDecoders());
    },
    onSetDecoder: (decoder) => {
      dispatch(setDecoder(decoder));
    }
  };
};

const DecodersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Decoders);

export default DecodersContainer;


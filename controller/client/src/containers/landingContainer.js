import { connect } from 'react-redux';

import Landing from '../components/landing';

import { loadStreams } from '../store/streams';
import { loadDecoders } from '../store/decoders';
import { setDecoder } from '../store/decoders';

function mapStateToProps (state) {
  return {
    streams: state.streams,
    decoders: state.decoders,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadStreams: () => {
      dispatch(loadStreams());
    },
    onLoadDecoders: () => {
      dispatch(loadDecoders());
    },
    onSetDecoder: (decoder) => {
      dispatch(setDecoder(decoder));
    }
  };
};

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

export default LandingContainer;


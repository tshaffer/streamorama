import { connect } from 'react-redux';

import Landing from '../components/landing';

import { addStream, deleteStream, loadStreams } from '../store/streams';
import { setDecoder, loadDecoders } from '../store/decoders';

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
    },
    onAddStream: (stream) => {
      dispatch(addStream(stream));
    },
    onDeleteStream: (stream) => {
      dispatch(deleteStream(stream));
    }
  };
};

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

export default LandingContainer;


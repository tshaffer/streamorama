import { connect } from 'react-redux';

import Landing from '../components/landing';

import { loadEncoders } from '../store/encoders';
import { loadDecoders } from '../store/decoders';

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
    }
  };
};

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

export default LandingContainer;


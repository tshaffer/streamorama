import { combineReducers } from 'redux';

import decodersReducer from './decoders';
import streamsReducer from './streams';

const rootReducer = combineReducers({
  decoders: decodersReducer,
  streams: streamsReducer
});

export default rootReducer;



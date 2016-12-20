import { combineReducers } from 'redux';

import decodersReducer from './decoders';
import encodersReducer from './encoders';

const rootReducer = combineReducers({
  decoders: decodersReducer,
  encoders: encodersReducer
});

export default rootReducer;



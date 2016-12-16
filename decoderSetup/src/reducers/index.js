import {combineReducers} from 'redux';
import DecodersReducer from './reducerDecoders';
import EncodersReducer from './reducerEncoders';

const rootReducer = combineReducers({
  decoders: DecodersReducer,
  encoders: EncodersReducer
});

export default rootReducer;

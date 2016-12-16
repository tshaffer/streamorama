import {combineReducers} from 'redux';
import DecodersReducer from './reducerDecoders';

const rootReducer = combineReducers({
  decoders: DecodersReducer,
});

export default rootReducer;

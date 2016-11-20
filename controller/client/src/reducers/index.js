import {combineReducers} from 'redux';
import EncodersReducer from './reducerEncoders';
import DecodersReducer from './reducerDecoders';

const rootReducer = combineReducers({
    encoders: EncodersReducer,
    decoders: DecodersReducer
});

export default rootReducer;

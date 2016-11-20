import {combineReducers} from 'redux';
import EncodersReducer from './reducerEncoders';

const rootReducer = combineReducers({
    encoders: EncodersReducer
});

export default rootReducer;

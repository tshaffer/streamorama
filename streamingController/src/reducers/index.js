import {combineReducers} from 'redux';
import EncoderReducer from './reducerEncoder';

const rootReducer = combineReducers({
    encoders: EncoderReducer
});

export default rootReducer;

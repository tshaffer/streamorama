import {combineReducers} from 'redux';
import EncoderReducer from './reducerEncoder';

const rootReducer = combineReducers({
    encoder: EncoderReducer
});

export default rootReducer;

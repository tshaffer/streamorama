/**
 * Created by tedshaffer on 11/19/16.
 */
import { ADD_ENCODER } from '../actions/index';

export default function(state = [], action) {

    switch (action.type) {

        case ADD_ENCODER:
            return action.payload;
    }

    return state;
}

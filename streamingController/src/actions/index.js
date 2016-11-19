/**
 * Created by tedshaffer on 11/19/16.
 */
export const ADD_ENCODER = 'ADD_ENCODER';

export function addEncoder(encoder) {

    console.log("index.js::addEncoder");
    return {
        type: ADD_ENCODER,
        encoder
    };
}


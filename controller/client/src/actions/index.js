import axios from 'axios';

export const ADD_ENCODER = 'ADD_ENCODER';
export const ADD_DECODER = 'ADD_DECODER';

export function assignEncoderToDecoder(encoder, decoder) {
    console.log("assignEncoderToDecoder");

}

function addEncoderToRedux(encoder) {

    console.log("index.js::addEncoder");
    return {
        type: ADD_ENCODER,
        encoder
    };
}

export function addEncoder(encoder) {

    return function (dispatch, getState) {

        dispatch(addEncoderToRedux(encoder));

        let serverURL = "http://localhost:8080/setEncoderParams";

        return axios.get(serverURL, {
            params: { encoderParams: encoder }
        }).then(function(data) {
            console.log("addEncoder - return from server call");
            console.log(data);
        });
    };
}

export function startEncoder(encoder) {

    return function (dispatch, getState) {

        let serverURL = "http://localhost:8080/startEncoder";

        let promise = axios.get(serverURL, {
            params: { serialNumber: encoder.serialNumber }
        });

        promise.then(function(data) {
            console.log("startEncoder - return from server call");
            // set status in redux
        });
    };
}

export function stopEncoder(encoder) {

    return function (dispatch, getState) {

        let serverURL = "http://localhost:8080/stopEncoder";

        let promise = axios.get(serverURL, {
            params: { serialNumber: encoder.serialNumber }
        });

        promise.then(function(data) {
            console.log("stopEncoder - return from server call");
            // set status in redux
        });
    };
}

function addDecoderToRedux(decoder) {

    console.log("index.js::addDecoder");
    return {
        type: ADD_DECODER,
        decoder
    };
}

export function addDecoder(decoder) {

    return function (dispatch, getState) {

        dispatch(addDecoderToRedux(decoder));

        let serverURL = "http://localhost:8080/addDecoder";

        return axios.get(serverURL, {
            params: { decoderParams: decoder }
        }).then(function(data) {
            console.log("addDecoder - return from server call");
            console.log(data);
        });
    };
}


import axios from 'axios';

export function assignStreamToDecoder(stream, decoder) {
    console.log("assignStreamToDecoder");
}

function addStreamToRedux(stream) {
    console.log("index.js::addStream");
    return {
        type: ADD_STREAM,
        stream
    };
}

export function addStream(stream) {

    return function (dispatch, getState) {

        dispatch(addStreamToRedux(stream));

        let serverURL = "/setStreamParams";

        return axios.get(serverURL, {
            params: { streamParams: stream }
        }).then(function(data) {
            console.log("addStream - return from server call");
            console.log(data);
        });
    };
}


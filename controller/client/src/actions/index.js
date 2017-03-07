import axios from 'axios';

// DO NOT USE ME - I'M OBSOLETE
const serverIPAddress = "10.1.0.58";

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

        // let serverURL = "http://localhost:8080/setStreamParams";
      let serverURL = "http://" + serverIPAddress + ":8080/setStreamParams";

        return axios.get(serverURL, {
            params: { streamParams: stream }
        }).then(function(data) {
            console.log("addStream - return from server call");
            console.log(data);
        });
    };
}


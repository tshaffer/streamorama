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

export function startStream(stream) {

    return function (dispatch, getState) {

        // let serverURL = "http://localhost:8080/startStream";
      let serverURL = "http://" + serverIPAddress + ":8080/startStream";

        let promise = axios.get(serverURL, {
            params: { serialNumber: stream.serialNumber }
        });

        promise.then(function(data) {
            console.log("startStream - return from server call");
            // set status in redux
        });
    };
}

export function stopStream(stream) {

    return function (dispatch, getState) {

        // let serverURL = "http://localhost:8080/stopStream";
      let serverURL = "http://" + serverIPAddress + ":8080/stopStream";

        let promise = axios.get(serverURL, {
            params: { serialNumber: stream.serialNumber }
        });

        promise.then(function(data) {
            console.log("stopStream - return from server call");
            // set status in redux
        });
    };
}


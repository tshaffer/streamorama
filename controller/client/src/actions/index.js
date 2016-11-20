import axios from 'axios';

export const ADD_ENCODER = 'ADD_ENCODER';

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

        // the remaining code in this function should only be executed when running as a web app
        let setEncoderURL = "http://localhost:8080/setEncoderParams";
        // setEncoderURL += "?name=encoder1&serialNumber=L8D68K000035&encoderName=exampleEncoder&pipeline=udp://239.194.0.2:1234/&source=hdmi&videoCodec=H264&videoFormat=720p30&bitrate=2Mb/s&streamType=multicast&protocol=UDP&ttl=1&destinationAddress=239.194.0.2&port=1234&maximumBitrate=6Mb/s";

        return axios.get(setEncoderURL, {
            params: { encoderParams: encoder }
        }).then(function(data) {
            console.log("addEncoder - return from server call");
            console.log(data);
        });
    };
}

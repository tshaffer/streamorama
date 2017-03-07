import axios from 'axios';

// DO NOT USE ME - I'M OBSOLETE
const serverIPAddress = "10.1.0.58";

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_STREAM = 'ADD_STREAM';
export const SET_STREAMS = 'SET_STREAMS';

// ------------------------------------
// Actions
// ------------------------------------
export function setStreams(streams) {
  return {
    type: SET_STREAMS,
    streams
  };
}

export function loadStreams() {

  return function(dispatch, _) {

    // const getStreamsUrl = 'localhost:8080/getStreams';
    const getStreamsUrl = "http://" + serverIPAddress + ":8080/getStreams";

    axios.get(getStreamsUrl)
      .then(function (streamsResponse) {
        console.log(streamsResponse);

        dispatch(setStreams(streamsResponse.data));
        console.log('populate store with streams');
      })
      .catch(function (streamsError) {
        console.log(streamsError);
      });
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
  {
    streamsBySerialNumber: {}
  };

export default function(state = initialState, action) {

  switch (action.type) {

    case SET_STREAMS:
    {
      let newStreamsBySerialNumber = Object.assign({}, action.streams);

      let newState = {
        streamsBySerialNumber: newStreamsBySerialNumber
      };

      // dumpState(newState);

      return newState;
    }

    case ADD_STREAM:
    {
      let newStreamsBySerialNumber = Object.assign({}, state.streamsBySerialNumber);

      const stream = action.stream;
      newStreamsBySerialNumber[stream.serialNumber] = stream;

      let newState = {
        streamsBySerialNumber: newStreamsBySerialNumber
      };

      // dumpState(newState);

      return newState;
    }
  }

  return state;
}


// ------------------------------------
// Diagnostics
// ------------------------------------
// function dumpState(state) {
//
//   console.log('streams:');
//   for (var serialNumber in state.streamsBySerialNumber) {
//     if (state.streamsBySerialNumber.hasOwnProperty(serialNumber)) {
//       console.log('serial number:', serialNumber);
//       console.log(state.streamsBySerialNumber[serialNumber]);
//     }
//   }
// }

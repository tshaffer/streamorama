import axios from 'axios';

// DO NOT USE ME - I'M OBSOLETE
const serverIPAddress = '10.1.0.58';

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

function addStreamAction(stream) {
  return {
    type: ADD_STREAM,
    stream
  };
}

// ------------------------------------
// Action Creators
// ------------------------------------
export function loadStreams() {

  return function(dispatch, _) {

    // const getStreamsUrl = 'localhost:8080/getStreams';
    const getStreamsUrl = 'http://' + serverIPAddress + ':8080/getStreams';

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

export function addStream(stream) {

  return function (dispatch, _) {

    dispatch(addStreamAction(stream));

    let serverURL = '/addStream';

    return axios.get(serverURL, {
      params: { streamParams: stream }
    }).then(function(data) {
      console.log('addStream - return from server call');
      console.log(data);
    });
  };
}


// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
  {
    streamsByUniqueStreamId: {}
  };

export default function(state = initialState, action) {

  switch (action.type) {

    case SET_STREAMS: {
      let newStreamsByUniqueStreamId = Object.assign({}, action.streams);

      let newState = {
        streamsByUniqueStreamId: newStreamsByUniqueStreamId
      };

      return newState;
    }

    case ADD_STREAM: {
      let newStreamsByUniqueStreamId = Object.assign({}, state.streamsByUniqueStreamId);

      const stream = action.stream;
      newStreamsByUniqueStreamId[stream.name] = action.stream;

      let newState = {
        streamsByUniqueStreamId: newStreamsByUniqueStreamId
      };

      return newState;
    }
  }

  return state;
}

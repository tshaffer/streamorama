import axios from 'axios';

// DO NOT USE ME - I'M OBSOLETE
const serverIPAddress = "10.1.0.58";

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_DECODER = 'ADD_DECODER';
export const SET_DECODERS = 'SET_DECODERS';


// ------------------------------------
// Actions
// ------------------------------------
export function addDecoder(decoder) {

  return {
    type: ADD_DECODER,
    payload: decoder
  };
}

export function setDecoders(decoders) {
  return {
    type: SET_DECODERS,
    decoders
  };
}

// ------------------------------------
// Action Creators
// ------------------------------------
export function setDecoder(decoder) {

  return function (dispatch, _) {

    dispatch(addDecoder(decoder));

    // let serverURL = 'http://localhost:8080/setDecoder';
    let serverURL = "http://" + serverIPAddress + ":8080/setDecoder";

    return axios.get(serverURL, {
      params: { decoderParams: decoder }
    }).then(function(data) {
      console.log('setDecoder - return from server call');
      console.log(data);
    });
  };
}


export function loadDecoders() {

  return function(dispatch, _) {

    // const getDecodersUrl = 'http://localhost:8080/getDecoders';
    // const getDecodersUrl = "http://" + serverIPAddress + ":8080/getDecoders";
    const getDecodersUrl = "/getDecoders";
    axios.get(getDecodersUrl)
      .then(function (decodersResponse) {
        console.log(decodersResponse);

        dispatch(setDecoders(decodersResponse.data));
        console.log('populate store with decoders');
      })
      .catch(function (decodersError) {
        console.log(decodersError);
      });
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  decodersBySerialNumber: {},
};

export default function(state = initialState, action) {

  switch (action.type) {
    case ADD_DECODER: {

      const decoder = action.payload;
      let newDecodersBySerialNumber = Object.assign({}, state.decodersBySerialNumber);

      newDecodersBySerialNumber[decoder.serialNumber] = decoder;
      let newState = {
        decodersBySerialNumber: newDecodersBySerialNumber
      };

      return newState;
    }

    case SET_DECODERS:
      {
        let newState = {
          decodersBySerialNumber: Object.assign({}, action.decoders)
        };
  
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
//   console.log('decoders:');
//   for (var serialNumber in state.decodersBySerialNumber) {
//     if (state.decodersBySerialNumber.hasOwnProperty(serialNumber)) {
//       console.log('serial number:', serialNumber);
//       console.log(state.decodersBySerialNumber[serialNumber]);
//     }
//   }
// }

import axios from 'axios';

const serverIPAddress = "10.1.0.105";

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_ENCODER = 'ADD_ENCODER';
export const SET_ENCODERS = 'SET_ENCODERS';

// ------------------------------------
// Actions
// ------------------------------------
export function setEncoders(encoders) {
  return {
    type: SET_ENCODERS,
    encoders
  };
}

export function loadEncoders() {

  return function(dispatch, _) {

    const getEncodersUrl = 'http://localhost:8080/getEncoders';
    // const getEncodersUrl = "http://" + serverIPAddress + ":8080/getEncoders";

    axios.get(getEncodersUrl)
      .then(function (encodersResponse) {
        console.log(encodersResponse);

        dispatch(setEncoders(encodersResponse.data));
        console.log('populate store with encoders');
      })
      .catch(function (encodersError) {
        console.log(encodersError);
      });
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
  {
    encodersBySerialNumber: {}
  };

export default function(state = initialState, action) {

  switch (action.type) {

    case SET_ENCODERS:
      {
        let newEncodersBySerialNumber = Object.assign({}, action.encoders);
  
        let newState = {
          encodersBySerialNumber: newEncodersBySerialNumber
        };
  
        // dumpState(newState);
  
        return newState;
      }

    case ADD_ENCODER:
      {
        let newEncodersBySerialNumber = Object.assign({}, state.encodersBySerialNumber);
  
        const encoder = action.encoder;
        newEncodersBySerialNumber[encoder.serialNumber] = encoder;
  
        let newState = {
          encodersBySerialNumber: newEncodersBySerialNumber
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
//   console.log('encoders:');
//   for (var serialNumber in state.encodersBySerialNumber) {
//     if (state.encodersBySerialNumber.hasOwnProperty(serialNumber)) {
//       console.log('serial number:', serialNumber);
//       console.log(state.encodersBySerialNumber[serialNumber]);
//     }
//   }
// }

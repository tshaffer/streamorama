import { ADD_ENCODER, SET_ENCODERS } from '../actions/index';

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

// function dumpState(state) {
//
//   console.log("encoders:");
//   for (var serialNumber in state.encodersBySerialNumber) {
//     if (state.encodersBySerialNumber.hasOwnProperty(serialNumber)) {
//       console.log("serial number:", serialNumber);
//       console.log(state.encodersBySerialNumber[serialNumber]);
//     }
//   }

// }

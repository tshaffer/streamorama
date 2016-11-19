import { ADD_ENCODER } from '../actions/index';

const initialState =
    {
        encodersBySerialNumber: {}
    };


export default function(state = initialState, action) {

    switch (action.type) {

        case ADD_ENCODER:
            {
                let newEncodersBySerialNumber = Object.assign({}, state.encodersBySerialNumber);

                const encoder = action.encoder;
                newEncodersBySerialNumber[encoder.serialNumber] = encoder;

                let newState = {
                    encodersBySerialNumber: newEncodersBySerialNumber
                };
                return newState;
            }
    }

    return state;
}

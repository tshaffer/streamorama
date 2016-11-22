import { ADD_DECODER, SET_DECODERS } from '../actions/index';

const initialState =
    {
        decodersBySerialNumber: {}
    };


export default function(state = initialState, action) {

    switch (action.type) {

        case SET_DECODERS:
            {
                let newDecodersBySerialNumber = Object.assign({}, action.decoders);

                let newState = {
                    decodersBySerialNumber: newDecodersBySerialNumber
                };

                // dumpState(newState);

                return newState;
            }

        case ADD_DECODER:
            {
                let newDecodersBySerialNumber = Object.assign({}, state.decodersBySerialNumber);

                const decoder = action.decoder;
                newDecodersBySerialNumber[decoder.serialNumber] = decoder;

                let newState = {
                    decodersBySerialNumber: newDecodersBySerialNumber
                };

                // dumpState(newState);

                return newState;
            }
    }

    return state;
}

function dumpState(state) {

    console.log("decoders:");
    for (var serialNumber in state.decodersBySerialNumber) {
        if (state.decodersBySerialNumber.hasOwnProperty(serialNumber)) {
            console.log("serial number:", serialNumber);
            console.log(state.decodersBySerialNumber[serialNumber]);
        }
    }

}

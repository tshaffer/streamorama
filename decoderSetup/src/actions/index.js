export const ADD_ENCODER = 'ADD_ENCODER';
export const SET_ENCODERS = 'SET_ENCODERS';

export function addEncoder(encoder) {

  return {
    type: ADD_ENCODER,
    encoder
  };
}


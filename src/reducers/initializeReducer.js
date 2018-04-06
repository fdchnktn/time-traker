import { INIT_FIRM_NAME, INIT_LOGGED_USER } from '../actions/types'

const initialState = {
  companyName: '',
  userName: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_FIRM_NAME:
      return Object.assign({}, state,
        {
          companyName: action.payload
        },
      );

    case INIT_LOGGED_USER:
      Object.assign({}, state,
        {
          userName: action.payload
        },
      );
    default:
      return state;
  }
}
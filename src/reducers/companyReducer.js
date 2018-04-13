import { GET_USER_COMPANY } from '../actions/types'

const initialState = {
  company: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_COMPANY:

    break;
  default:
    return state;
  }
}
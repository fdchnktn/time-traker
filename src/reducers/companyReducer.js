import { REQUEST_COMPANY, RESPONSE_COMPANY, FAILURE_RESPONSE_COMPANY } from '../actions/types'

const initialState = {
  company: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_COMPANY:
      return {
        ...state,
        company: {
          key: action.companyKey
        }
      }
    case RESPONSE_COMPANY:
      return {
        ...state,
        name: action.companyName
      }
    case FAILURE_RESPONSE_COMPANY:
      return {
        state
      }
  default:
    return state;
  }
}
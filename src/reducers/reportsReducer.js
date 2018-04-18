import { REQUEST_REPORTS, RESPONSE_REPORTS, FAILURE_RESPONSE_REPORTS } from '../actions/types'

const initialState = {
  data: {
    reports: []
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_REPORTS:
      return state;
    case RESPONSE_REPORTS:
      return {
        ...state,
        data: {
          reports: action.data.reports
        }
      }
    case FAILURE_RESPONSE_REPORTS:
      return state;
  default:
    return state;
  }
}
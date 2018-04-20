import { REQUEST_REPORTS, RESPONSE_REPORTS, FAILURE_RESPONSE_REPORTS, SEND_REPORT_DATE_TO_CALENDAR } from '../actions/types'

const initialState = {
  data: {
    reports: []
  },
  reportDate: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SEND_REPORT_DATE_TO_CALENDAR:
      return {
        ...state,
        reportDate: action.date
      }
    case REQUEST_REPORTS:
      return state
    case RESPONSE_REPORTS:
      return {
        ...state,
        data: {
          reports: action.data.reports
        }
      }
    case FAILURE_RESPONSE_REPORTS:
      return state
  default:
    return state
  }
}
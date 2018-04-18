import { REQUEST_REPORTS, RESPONSE_REPORTS, FAILURE_RESPONSE_REPORTS } from './types'
import { database } from '../store/store'

export const requestReports = userId => ({
  type: REQUEST_REPORTS,
  userId,
})

export const responseReports = (userId, reports)  => ({
  type: RESPONSE_REPORTS,
  userId,
  data : {
    reports
  }
})

export const failureResponseReports = (userId, startDate, endDate)  => ({
  type: FAILURE_RESPONSE_REPORTS,
  userId,
})

const getReports = (userId, startDate, endDate) => dispatch => {
  dispatch(requestReports(userId))
  try {
    getReportsByUserId(userId, startDate, endDate).then(reports => {
      dispatch(responseReports(userId, reports))
    })
  } catch (error) {
    dispatch(failureResponseReports(userId))
  } 
}

const getReportsByUserId = (userId, startDate, endDate) => {
  console.log('userId', userId, 'startDate',  startDate, 'endDate', endDate)
  return database.ref(`reports/${userId}`).orderByChild('date').startAt(startDate).endAt(endDate).once('value')
    .then((snap) => {
      return snap.val();
  })
}

export const getReportsForOneMonth = (userId, startDate, endDate) => {
  return (dispatch) => {
    return dispatch(getReports(userId, startDate, endDate)) 
  };
};

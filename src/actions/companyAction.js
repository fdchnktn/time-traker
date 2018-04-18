import { REQUEST_COMPANY, RESPONSE_COMPANY, FAILURE_RESPONSE_COMPANY } from './types'
import { database } from '../store/store'

export const requestCompany = companyKey => ({
  type: REQUEST_COMPANY,
  companyKey,
  companyName: ''
})

export const responseCompany = (companyName) => ({
  type: RESPONSE_COMPANY,
  companyName
})

export const failureResponseCompany = companyKey => ({
  type: FAILURE_RESPONSE_COMPANY,
  companyKey
})


const getCompanyName = companyKey => dispatch => {
  dispatch(requestCompany(companyKey))
  try {
    getCompanyByKey(companyKey).then(companyName => {
        dispatch(responseCompany(companyName))
    })
  } catch (error) {
    dispatch(failureResponseCompany(companyKey))
  } 
}

const getCompanyByKey = companyKey => {
  return database.ref(`companies/${companyKey}`).once('value')
    .then(snap => {
      return snap.val() && snap.val()['name'];
  });
}

export const getUserCompany = (companyKey) => {
  return (dispatch) => {
    return dispatch(getCompanyName(companyKey)) 
  };
};

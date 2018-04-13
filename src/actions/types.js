export const REQUEST_COMPANY = 'REQUEST_COMPANY';
export const RESPONSE_COMPANY = 'RESPONSE_COMPANY';
export const FAILURE_RESPONSE_COMPANY = 'FAILURE_RESPONSE_COMPANY';
export const GET_USER_COMPANY = 'GET_USER_COMPANY';

export const requestCompany = companyKey => ({
  type: REQUEST_COMPANY,
  companyKey
})

export const responseCompany = (companyKey, companyName) => ({
  type: RESPONSE_COMPANY,
  companyKey,
  companyName
})

export const failureResponseCompany = companyKey => ({
  type: FAILURE_RESPONSE_COMPANY,
  companyKey
})

const getCompanyName = companyKey => dispatch => {
  dispatch(requestCompany(companyKey))
}

export default getUserCompany = companyKey => dispatch => {
  return dispatch() 
}



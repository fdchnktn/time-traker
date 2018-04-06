import cookie from 'react-cookies'
import { INIT_FIRM_NAME, INIT_LOGGED_USER } from './types'

const initializeCompanyNameActionObject = (companyName) => {
  return {
    type: INIT_FIRM_NAME,
    payload: { companyName },
  };
};

const initializeLoggedUserActionObject = (userName) => {
  return {
    type: INIT_LOGGED_USER,
    payload: { userName },
  }
}

export const initializeCompanyName = () => dispatch => {
  const getCompanyName = new Promise((resolve, reject) => {
    const companyName = cookie.load('CompanyName');   
    companyName
      ? resolve(companyName)
      : reject();
    });

  getCompanyName.then(companyName => {
    dispatch(initializeCompanyNameActionObject(companyName));
  }).catch(err => {
    console.log(err);
  });
};

export const initializeLoggedUser = () => dispatch => {
  new Promise((resolve, reject) => {
    const userName = cookie.load('userName');

    userName 
      ? resolve(userName)
      : reject();
  }).then(userName => {
      dispatch(initializeLoggedUserActionObject(userName));
  })
}
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import companyReducer from '../reducers/companyReducer'
import reportsReducer from '../reducers/reportsReducer'

export default combineReducers({
  reports: reportsReducer,
  company: companyReducer,
  firebase: firebaseReducer,
})
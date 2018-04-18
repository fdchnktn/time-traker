import { applyMiddleware, createStore, compose } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import firebase from 'firebase'
import rootReducer from '../reducers'
import { firebaseConfig } from '../firebaseConfig'


const initialState = {};

const config = {
  userProfile: 'users',
  //attachAuthIsReady: true,
  profileFactory: (userData, profileData) => {
    return {
      email: userData.email,
      userName: profileData.userName,
      company: profileData.companyKey
    }
  }
};

firebase.initializeApp(firebaseConfig);

const middleware = [ thunk.withExtraArgument(getFirebase) ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reactReduxFirebase(firebase, config),
  )
);

export default store;
export const database = firebase.database();

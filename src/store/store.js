import { applyMiddleware, createStore, compose } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import firebase from 'firebase'
import rootReducer from '../reducers'
import { firebaseConfig } from '../firebaseConfig'

const initialState = {};

const config = {
  userProfile: 'users',
  attachAuthIsReady: true,
  profileFactory: (userData, profileData) => {
    return {
      email: userData.email,
      userName: profileData.userName,
      company: profileData.companyKey
    }
  }
};

firebase.initializeApp(firebaseConfig);

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      thunk.withExtraArgument(getFirebase)
    ),
    reactReduxFirebase(firebase, config),
  )
);

export default store;

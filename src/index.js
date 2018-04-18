import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import './index.css';
import './styles/core.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

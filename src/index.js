import React from "react";
import ReactDOM from "react-dom";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { Provider } from 'react-redux'
import store from './redux'

import "./index.css";
import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiPickersUtilsProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

serviceWorker.register({
  onUpdate: r => {
    console.error("update da fare!");
  }
});

//serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import LogPage from "../Log";
import ExerciseLogPage from "../ExeciseLog";

import { AuthUserContext } from "../Session";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <AuthUserContext.Consumer>
    {(authUser) =>
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path={ROUTES.LANDING} render={(props) => (
            <LandingPage {...props} authUid={authUser && authUser.uid} />
          )} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.LOG} render={(props) => (
            <LogPage {...props} authUid={authUser && authUser.uid} />
          )} />
          <Route path={ROUTES.EXERCISELOG} render={(props) => (
            <ExerciseLogPage {...props} authUid={authUser && authUser.uid} />
          )} />
        </div>
      </Router>
    }
  </AuthUserContext.Consumer>
);

export default withAuthentication(App);

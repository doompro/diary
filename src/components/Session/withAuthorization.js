import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const condition = (authUser) => authUser != null;

/* EXAMPLE AUTH CONDITIONS 
// short version
const condition = authUser => !!authUser;
// role-based authorization
const condition = authUser => authUser.role === 'ADMIN';
// permission-based authorization
const condition = authUser => authUser.permissions.canEditAccount;
*/

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;

export { condition };

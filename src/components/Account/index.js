import React from "react";

import { AuthUserContext, withAuthorization, AuthCondition } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default withAuthorization(AuthCondition)(AccountPage);

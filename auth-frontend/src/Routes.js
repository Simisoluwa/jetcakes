import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import ProfileUpdatePage from "views/ProfilePage/ProfileUpdatePage";
import LoginPage from "views/LoginPage/LoginPage.js";
import SigninPage from "views/SigninPage/SigninPage.js"
import Activate from "views/ActivationPage/Activate";
import ForgotPassword from "views/ForgotPasswordPage/ForgotPassword";
import ResetPassword from "views/ResetPasswordPage/ResetPassword";
import PrivateRoute from 'views/PrivateRoute';
//import AdminRoute from 'views/AdminRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={LoginPage} />
        <Route path="/login" component={SigninPage} />
        <Route path="/auth/password/forgot" component={ForgotPassword} />
        <Route path="/auth/password/reset/:token" component={ResetPassword} />
        <Route path="/auth/activate/:token" component={Activate} />
        <Route path="/" exact component={Components} />
        <PrivateRoute path="/landing" component={LandingPage} />
        <PrivateRoute path="/private" component={ProfilePage} />
        <PrivateRoute path="/profile" component={ProfileUpdatePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import PreloaderWrapper from "@components/PreloaderWrapper";
import StageRoute from "./StageRoute";
import UserRoute from "./UserRoute";
import StageRedirect from "./StageRedirect";

const App = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
    <PreloaderWrapper>
      <Router>
        <Switch>
          <Route path="/user/create" component={SignUpPage} />
          <Route path="/user/login" component={LoginPage} />
          <StageRoute
            stage={0}
            path="/user/validate"
            component={ValidateEmailPage}
          />
          <Route path="/user/email-link" component={ValidateEmailById} />
          <StageRoute
            stage={[1, 2]}
            path="/hacker-form"
            component={AttendeeForm}
          />
          <UserRoute path="/dashboard" component={Dashboard} />
          <StageRedirect from="/" />
        </Switch>
      </Router>
    </PreloaderWrapper>
  </SnackbarProvider>
);

export default App;

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { SnackbarProvider } from "notistack";
import PreloaderWrapper from "@components/PreloaderWrapper";
import StageRoute from "./StageRoute";
import StageRedirect from "./StageRedirect";
import { SignUpPage } from "@pages/SignUp";
import { LoginPage } from "@pages/Login";
import MainPage from "@pages/MainPage";
import MainElement from "./MainElement";
import Logout from "./Logout";
import { EmailPage } from "@pages/Email";
import EmailRedirect from "./EmailRedirect";
import ContestsPage from "@pages/ContestsPage";
import { ContestPage } from "@pages/Contest";
import { ChangePasswordPage } from "@pages/ChangePasswordPage";
import { PlayHistoryPage } from "@pages/PlayHistory";

const App = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
    <PreloaderWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<MainElement />}>
            <Route index element={<MainPage />} />
            <Route path="contest" element={<ContestsPage />} />
            <Route path="contest/:id" element={<ContestPage />} />
            <Route path="history" element={<PlayHistoryPage />} />
          </Route>
          <Route
            element={
              <StageRoute stage={-1}>
                <Outlet />
              </StageRoute>
            }
          >
            <Route exact path="/sign_up" element={<SignUpPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/email" element={<EmailPage />} />
            <Route
              exact
              path="/change-password"
              element={<ChangePasswordPage />}
            />
          </Route>
          <Route exact path="/email-redirect" element={<EmailRedirect />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route from="*" element={<StageRedirect />} />
        </Routes>
      </Router>
    </PreloaderWrapper>
  </SnackbarProvider>
);

export default App;

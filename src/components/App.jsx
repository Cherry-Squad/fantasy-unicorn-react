import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import PreloaderWrapper from "@components/PreloaderWrapper";
import StageRoute from "./StageRoute";
import StageRedirect from "./StageRedirect";
import { SignUpPage } from "@pages/SignUp";
import { LoginPage } from "@pages/Login";
import MainPage from "@pages/MainPage";

const App = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
    <PreloaderWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<StageRoute stage={0} />}>
            <Route index element={<MainPage />} />
          </Route>
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route from="*" element={<StageRedirect />} />
        </Routes>
      </Router>
    </PreloaderWrapper>
  </SnackbarProvider>
);

export default App;

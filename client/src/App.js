import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./components/Signup";
import Memories from "./pages/Memories";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import UpdatePassword from "./components/UpdatePassword";
import UpdatePasswordOnProfile from "./components/ResetPassword";
import UpdateEmail from "./components/UpdateEmail/UpdateEmail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Memories />} />
        <Route exact path="/dashboard" element={<Memories />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/memories" element={<Memories />} />
        <Route exact path="/verify-otp" element={<VerifyOtp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forget-pass" element={<ForgetPassword />} />
        <Route exact path="/update-pass" element={<UpdatePassword />} />
        <Route
          exact
          path="/reset-password"
          element={<UpdatePasswordOnProfile />}
        />
        <Route exact path="/reset-email" element={<UpdateEmail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import useStyles from "./styles";
import UseInputhook from "../../hooks/useInputHooks";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  SIGNUP_API_REQUEST,
  SIGNUP_SUCCESS_RESPONSE,
  SIGNUP_FAILURE_RESPONSE,
} from "../../constants/actionTypes";
// import apiClient from "../../utils/request";
import { apiClient } from "../../utils/request";
import { SimpleSpinner } from "../Loading";
import ErrorMessageAlert from "../Alert";
import memories from "../../images/memories.png";
import "./style.scss";

const Signup = () => {
  const classes = useStyles();

  const [firstname, bindFirstName, resetFirstName] = UseInputhook("");
  const [lastname, bindLastName, resetLastName] = UseInputhook("");
  const [email, bindEmail, resetEmail] = UseInputhook("");
  const [password, bindPassword, resetPassword] = UseInputhook("");
  const [confirmPassword, bindConfirmPassword, resetCondirmPassword] =
    UseInputhook("");
  const [validatedObject, setValidatedObject] = useState({
    isWarning: false,
    message: "",
  });

  const sigupState = useSelector((state) => state.signupReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let validateRequest = () => {
    const re =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,}$/;

    const passwordValidation = re.test(String(bindPassword.value));

    const re_email =
      //eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidation = re_email.test(String(bindEmail.value));

    if (firstname === "" || firstname === null || firstname === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "First Name is required",
      });
    } else if (lastname === "" || lastname === null || lastname === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Last Name is required",
      });
    } else if (email === "" || email === null || email === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Email is required",
      });
    } else if (!emailValidation) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Please provide valid email",
      });
    } else if (password === "" || password === null || password === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Password is required!",
      });
    } else if (!passwordValidation) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message:
          "Please choose a more secure password. password must be greater than 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
      });
    } else if (password !== confirmPassword) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Password and confirm password not matched!",
      });
    }

    return true;
  };

  const resetState = () => {
    resetFirstName();
    resetLastName();
    resetEmail();
    resetPassword();
    resetCondirmPassword();
  };

  let signup = async (e) => {
    e.preventDefault();

    let validate = validateRequest();

    if (validate) {
      setValidatedObject({
        ...validatedObject,
        isWarning: false,
        message: "",
      });

      let data;

      data = {
        firstname,
        lastname,
        email,
        password,
      };

      try {
        dispatch({ type: SIGNUP_API_REQUEST, payload: {} });

        const response = await apiClient
          .post("/user/register", data)
          .then((response) => {
            return response?.config?.data;
          });
        // console.log("response_signup:::", response);
        dispatch({ type: SIGNUP_SUCCESS_RESPONSE, payload: response });

        localStorage.setItem("email", email);

        navigate("/verify-otp");

        resetState();
      } catch (err) {
        dispatch({
          type: SIGNUP_FAILURE_RESPONSE,
          payload: err?.response?.data?.error,
        });
        setValidatedObject({
          ...validatedObject,
          isWarning: true,
          message: err?.response?.data?.error,
        });
      }
    }
  };

  return (
    <div className="d-flex w-100 flex-wrap flex-md-nowrap">
      <div className={classes.leftLoginItem}>
        <div className="d-flex align-items-center left-login-item--wrapper">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="">
                <img
                  className={classes.loginLogo}
                  src={memories}
                  alt="memories"
                />
                <Typography variant="h4">
                  JOIN WITH US GET YOUR FREE ACCOUNT
                </Typography>
                <Typography variant="subtitle1">
                  You can create modified & also delete your beautiful moments
                </Typography>
                <Button
                  className="btn btn-primary px-4"
                  type="submit"
                  variant="contained"
                  onClick={() => navigate("/login")}
                  color="primary">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.rightLoginItem}>
        <div className="d-flex align-items-center right-login-item--wrapper">
          <div className="row justify-content-center w-100">
            <div className="col-md-8">
              <Typography variant="h3">Signup</Typography>
              <Typography variant="h6" className="mt-1">
                Enter your details to create your account:
              </Typography>
              <form onSubmit={signup} className="row g-3 pt-4">
                {validatedObject.isWarning && (
                  <ErrorMessageAlert
                    message={validatedObject.message}></ErrorMessageAlert>
                )}

                <div className="col-md-12">
                  {/* <label htmlFor="firstname" className="form-label">
                    First Name
                  </label> */}
                  <TextField
                    placeholder="Enter First Name"
                    name="firstname"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    className="form-control"
                    {...bindFirstName}
                  />
                </div>
                <div className="col-md-12">
                  {/* <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label> */}
                  <TextField
                    placeholder="Enter Last Name"
                    name="lastname"
                    className="form-control"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    {...bindLastName}
                  />
                </div>
                <div className="col-md-12  ">
                  {/* <label htmlFor="email" className="form-label">
                    Email
                  </label> */}
                  <TextField
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...bindEmail}
                  />
                </div>
                <div className="col-md-12 position-relative">
                  {/* <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label> */}
                  <TextField
                    type={"password"}
                    placeholder="Enter password"
                    name="password"
                    className="form-control"
                    variant="outlined"
                    label="Password"
                    fullWidth
                    {...bindPassword}
                  />
                  {/* <span
                    style={{ top: 39, right: 20, cursor: "pointer" }}
                    className="p-viewer position-absolute"
                    onClick={hideAndShowPassword}>
                    <i aria-hidden="true"></i>
                  </span> */}
                </div>
                <div className="col-md-12 position-relative">
                  {/* <label htmlFor="cpassword" className="form-label">
                    Confirm Password
                  </label> */}
                  <TextField
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    className="form-control"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    {...bindConfirmPassword}
                  />
                  {/* <span
                    style={{ top: 39, right: 20, cursor: "pointer" }}
                    className="p-viewer position-absolute"
                    onClick={hideAndShowPasswordConfirmPassword}>
                    <i aria-hidden="true"></i>
                  </span> */}
                </div>

                <div className="col-12">
                  <div className="d-flex w-100 justify-md-content-end">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      className="btn btn-primary px-4 me-4">
                      {sigupState.loading === true ? (
                        <SimpleSpinner></SimpleSpinner>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                    <Button
                      type="reset"
                      color="primary"
                      variant="outlined"
                      size="medium"
                      fullWidth
                      onClick={resetState}>
                      clear
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signup: state.signupReducer,
});

export default connect(mapStateToProps, {})(Signup);

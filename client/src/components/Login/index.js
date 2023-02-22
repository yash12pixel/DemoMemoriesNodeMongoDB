import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseInputHook from "../../hooks/useInputHooks";
import { connect, useDispatch } from "react-redux";
import { apiClient } from "../../utils/request";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "../../reducers/login";
import { ToastContainer } from "react-toastify";
import ErrorMessageAlert from "../Alert";
import { SimpleSpinner } from "../Loading";
import { TextField, Button, Typography } from "@mui/material";

import InfoModal from "../ToastModal/InfoModal";
import useStyles from "../Signup/styles";
import "../Signup/style.scss";
import memories from "../../images/memories.png";

const Login = () => {
  const classes = useStyles();

  const [validatedObject, setValidatedObject] = useState({
    isWarning: false,
    message: "",
  });
  const [loginApiLoadingObject, setLoginApiLoadingObject] = useState({
    isLoading: false,
    isDisable: false,
    isVerifyLoading: false,
    isVerifyDisable: false,
  });
  const [showModalObject, setShowModalObject] = useState({
    showInfoModal: false,
    showSuccessModal: false,
    ShowWarningModal: false,
    msg: "",
  });

  const [userEmail, bindEmail, resetEmail] = UseInputHook("");
  const [password, bindPassword, resetPassword] = UseInputHook("");

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
    if (userEmail === "" || userEmail === null || userEmail === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Email required!",
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
        message: "Password required!",
      });
    } else if (!passwordValidation) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message:
          "Password must be greater than 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
      });
    }
    return true;
  };

  let onCloseInfoModal = () => {
    setShowModalObject({
      ...showModalObject,
      showInfoModal: false,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });
    navigate("/verify-otp");
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    let validate = validateRequest();

    if (validate) {
      setValidatedObject({
        ...validatedObject,
        isWarning: false,
        message: "",
      });
      setLoginApiLoadingObject({
        ...loginApiLoadingObject,
        isLoading: true,
        isDisable: true,
      });

      try {
        const { data } = await apiClient.post("/user/login", {
          email: userEmail,
          password: password,
        });
        // console.log("data:::", data);

        setLoginApiLoadingObject({
          ...loginApiLoadingObject,
          isLoading: false,
          isDisable: false,
        });
        if (data?.data?.accountVerified === false) {
          //   setAccountVerified(false);
          localStorage.setItem("email", data.data.email);

          setShowModalObject({
            showInfoModal: true,
            showSuccessModal: false,
            ShowWarningModal: false,
            msg: data.message,
          });
        }

        const accessToken = data.data.accessToken;

        localStorage.setItem("token", accessToken);

        const decodedUser = jwtDecode(accessToken);

        // console.log("login::", decodedUser);

        dispatch({ type: "SET_CURRENT_USER", payload: decodedUser });
        resetEmail();
        resetPassword();
        navigate("/dashboard");
      } catch (err) {
        setLoginApiLoadingObject({
          ...loginApiLoadingObject,
          isLoading: false,
          isDisable: false,
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
    <>
      <div className="d-flex w-100 flex-wrap flex-md-nowrap">
        <div className={classes.leftLoginItem}>
          <div className="d-flex align-items-center left-login-item--wrapper">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="">
                  <img
                    className={classes.loginLogo}
                    src={memories}
                    alt="memories"
                  />
                  <Typography variant="h4">
                    JOIN WITH US GET YOUR FREE ACCOUNT{" "}
                  </Typography>
                  <Typography variant="subtitle2" className="mb-2">
                    You can create modified & also delete your beautiful moments
                  </Typography>
                  {/* <Link to="/signup" className="btn btn-primary">
                    Register
                  </Link> */}
                  <Button
                    type="submit"
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={() => navigate("/signup")}>
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.rightLoginItem}>
          <div className="d-flex align-items-center right-login-item--wrapper">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <Typography variant="h4" className="mb-4">
                  Login To Your Account{" "}
                </Typography>
                <form className="row g-3" onSubmit={onLoginSubmit}>
                  <div className="col-md-12">
                    {/* <label htmlFor="email" className="form-label">
                      Email
                    </label> */}
                    <TextField
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      name="email"
                      {...bindEmail}
                    />
                  </div>
                  <div className="col-md-12  position-relative">
                    {/* <label htmlFor="password" className="form-label">
                      Password
                    </label> */}
                    <TextField
                      type="password"
                      className="form-control"
                      id="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      name="password"
                      placeholder="Enter password"
                      autoComplete="off"
                      {...bindPassword}
                    />
                  </div>

                  {validatedObject.isWarning && (
                    <ErrorMessageAlert
                      message={validatedObject.message}></ErrorMessageAlert>
                  )}

                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input
                          style={{ display: "none" }}
                          className="form-check-input"
                          id="gridCheck"
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          className="btn btn-primary px-4">
                          {loginApiLoadingObject.isLoading === true ? (
                            <SimpleSpinner></SimpleSpinner>
                          ) : (
                            " Sign in"
                          )}
                        </Button>
                      </div>
                      <div>
                        <Link className="nav-link text-info" to="/forget-pass">
                          Forgot Password ?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    {/* <Button
                      type="submit"
                      variant="contained"
                      className="btn btn-primary px-4">
                      {loginApiLoadingObject.isLoading === true ? (
                        <SimpleSpinner></SimpleSpinner>
                      ) : (
                        " Sign in"
                      )}
                    </Button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <InfoModal
          showModal={showModalObject.showInfoModal}
          btnText="Verify-Account"
          msg={showModalObject.msg}
          onCloseModal={() => {
            onCloseInfoModal();
          }}></InfoModal>
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.loginReducer,
});
export default connect(mapStateToProps, { setCurrentUser })(Login);

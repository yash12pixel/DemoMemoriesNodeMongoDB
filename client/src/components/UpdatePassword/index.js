import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "../Signup/styles";
import "../Signup/style.scss";
import memories from "../../images/memories.png";
import UseInputHook from "../../hooks/useInputHooks";
import ErrorMessageAlert from "../Alert";
import { SimpleSpinner } from "../Loading";
import SuccessModal from "../ToastModal/SuccessModal";
import { apiClient } from "../../utils/request";
import { TextField, Button, Typography } from "@mui/material";
import {
  UPDATE_PASSWORD_API_REQUEST,
  UPDATE_PASSWORD_SUCCESS_RESPONSE,
  UPDATE_PASSWORD_FAILURE_RESPONSE,
} from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";

const UpdatePassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updatePasswordState = useSelector(
    (state) => state.updatePasswordReducer
  );
  const [otpCode, bindOtpCode, resetOtpCode] = UseInputHook("");
  const [password, bindPassword, resetPassword] = UseInputHook("");
  const [confirmPassword, bindConfirmPassword, resetCondirmPassword] =
    UseInputHook("");
  const [validatedObject, setValidatedObject] = useState({
    isWarning: false,
    message: "",
  });
  // const [loadingObject, setLoadingObject] = useState({
  //   isLoading: false,
  //   isDisable: false,
  // });
  const [showModalObject, setShowModalObject] = useState({
    showSuccessModal: false,
    ShowWarningModal: false,
    msg: "",
  });

  let onCloseErrorModal = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });
    navigate("/login");
  };

  let validateRequest = () => {
    if (otpCode === "" || otpCode === null || otpCode === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Otp Code required!",
      });
    } else if (otpCode.length !== 6) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Please enter the 6 digit OTP code!",
      });
    } else if (password === "" || password === null || password === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Password is required!",
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
    resetOtpCode();
    resetPassword();
    resetCondirmPassword();
  };

  const updatePass = async (e) => {
    e.preventDefault();
    let validate = validateRequest();
    if (validate) {
      let data = { otpCode, password };
      setValidatedObject({
        ...validatedObject,
        isWarning: false,
        message: "",
      });
      // setLoadingObject({
      //   ...loadingObject,
      //   isLoading: true,
      //   isDisable: true,
      // });

      try {
        dispatch({ type: UPDATE_PASSWORD_API_REQUEST, payload: {} });

        // console.log("data::", data);
        const response = await apiClient
          .post("user/updatePassword", data)
          .then((response) => {
            return response;
          });
        // console.log("response_updatePAss::", response);
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS_RESPONSE,
          payload: response.data,
        });

        // console.log("res::", res);
        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });
        setShowModalObject({
          ...showModalObject,
          showSuccessModal: true,
          ShowWarningModal: false,
          msg: "Password updated successfully",
          redirect: true,
        });
        resetState();
      } catch (err) {
        dispatch({
          type: UPDATE_PASSWORD_FAILURE_RESPONSE,
          payload: err?.response?.data?.error,
        });

        // console.log("err", err);
        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });
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
            <div className="col-md-8">
              <div className="">
                <img
                  className={classes.loginLogo}
                  alt="memories"
                  src={memories}
                />
                <Typography variant="h3">
                  JOIN OUR SHYPN COMMUNITY GET FREE ACCOUNT{" "}
                </Typography>
                <Typography className="mb-2" variant="subtitle1">
                  We specialize in transporting exotics, moving over 25 million
                  dollars worth of vehicles per month.
                </Typography>
                {/* <Button
                  style={{
                    pointerEvents: updatePasswordState.disable && "none",
                  }}
                  onClick={() => navigate("/login")}
                  variant="contained"
                  className="btn btn-primary px-4">
                  Login
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.rightLoginItem}>
        <div className="d-flex align-items-center right-login-item--wrapper">
          <div className="row justify-content-center w-100">
            <div className="col-md-8">
              <Typography className="mb-2" variant="h3">
                Update Password{" "}
              </Typography>
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  <Typography variant="subtitle1" style={{ fontSize: "16px" }}>
                    You will receive an OTP code at your email in a few minutes.
                    <br></br>{" "}
                    <b>
                      Please enter that code in the below box to update the
                      password.
                    </b>
                    <br></br>NOTE: Check your spam folder if it doesn’t appear
                    within a few minutes. If you lose OTP or OTP expires then
                    repeat the same process go to{" "}
                    <Link to="/login">
                      <b style={{ color: "#0F5132" }}>login</b>
                    </Link>{" "}
                    and click on forgot password.
                  </Typography>
                </div>
              </div>
              <form onSubmit={updatePass} className="row g-3 pt-4">
                <div className="col-md-12">
                  {/* <label for="usename" className="form-label">
                    Email OTP Code
                  </label> */}
                  <TextField
                    {...bindOtpCode}
                    name="Email OTP Code"
                    label="Email OTP code"
                    variant="outlined"
                    fullWidth
                    placeholder="Please enter 6 digit OTP code"
                    type="text"
                    className="form-control"
                    id="usename"
                  />
                </div>

                <div className="col-md-12 position-relative">
                  {/* <label for="usename" className="form-label">
                    Password
                  </label> */}
                  <TextField
                    {...bindPassword}
                    name="Password"
                    placeholder="Enter password"
                    type="password"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    className="form-control"
                    id="usename"
                  />
                </div>
                <div className="col-md-12 position-relative">
                  {/* <label for="inputPassword4" className="form-label">
                    Confirm Password
                  </label> */}
                  <TextField
                    {...bindConfirmPassword}
                    name="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    variant="outlined"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>

                {validatedObject.isWarning && (
                  <ErrorMessageAlert
                    message={validatedObject.message}></ErrorMessageAlert>
                )}
                <div className="col-md-12">
                  <div className="form-check">
                    {/* <input isChecked={false} onChange={(e) => { alert(e.target.value) }} className="form-check-input" type="checkbox" id="gridCheck" />
                                            <label className="form-check-label" for="gridCheck">
                                                I Agree the terms and conditions .
                                            </label> */}
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex w-100 justify-md-content-end">
                    <Button
                      disabled={updatePasswordState.disable}
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      color="primary"
                      className="btn btn-primary px-4 me-4">
                      {updatePasswordState.loading === true ? (
                        <SimpleSpinner></SimpleSpinner>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                    <Button
                      style={{
                        pointerEvents: updatePasswordState.disable && "none",
                      }}
                      onClick={() => navigate("/login")}
                      color="primary"
                      variant="outlined"
                      size="medium"
                      fullWidth
                      className="btn btn-outline-primary px-4">
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        showModal={showModalObject.showSuccessModal}
        btnText="Go To Login"
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModal();
        }}></SuccessModal>
    </div>
  );
};

export default UpdatePassword;

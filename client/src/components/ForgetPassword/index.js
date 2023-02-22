import React, { useState } from "react";
import memories from "../../images/memories.png";
import { useNavigate } from "react-router-dom";
import useStyles from "../Signup/styles";
import "../Signup/style.scss";
import UseInputHook from "../../hooks/useInputHooks";
import ErrorMessageAlert from "../Alert";
import { SimpleSpinner } from "../Loading";
import { apiClient } from "../../utils/request";
import WarningModal from "../ToastModal/WarningModal";
import SuccessModal from "../ToastModal/SuccessModal";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, Typography } from "@mui/material";
import {
  SEND_OTP_API_REQUEST,
  SEND_OTP_SUCCESS_RESPONSE,
  SEND_OTP_FAILURE_RESPONSE,
} from "../../constants/actionTypes";

const ForgetPassword = (props) => {
  const classes = useStyles();
  const sendOtpState = useSelector((state) => state.sendOtpReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, bindEmail, resetEmail] = UseInputHook("");
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

    // redirect && props.history.push("/login");
  };

  let onCloseErrorModalSuccess = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });
    navigate("/update-pass");
    // redirect && props.history.push("/login");
  };

  let validateRequest = () => {
    if (email === "" || email === null || email === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Email required!",
      });
    }
    return true;
  };

  const onForgotCredentailSubmit = async (e) => {
    e.preventDefault();
    let validate = validateRequest();

    if (validate) {
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
        dispatch({ type: SEND_OTP_API_REQUEST, payload: {} });

        const response = await apiClient.post("user/forgotCredential", {
          email: email,
        });
        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });
        resetEmail();
        // console.log("response_forgetpass:::", response);
        dispatch({ type: SEND_OTP_SUCCESS_RESPONSE, payload: response.data });

        setShowModalObject({
          ...setShowModalObject,
          showSuccessModal: true,
          ShowWarningModal: false,
          msg: "OTP code sent again to your email",
        });
      } catch (err) {
        // console.log("err::", err);
        dispatch({
          type: SEND_OTP_FAILURE_RESPONSE,
          payload: err?.response?.data?.error,
        });

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
                  alt="Memories"
                  src={memories}
                />
                <Typography variant="h3">
                  JOIN OUR SHYPN COMMUNITY GET FREE ACCOUNT{" "}
                </Typography>
                <Typography className="mb-2" variant="subtitle1">
                  We specialize in transporting exotics, moving over 25 million
                  dollars worth of vehicles per month.{" "}
                </Typography>
                <Button
                  style={{ pointerEvents: sendOtpState.disable && "none" }}
                  onClick={() => navigate("/login")}
                  variant="contained"
                  className="btn btn-primary">
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
              <Typography variant="h3">Forgotten Password ? </Typography>
              <Typography variant="h6">
                Enter your email to reset your password:{" "}
              </Typography>
              <form
                onSubmit={onForgotCredentailSubmit}
                className="row g-3 pt-4">
                <div className="col-md-12">
                  {/* <label for="inputEmail4" className="form-label">
                    Email
                  </label> */}
                  <TextField
                    {...bindEmail}
                    placeholder="Please enter email address to search for your account."
                    type="email"
                    label="Email"
                    className="form-control"
                    id="inputEmail4"
                    name="Email"
                    variant="outlined"
                    fullWidth
                  />
                </div>

                {validatedObject.isWarning && (
                  <ErrorMessageAlert
                    message={validatedObject.message}></ErrorMessageAlert>
                )}

                <div className="col-12">
                  <div className="d-flex w-100">
                    <Button
                      disabled={sendOtpState.disable}
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      className="btn btn-primary px-4 me-4">
                      {sendOtpState.loading === true ? (
                        <SimpleSpinner></SimpleSpinner>
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                    <Button
                      style={{
                        pointerEvents: sendOtpState.disable && "none",
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
        btnText="OK"
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModalSuccess();
        }}></SuccessModal>

      <WarningModal
        showModal={showModalObject.ShowWarningModal}
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModal();
        }}></WarningModal>
    </div>
  );
};

export default ForgetPassword;

import React, { useState } from "react";
import memories from "../../images/memories.png";
import useStyles from "../Signup/styles";
import "../Signup/style.scss";
import { TextField, Button, Typography } from "@mui/material";
import UseInputHook from "../../hooks/useInputHooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastMessageFailure } from "../../utils/toastMessages";
import { apiClient } from "../../utils/request";
import ErrorMessageAlert from "../Alert";
import { SimpleSpinner } from "../Loading";
import SuccessModal from "../ToastModal/SuccessModal";
import WarningModal from "../ToastModal/WarningModal";
import InfoModal from "../ToastModal/InfoModal";
import {
  SEND_OTP_API_REQUEST,
  SEND_OTP_SUCCESS_RESPONSE,
  SEND_OTP_FAILURE_RESPONSE,
  VERIFY_OTP_API_REQUEST,
  VERIFY_OTP_SUCCESS_RESPONSE,
  VERIFY_OTP_FAILURE_RESPONSE,
  RESEND_OTP_API_REQUEST,
  RESEND_OTP_SUCCESS_RESPONSE,
  RESEND_OTP_FAILURE_RESPONSE,
} from "../../constants/actionTypes";

const UpdateEmail = () => {
  const classes = useStyles();
  const sendEmailState = useSelector((state) => state.sendOtpReducer);
  const verifyOtpState = useSelector((state) => state.verifyOtpReducer);
  const resendOtpState = useSelector((state) => state.resendOtpReducer);
  const [email, bindEmail, resetEmail] = UseInputHook("");
  const [otpCode, bindOtpCode, resetOtpCode] = UseInputHook("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validatedObject, setValidatedObject] = useState({
    isWarning: false,
    message: "",
  });
  // const [loadingObject, setLoadingObject] = useState({
  //   isLoading: false,
  //   isDisable: false,
  // });
  // const [resetLoadingObject, setResetLoadingObject] = useState({
  //   isResendLoading: false,
  //   isResendDisable: false,
  // });
  const [showModalObject, setShowModalObject] = useState({
    showSuccessModal: false,
    ShowWarningModal: false,
    showInfoModal: false,
    msg: "",
  });

  let onCloseErrorModal = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      showInfoModal: false,
      msg: "",
    });
  };

  let onCloseErrorModalSuccess = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      showInfoModal: false,
      msg: "",
    });
    navigate("/login");
  };

  let validateEmailRequest = () => {
    if (email === "" || email === null || email === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Email required!",
      });
    }
    return true;
  };

  let validateOtpVerificationRequest = () => {
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
    }

    return true;
  };
  const resetState = () => {
    resetEmail();
    resetOtpCode();
  };

  let updateEmail = async (e) => {
    e.preventDefault();

    let validate = validateEmailRequest();
    if (validate) {
      let data = { email };
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

        const response = await apiClient
          .patch("user/updateEmail", data)
          .then((response) => {
            //   console.log("response::", response.status);
            if (response) {
              const data = response.data.data;
              localStorage.setItem("email", data.email);
              setShowOtpVerification(true);
            }
            return response;
          });
        dispatch({ type: SEND_OTP_SUCCESS_RESPONSE, payload: response.data });

        // if (response.status === 200) {
        //   localStorage.setItem("email", response.data.data.email);
        // }
        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });
        // setShowModalObject({
        //   ...showModalObject,
        //   showSuccessModal: true,
        //   ShowWarningModal: false,
        //   msg: "OTP Sent successfully",
        // });
      } catch (err) {
        dispatch({
          type: SEND_OTP_FAILURE_RESPONSE,
          payload: err?.response?.data?.error,
        });

        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });

        if (err?.response?.status === 401) {
          toastMessageFailure("Your session is expired");
          localStorage.removeItem("token");
          dispatch({ type: "SET_CURRENT_USER", payload: {} });
          //   history.push("/login");
          navigate("/login");
        } else {
          setValidatedObject({
            ...validatedObject,
            isWarning: true,
            message: err?.response?.data?.error,
          });
        }
      }
    }
  };

  let submitOtp = async (e) => {
    e.preventDefault();
    let validate = validateOtpVerificationRequest();
    if (validate) {
      let data = {
        otpCode: otpCode,
        authValue: email,
      };
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
        dispatch({ type: VERIFY_OTP_API_REQUEST, payload: {} });

        const response = await apiClient
          .patch("user/verfiyOtpProfile", data)
          .then((response) => {
            // console.log("res verify::", response);
            if (response.data.Success === true) {
              localStorage.removeItem("email");
            }
            return response;
          });
        // console.log("response_submit::", response);
        dispatch({ type: VERIFY_OTP_SUCCESS_RESPONSE, payload: response.data });

        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });
        setShowOtpVerification(false);
        resetState();
        setShowModalObject({
          ...showModalObject,
          showSuccessModal: true,
          ShowWarningModal: false,
          showInfoModal: false,
          msg: "Email update successfully.",
        });
      } catch (err) {
        dispatch({
          type: VERIFY_OTP_FAILURE_RESPONSE,
          payload: err?.response?.data?.error,
        });

        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });

        if (err?.response?.status === 401) {
          toastMessageFailure("Your session is expired");
          localStorage.removeItem("token");
          dispatch({ type: "SET_CURRENT_USER", payload: {} });
          //   history.push("/login");
          navigate("/login");
        } else {
          setValidatedObject({
            ...validatedObject,
            isWarning: true,
            message: err?.response?.data?.error,
          });
        }
      }
    }
  };

  let sendOtpAgain = async (e) => {
    e.preventDefault();
    let resendEmail = localStorage.getItem("email");
    setValidatedObject({ ...validatedObject, isWarning: false, message: "" });
    // setResetLoadingObject({
    //   ...resetLoadingObject,
    //   isResendLoading: true,
    //   isResendDisable: true,
    // });

    try {
      dispatch({ type: RESEND_OTP_API_REQUEST, payload: {} });

      const response = await apiClient
        .patch("user/resendOtpCodeProfile", { authValue: resendEmail })
        .then((response) => {
          // console.log("resend res::", response);
          return response;
        });
      dispatch({ type: RESEND_OTP_SUCCESS_RESPONSE, payload: response.data });

      // setResetLoadingObject({
      //   ...resetLoadingObject,
      //   isResendLoading: false,
      //   isResendDisable: false,
      // });
      setShowModalObject({
        ...showModalObject,
        showSuccessModal: false,
        ShowWarningModal: false,
        showInfoModal: true,
        msg: "OTP code sent again to your email",
      });
    } catch (err) {
      dispatch({
        type: RESEND_OTP_FAILURE_RESPONSE,
        payload: err?.response?.data?.error,
      });

      // setResetLoadingObject({
      //   ...resetLoadingObject,
      //   isResendLoading: false,
      //   isResendDisable: false,
      // });
      if (err?.response?.status === 401) {
        toastMessageFailure("Your session is expired");
        localStorage.removeItem("jwtToken");
        dispatch({ type: "SET_CURRENT_USER", payload: {} });
        // history.push("/login");
      } else {
        setShowModalObject({
          ...showModalObject,
          showSuccessModal: false,
          ShowWarningModal: true,
          showInfoModal: false,
          msg: err?.response?.data?.error,
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
                  style={{ pointerEvents: sendEmailState.disbale && "none" }}
                  onClick={() => navigate("/dashboard")}
                  variant="contained"
                  className="btn btn-primary">
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* break */}
      {showOtpVerification === false ? (
        <>
          <div className={classes.rightLoginItem}>
            <div className="d-flex align-items-center right-login-item--wrapper">
              <div className="row justify-content-center w-100">
                <div className="col-md-8">
                  <Typography variant="h3">Reset Email </Typography>
                  <Typography variant="h6">
                    Enter your email to reset your Email :{" "}
                  </Typography>
                  <form onSubmit={updateEmail} className="row g-3 pt-4">
                    <div className="col-md-12">
                      {/* <label for="inputEmail4" className="form-label">
                    Email
                  </label> */}
                      <TextField
                        {...bindEmail}
                        placeholder="Please enter email address"
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
                          disabled={sendEmailState.disable}
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          fullWidth
                          className="btn btn-primary px-4 me-4">
                          {sendEmailState.loading === true ? (
                            <SimpleSpinner></SimpleSpinner>
                          ) : (
                            "Send OTP"
                          )}
                        </Button>
                        <Button
                          style={{
                            pointerEvents: sendEmailState.disable && "none",
                          }}
                          onClick={() => navigate("/dashboard")}
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
        </>
      ) : (
        <>
          <div className={classes.rightLoginItem}>
            <div className="d-flex align-items-center right-login-item--wrapper">
              <div className="row justify-content-center w-100">
                <div className="col-md-8">
                  <div className="alert alert-success" role="alert">
                    <Typography variant="h5" className="alert-heading">
                      Enter security code
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px" }}>
                      We have sent an OTP code to your Email:
                      <b className="alert-success">
                        {typeof window !== "undefined"
                          ? localStorage?.getItem("email")
                          : null}
                      </b>
                      <br></br>
                      Please check your email and enter the code below to
                      complete the signup process.<br></br>
                      <br></br>
                      <Typography
                        variant="subtitle2"
                        style={{ color: "#155724" }}>
                        Thank you!
                      </Typography>
                    </Typography>
                  </div>
                  <form className="row g-3 pt-4" onSubmit={submitOtp}>
                    <div className="col-md-12">
                      {/* <label htmlFor="otpCode" className="form-label">
                    Email OTP Code
                  </label> */}
                      <TextField
                        name="otpCode"
                        type="text"
                        label="Email OTP Code"
                        placeholder="Please enter 6 digit OTP code"
                        className="form-control"
                        variant="outlined"
                        fullWidth
                        {...bindOtpCode}
                      />
                    </div>
                    {validatedObject.isWarning && (
                      <ErrorMessageAlert
                        message={validatedObject.message}></ErrorMessageAlert>
                    )}

                    <div className="col-12">
                      <div className="d-flex w-100 justify-md-content-end">
                        <Button
                          disabled={verifyOtpState.disable}
                          type="submit"
                          className="btn btn-primary px-4 me-4"
                          variant="contained">
                          {verifyOtpState.loading === true ? (
                            <SimpleSpinner></SimpleSpinner>
                          ) : (
                            "Verify OTP"
                          )}
                        </Button>
                        {/* <Link
                      to="/Login"
                      className="btn btn-outline-primary px-4"
                      // onClick={() => resetState}
                    >
                      Cancel
                    </Link> */}
                        <Button
                          type="reset"
                          color="primary"
                          variant="outlined"
                          size="medium"
                          onClick={resetState}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>

                  <div role="alert">
                    <Typography
                      variant="subtitle2"
                      style={{ fontSize: "16px", marginTop: 16 }}>
                      Didn't receive the code?
                      <span
                        style={{
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                        onClick={sendOtpAgain}>
                        {resendOtpState.loading === true ? (
                          <SimpleSpinner color="black"></SimpleSpinner>
                        ) : (
                          " Send Again"
                        )}
                      </span>
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <SuccessModal
        showModal={showModalObject.showSuccessModal}
        btnText="Ok"
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

      <InfoModal
        showModal={showModalObject.showInfoModal}
        btnText="Ok"
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModal();
        }}></InfoModal>
    </div>
  );
};

export default UpdateEmail;

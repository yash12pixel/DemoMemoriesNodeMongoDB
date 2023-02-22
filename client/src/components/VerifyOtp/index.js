import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import ErrorMessageAlert from "../Alert";
import WarningModal from "../ToastModal/WarningModal";
import SuccessModal from "../ToastModal/SuccessModal";
import InfoModal from "../ToastModal/InfoModal";
import { SimpleSpinner } from "../Loading";
import UseInputHook from "../../hooks/useInputHooks";
import { apiClient } from "../../utils/request";
import useStyles from "../Signup/styles";
import "../Signup/style.scss";
import memories from "../../images/memories.png";
import {
  VERIFY_OTP_API_REQUEST,
  VERIFY_OTP_SUCCESS_RESPONSE,
  VERIFY_OTP_FAILURE_RESPONSE,
  RESEND_OTP_API_REQUEST,
  RESEND_OTP_SUCCESS_RESPONSE,
  RESEND_OTP_FAILURE_RESPONSE,
} from "../../constants/actionTypes";

const VerifyOtp = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const verifyOtpState = useSelector((state) => state.verifyOtpReducer);
  const resendOtpState = useSelector((state) => state.resendOtpReducer);

  const [validatedObject, setValidatedObject] = useState({
    isWarning: false,
    message: "",
  });
  // const [loadingObject, setLoadingObject] = useState({
  //   isResendLoading: false,
  //   isResendDisable: false,
  //   isVerifyLoading: false,
  //   isVerifyDisable: false,
  // });
  const [showModalObject, setShowModalObject] = useState({
    showSuccessModal: false,
    ShowWarningModal: false,
    msg: "",
  });
  const [showModalObjectResend, setShowModalObjectResend] = useState({
    showSuccessModal: false,
    ShowWarningModal: false,
    msg: "",
  });

  const [otpCode, bindOtpCode, resetOtpCode] = UseInputHook("");
  const navigate = useNavigate();

  let onCloseErrorModal = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });

    // redirect && props.history.push("/login");
    navigate("/login");
  };

  let onCloseErrorModalForResendOtp = () => {
    setShowModalObjectResend({
      ...showModalObjectResend,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });

    // redirect && props.history.push("/login");
    navigate("/verify-otp");
  };

  let sendOtpAgain = async (e) => {
    e.preventDefault();
    setValidatedObject({ ...validatedObject, isWarning: false, message: "" });
    // setLoadingObject({
    //   ...loadingObject,
    //   isResendLoading: true,
    //   isResendDisable: true,
    // });

    try {
      dispatch({ type: RESEND_OTP_API_REQUEST, payload: {} });

      const response = await apiClient.post("user/resendOtp", {
        authValue: localStorage.getItem("email"),
      });
      // console.log("response_resend:::", response.data);

      dispatch({ type: RESEND_OTP_SUCCESS_RESPONSE, payload: response.data });

      // setLoadingObject({
      //   ...loadingObject,
      //   isResendLoading: false,
      //   isResendDisable: false,
      // });
      setShowModalObjectResend({
        ...setShowModalObjectResend,
        showSuccessModal: true,
        ShowWarningModal: false,
        msg: "OTP code sent again to your email",
      });
    } catch (err) {
      dispatch({
        type: RESEND_OTP_FAILURE_RESPONSE,
        payload: err?.response?.data?.error,
      });

      // setLoadingObject({
      //   ...loadingObject,
      //   isResendLoading: false,
      //   isResendDisable: false,
      // });
      setShowModalObject({
        ...showModalObjectResend,
        showSuccessModal: false,
        ShowWarningModal: true,
        msg: err?.response?.data?.error,
      });
    }
  };

  let validateRequest = () => {
    if (otpCode === "" || otpCode === null || otpCode === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Otp Code required!",
      });
    }

    // else if (otpCode.length !== 6) {
    //   return setValidatedObject({
    //     ...validatedObject,
    //     isWarning: true,
    //     message: "Please enter the 6 digit OTP code!",
    //   });
    // }
    return true;
  };

  let verify = async (e) => {
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
      //   isVerifyLoading: true,
      //   isVerifyDisable: true,
      // });

      try {
        dispatch({ type: VERIFY_OTP_API_REQUEST, payload: {} });

        const response = await apiClient.post("/user/verifyOtp", {
          authValue: localStorage.getItem("email"),
          otpCode: otpCode,
        });
        // console.log("response_verify:::", response);

        localStorage.removeItem("email");
        dispatch({ type: VERIFY_OTP_SUCCESS_RESPONSE, payload: response.data });

        // setLoadingObject({
        //   ...loadingObject,
        //   isVerifyLoading: false,
        //   isVerifyDisable: false,
        // });
        setShowModalObject({
          ...showModalObject,
          showSuccessModal: true,
          ShowWarningModal: false,
          msg: "The account is verified successfully",
          redirect: true,
        });
        // navigate("/login");
      } catch (err) {
        dispatch({
          type: VERIFY_OTP_FAILURE_RESPONSE,
          payload: err?.response?.data?.error,
        });

        // setLoadingObject({
        //   ...loadingObject,
        //   isVerifyLoading: false,
        //   isVerifyDisable: false,
        // });
        setValidatedObject({
          ...validatedObject,
          isWarning: true,
          message: err?.response?.data?.error,
        });
      }
    }
  };

  const resetState = () => {
    resetOtpCode();
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
                  src={memories}
                  alt="memories"
                />

                <Typography variant="h4">
                  JOIN WITH US GET YOUR FREE ACCOUNT
                </Typography>
                <Typography variant="subtitle1">
                  You can create modified & also delete your beautiful moments
                </Typography>
                {/* <Link to="/login" className="btn btn-primary px-4">
                  Login
                </Link> */}
                <Button
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                  className="mt-2"
                  onClick={() => navigate("/login")}>
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
              <div className="alert alert-success" role="alert">
                <Typography variant="h5" className="alert-heading">
                  Enter security code
                </Typography>
                <Typography variant="h6">
                  We have sent an OTP code to your Email:
                  <b className="alert-success">
                    {typeof window !== "undefined"
                      ? localStorage?.getItem("email")
                      : null}
                  </b>
                  <br></br>
                  Please check your email and enter the code below to complete
                  the signup process.<br></br>
                  <br></br>
                  <Typography variant="h6" style={{ color: "#155724" }}>
                    Thank you!
                  </Typography>
                </Typography>
              </div>
              <form className="row g-3 pt-4" onSubmit={verify}>
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

      <InfoModal
        showModal={showModalObjectResend.showSuccessModal}
        btnText="OK"
        msg={showModalObjectResend.msg}
        onCloseModal={() => {
          onCloseErrorModalForResendOtp();
        }}></InfoModal>

      <SuccessModal
        showModal={showModalObject.showSuccessModal}
        btnText="OK"
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModal();
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

const mapStateToProps = (state) => ({
  verifyOtp: state.verifyOtpReducer,
  resendOtp: state.resendOtpReducer,
});

export default connect(mapStateToProps, {})(VerifyOtp);

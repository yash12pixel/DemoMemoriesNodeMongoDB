import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import UseInputHook from "../../hooks/useInputHooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../ToastModal/SuccessModal";
import WarningModal from "../ToastModal/WarningModal";
import ErrorMessageAlert from "../Alert";
import { toastMessageFailure } from "../../utils/toastMessages";
import "../Signup/style.scss";
import useStyles from "../Signup/styles";

import memories from "../../images/memories.png";
import { apiClient } from "../../utils/request";
// import { useSelector } from "react-redux";
import { SimpleSpinner } from "../Loading";
import {
  REMOVE_CURRENT_USER,
  UPDATE_PASSWORD_API_REQUEST,
  UPDATE_PASSWORD_SUCCESS_RESPONSE,
  UPDATE_PASSWORD_FAILURE_RESPONSE,
} from "../../constants/actionTypes";

const UpdatePasswordOnProfile = () => {
  //   const isLogin = localStorage.getItem("token");
  //   const user = useSelector((state) => state.loginReducer.user);
  //   const userExist = user.userExist;
  //   console.log("userExist::", user.id);
  const classes = useStyles();
  const passwordUpdateState = useSelector(
    (state) => state.updatePasswordReducer
  );
  const [oldPassword, bindOldPassword, resetOldPassword] = UseInputHook("");
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    LoginCheck();
  }, []);

  const LoginCheck = () => {
    if (!localStorage.getItem("token")) {
      setShowModalObject({
        showSuccessModal: false,
        ShowWarningModal: true,
        msg: "Login First",
      });
    }
  };

  let onCloseErrorModal = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });
    navigate("/login");
  };

  let onCloseErrorModalLogin = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });
    navigate("/login");
  };

  let validateRequest = () => {
    if (
      oldPassword === "" ||
      oldPassword === null ||
      oldPassword === undefined
    ) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "Old Password required!",
      });
    } else if (password === "" || password === null || password === undefined) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "New Passwwod is required!",
      });
    } else if (password !== confirmPassword) {
      return setValidatedObject({
        ...validatedObject,
        isWarning: true,
        message: "New password and confirm password not matched!",
      });
    }
    return true;
  };

  const resetState = () => {
    resetOldPassword();
    resetPassword();
    resetCondirmPassword();
  };

  let updatePssword = async (e) => {
    e.preventDefault();

    let validate = validateRequest();
    if (validate) {
      //   let id = user.id;
      let data = { oldPassword, password, confirmPassword };
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

        const response = await apiClient
          .patch("user/updatePasswordOnProfile", data)
          .then((response) => {
            // console.log("response:::", response);
            return response;
          });
        // console.log("response_update-pass:::", response);
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
        resetState();
        setShowModalObject({
          ...showModalObject,
          showSuccessModal: true,
          ShowWarningModal: false,
          msg: "Password updated successfully",
        });
      } catch (err) {
        dispatch({
          type: UPDATE_PASSWORD_FAILURE_RESPONSE,
          payload: err?.response?.data?.error,
        });

        // setLoadingObject({
        //   ...loadingObject,
        //   isLoading: false,
        //   isDisable: false,
        // });

        if (err?.response?.status === 401) {
          toastMessageFailure("Your session is expired");
          localStorage.removeItem("jwtToken");
          dispatch({ type: REMOVE_CURRENT_USER, payload: {} });
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

  return (
    <>
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
                  {/* <Button
                    className="btn btn-primary px-4"
                    type="submit"
                    variant="contained"
                    onClick={() => navigate("/login")}
                    color="primary">
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
                <Typography variant="h3">Reset Password</Typography>
                <Typography variant="h6" className="mt-1">
                  Enter details For Reset The Password:
                </Typography>
                <form onSubmit={updatePssword} className="row g-3 pt-4">
                  {validatedObject.isWarning && (
                    <ErrorMessageAlert
                      message={validatedObject.message}></ErrorMessageAlert>
                  )}

                  <div className="col-md-12">
                    {/* <label htmlFor="firstname" className="form-label">
                    First Name
                  </label> */}
                    <TextField
                      placeholder="Enter Old Password"
                      name="oldPassword"
                      label="Old Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      className="form-control"
                      {...bindOldPassword}
                    />
                  </div>
                  <div className="col-md-12">
                    {/* <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label> */}
                    <TextField
                      placeholder="Enter Password"
                      name="password"
                      className="form-control"
                      label="Passwprd"
                      variant="outlined"
                      type="password"
                      fullWidth
                      {...bindPassword}
                    />
                  </div>
                  <div className="col-md-12  ">
                    {/* <label htmlFor="email" className="form-label">
                    Email
                  </label> */}
                    <TextField
                      name="confirmPassword"
                      placeholder="Enter Confirm Password"
                      className="form-control"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      {...bindConfirmPassword}
                    />
                  </div>

                  <div className="col-12">
                    <div className="d-flex w-100 justify-md-content-end">
                      <Button
                        disabled={passwordUpdateState.disable}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        className="btn btn-primary px-4 me-4">
                        {passwordUpdateState.loading === true ? (
                          <SimpleSpinner></SimpleSpinner>
                        ) : (
                          "Reset Password"
                        )}
                      </Button>
                      <Button
                        type="reset"
                        color="primary"
                        variant="outlined"
                        size="medium"
                        fullWidth
                        onClick={() => navigate("/dashboard")}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        showModal={showModalObject.showSuccessModal}
        btnText="Ok"
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModal();
        }}></SuccessModal>
      <WarningModal
        showModal={showModalObject.ShowWarningModal}
        btnText="Login"
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModalLogin();
        }}></WarningModal>
    </>
  );
};

export default UpdatePasswordOnProfile;

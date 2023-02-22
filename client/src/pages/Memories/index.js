import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import "./memories.css";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import { getPosts } from "../../actions/posts";
// import { useSelector } from "react-redux";
import NavBar from "../../components/Navbar";
import WarningModal from "../../components/ToastModal/WarningModal";
import { useNavigate } from "react-router-dom";

const Memories = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModalObject, setShowModalObject] = useState({
    showSuccessModal: false,
    ShowWarningModal: false,
    msg: "",
  });
  // const user = useSelector((state) => state.loginReducer.user);
  // console.log("user:::", user);

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
  let onCloseErrorModalLogin = () => {
    setShowModalObject({
      ...showModalObject,
      showSuccessModal: false,
      ShowWarningModal: false,
      msg: "",
    });
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <NavBar />
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <WarningModal
        showModal={showModalObject.ShowWarningModal}
        btnText="Login"
        msg={showModalObject.msg}
        onCloseModal={() => {
          onCloseErrorModalLogin();
        }}></WarningModal>
    </Container>
  );
};

export default Memories;

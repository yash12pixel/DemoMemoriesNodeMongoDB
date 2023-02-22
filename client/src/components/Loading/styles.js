import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  loadingPpage: {
    backgroundColor: "#fff",
    position: "absolute",
    height: "100%",
    top: "50%",
    right: 0,
    left: "50%",
    margin: "0 0 0 10px",
    transform: " translate(-50%, -50%)",
    width: "100%",
  },
  img: {
    textAlign: "center",
    margin: "0 auto",
    width: "400px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
});

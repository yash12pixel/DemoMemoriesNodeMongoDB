import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import useStyles from "./styles";
import { Typography } from "@mui/material";

export const SimpleSpinner = ({ color = "white", size = 18 }) => {
  return <ClipLoader color={color} size={size} />;
};

export const ClipSpinner = ({ color = "white", size = 20 }) => {
  return <ClipLoader color={color} size={size} />;
};

const Loading = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3">Loading page</Typography>
      <div className={classes.loadingPpage}>
        <img
          className={classes.img}
          src="./../../images/page-loading.gif"
          alt="Loading"
        />
      </div>
    </>
  );
};

export default Loading;

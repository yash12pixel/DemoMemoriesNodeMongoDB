import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from "./style";
import AccountMenu from "../Avatar";
import "./style.css";

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="relative" color="inherit">
      <Typography
        className={classes.heading}
        style={{ margin: "0 0 0 400px" }}
        variant="h2"
        align="center">
        Memories
      </Typography>
      <img className={classes.image} src={memories} alt="icon" height="60" />
      <div style={{ margin: "16px 0 0 200px" }}>
        <AccountMenu />
      </div>
    </AppBar>
  );
};

export default NavBar;

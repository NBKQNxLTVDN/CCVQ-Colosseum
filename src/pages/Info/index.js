import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { makeStyles } from "@mui/styles";
import history from "utils/history";

const useStyles = makeStyles((theme) => ({
  infoPage: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: theme.palette.background.main,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imgBg: {
    height: "80%",
    borderRadius: "20px",
  },
  btn: {
    fontWeight: "bold",
    backgroundColor: theme.palette.tertiary.main,
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
    boxShadow: "1px 1px 1px rgba(0,0,0)",
    margin: "0 10px",
  },
  footer: {
    position: "absolute",
    bottom: "5%",
    right: "50%",
  },
}));

const changeToController = () => {
  history.push("/controller");
};
const changeToViewer = () => {
  history.push("/viewer");
};
const changeToClient = () => {
  history.push("/client");
};
const changeToMC = () => {
  history.push("/mc");
};

const Info = () => {
  const styles = useStyles();
  return (
    <div className={styles.infoPage}>
      <div className={styles.checkThis}>
        <ButtonGroup>
          <Button
            className={styles.btn}
            onClick={changeToController}
            color="primary"
          >
            Switch to Controller
          </Button>
          <Button
            className={styles.btn}
            onClick={changeToViewer}
            color="primary"
          >
            Switch to Viewer
          </Button>
          <Button
            className={styles.btn}
            onClick={changeToClient}
            color="primary"
          >
            Switch to Client
          </Button>
          <Button className={styles.btn} onClick={changeToMC} color="primary">
            Switch to MC
          </Button>
        </ButtonGroup>
      </div>
      <img
        className={styles.imgBg}
        alt="THIS IS CCVQ"
        src={process.env.PUBLIC_URL + "/images/logo.png"}
      />
      <div className={styles.footer}>
        Copyright @CCVQ-2021
        <div>
          Contact:{" "}
          <a href="https://www.facebook.com/r2thang/">Truong Duc Thang</a>
        </div>
      </div>
    </div>
  );
};

export default Info;

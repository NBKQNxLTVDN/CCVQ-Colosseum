import React, { useContext } from "react";
import { Modal, Typography, Grow, Backdrop, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

import { NotificationContext } from "contexts/notification.js";
// import { Dashboard } from "@mui/icons-material";
// import { red } from "@mui/material/colors";

import ErrorFrame from "./errorFrame.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    marginTop: "30vh",
    margin: "auto",
    width: "90vw",
    maxWidth: 500,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
    // boxShadow: theme.shadows[5],
    padding: "25px 15px",
    outline: "none !important",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    fontSize: 25,
    textAlign: "center",
    padding: 10,
  },
  close: {
    position: "absolute",
    "&:hover": {
      cursor: "pointer",
      borderRadius: "50%",
      backgroundColor: theme.palette.error.dark,
    },
    top: 10,
    right: 10,
  },
  errorActions: {
    margin: "10px 0px",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
  },
  quote: {
    marginTop: 20,
    padding: "10px 20px",
    paddingBottom: 0,
    textAlign: "right",
  },
  errorImage: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  },
}));

/**
 * notification.props = [
 *  message,
 *  errorHandler (async)
 *  manual closeNoti() -- true if closeNoti() is called in errorHandler
 * ]
 */

const Error = () => {
  const { notification, closeNoti } = useContext(NotificationContext);
  const styles = useStyles();

  return (
    <Modal
      open={notification.isOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Grow in={notification.isOpen}>
        <div className={styles.paper}>
          <CloseIcon
            className={styles.close}
            color="secondary"
            onClick={closeNoti}
          >
            close
          </CloseIcon>

          <div className={styles.title}>
            <div className={styles.errorImage}>
              <img src={ErrorFrame} alt="error" />
            </div>
            {/* <h3>WARNING !!!</h3> */}
          </div>

          <div className={styles.errorContent}>
            <Typography
              className={styles.content}
              variant="h1"
              color="secondary"
            >
              {notification.props[0]}
            </Typography>
          </div>
          <div className={styles.errorActions}>
            <Button variant="contained" onClick={closeNoti}>
              OK
            </Button>
          </div>
        </div>
      </Grow>
    </Modal>
  );
};

export default Error;

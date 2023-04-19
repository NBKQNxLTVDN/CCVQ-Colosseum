import React, { useContext } from "react";
import { Modal, Typography, Grow, Backdrop, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import cn from "classnames";

import { NotificationContext } from "contexts/notification.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) !important",
    width: 450,
    backgroundColor: "#C9D3D7",
    borderRadius: 25,
    // boxShadow: theme.shadows[5],
    border: "5px solid #001328",
    backgroundImage: `url("${process.env.PUBLIC_URL}/Asset 9.svg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundPositionY: "11vh",
    backgroundSize: "75%",
    minHeight: "50vh",
    outline: "none !important",
    paddingBottom: 30,
  },
  background: {
    position: "absolute",
    top: "30%",
    left: "10%",
    width: "80%",
    height: "70%",
    zIndex: 0,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    color: "#001328",
  },
  content: {
    textAlign: "center",
    whiteSpace: "pre-line",
  },
  close: {},
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.palette.primary.main,
  },
}));

const Default = () => {
  const { notification, closeNoti } = useContext(NotificationContext);
  const styles = useStyles();

  const [title, content, error = false] = notification.props;

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
        <div
          className={styles.paper}
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/images/nền câu hỏi.png"
            })`,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
            onClick={closeNoti}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            className={cn(styles.title, error ? styles.error : styles.success)}
            variant="h2"
            style={{
              color: "#001328",
              marginBottom: 20,
              marginTop: 30,
              fontFamily: "Teko",
              fontSize: "96px",
            }}
          >
            {title}
          </Typography>
          <Typography
            className={cn(
              styles.content,
              error ? styles.error : styles.success
            )}
            variant="body1"
          >
            {content}
          </Typography>
        </div>
      </Grow>
    </Modal>
  );
};

export default Default;

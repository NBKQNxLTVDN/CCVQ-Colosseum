import React, { useContext, useState } from "react";
import {
  Modal,
  Typography,
  Grow,
  Backdrop,
  Button,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

import { NotificationContext } from "contexts/notification.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    marginTop: "30vh",
    margin: "auto",
    width: "90vw",
    maxWidth: 400,
    borderRadius: 10,
    // boxShadow: theme.shadows[5],
    padding: "25px 15px",
    outline: "none !important",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    fontSize: 20,
    textAlign: "center",
  },
  close: {
    position: "absolute",
    "&:hover": {
      cursor: "pointer",
      borderRadius: "50%",
      backgroundColor: theme.palette.stroke,
    },
    top: 10,
    right: 10,
  },
  confirmActions: {
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
}));

/**
 * notification.props = [
 *  message,
 *  confirmHandler (async)
 *  manual closeNoti() -- true if closeNoti() is called in confirmHandler
 * ]
 */

const Confirm = () => {
  const { notification, closeNoti } = useContext(NotificationContext);
  const styles = useStyles();

  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    if (notification.props[1]) {
      await notification.props[1]();
    }
    setLoading(false);
    if (notification.props[2] !== true) {
      closeNoti();
    }
  };

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
          <div className={styles.confirmContent}>
            {/* <Typography className={styles.title} variant="h3" color="secondary">Chắc chưa?</Typography> */}
            <Typography
              className={styles.content}
              variant="body1"
              color="secondary"
            >
              {notification.props[0]}
            </Typography>
          </div>
          <div className={styles.confirmActions}>
            <Button color="secondary" variant="contained" onClick={closeNoti}>
              Không
            </Button>
            <Button color="secondary" variant="outlined" onClick={handleOk}>
              {loading ? <CircularProgress color="secondary" /> : "Đồng ý"}
            </Button>
          </div>
          {/* <div className={styles.quote}>
            <Typography variant="subtitle1" color="secondary">"Mọi hành động nghịch ngu đều phải trả giá"</Typography>
          </div> */}
        </div>
      </Grow>
    </Modal>
  );
};

export default Confirm;

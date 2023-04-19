import * as React from "react";
import { Modal, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    backgroundColor: theme.palette.tertiary.main,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
    border: `10px solid ${theme.palette.secondary.dark}`,
    borderRadius: 25,
    minHeight: 400,
  },
  left: {
    position: "absolute",
    top: "50%",
    left: 0,
    height: "100%",
    width: 20,
    transform: "translate(0, -30%)",
  },
  right: {
    position: "absolute",
    top: "50%",
    right: 0,
    height: "100%",
    width: 20,
    transform: "translate(0, -70%) rotate(180deg)",
  },
  top: {
    position: "absolute",
    top: 0,
    left: "50%",
    height: 20,
    width: "100%",
    transform: "translate(-25%, 0)",
    display: "flex",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    height: 20,
    width: "100%",
    transform: "translate(-25%, 0)",
    display: "flex",
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "20px 0 0 20px",
    borderColor: `transparent transparent transparent ${theme.palette.secondary.dark}`,
  },
  rectangle: {
    width: 20,
    height: "50%",
    backgroundColor: theme.palette.secondary.dark,
  },
  hRectangle: {
    width: "50%",
    height: 20,
    backgroundColor: theme.palette.secondary.dark,
  },
  content: {
    padding: 40,
    color: "#f9f9f9",
    textShadow:
      "1px 0 #1e1e1e, -1px 0 #1e1e1e, 0 1px #1e1e1e, 0 -1px #1e1e1e, 1px 1px #1e1e1e, -1px -1px #1e1e1e, 1px -1px #1e1e1e, -1px 1px #1e1e1e",
    letterSpacing: 5,
    height: "90%",
  },
  actions: {
    position: "absolute",
    bottom: 10,
    left: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 60,
  },
}));

const ModalCustom = ({ show, children, onClose, onSubmit, type = "small" }) => {
  const styles = useStyles();

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <div
        className={styles.container}
        style={{
          width:
            type === "small"
              ? "40vw"
              : type === "large"
              ? "60vw"
              : type === "medium"
              ? "30vw"
              : 800,
          height: type === "medium" ? "80vh" : "auto",
        }}
      >
        <IconButton
          sx={{ position: "absolute", right: 20, top: 20, fontSize: 40 }}
          onClick={onClose}
        >
          <HighlightOffOutlinedIcon fontSize="inherit" />
        </IconButton>
        {type === "small" ? (
          <>
            <div className={styles.left}>
              <div className={styles.triangle}></div>
              <div className={styles.rectangle}></div>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.triangle}></div>
              <div className={styles.rectangle}></div>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
          </>
        ) : type === "large" ? (
          <>
            <div className={styles.left}>
              <div className={styles.triangle}></div>
              <div className={styles.rectangle}></div>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.triangle}></div>
              <div className={styles.rectangle}></div>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            <div className={styles.top}>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(180deg)" }}
              ></div>
              <div className={styles.hRectangle}></div>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            <div className={styles.bottom}>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(-90deg)" }}
              ></div>
              <div className={styles.hRectangle}></div>
              <div
                className={styles.triangle}
                // style={{ transform: "rotate(180deg)" }}
              />
            </div>
          </>
        ) : type === "medium" ? (
          <>
            <div className={styles.top}>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(180deg)" }}
              ></div>
              <div className={styles.hRectangle}></div>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
            <div className={styles.bottom}>
              <div
                className={styles.triangle}
                style={{ transform: "rotate(-90deg)" }}
              ></div>
              <div className={styles.hRectangle}></div>
              <div
                className={styles.triangle}
                // style={{ transform: "rotate(180deg)" }}
              />
            </div>
          </>
        ) : (
          <div></div>
        )}
        <div className={styles.content} style={{ paddingTop: 30 }}>
          {children}
        </div>
        <div
          className={styles.actions}
          style={
            type === "medium"
              ? {
                  marginBottom: "25px",
                }
              : {}
          }
        >
          <Button
            color="danger"
            variant="contained"
            onClick={onClose}
            style={{
              border: "3px solid black",
              borderRadius: 20,
              color: "white",
            }}
            sx={{ padding: "5px 30px", fontWeight: "bold", letterSpacing: 3 }}
          >
            Decline
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={onSubmit}
            style={{
              border: "3px solid black",
              borderRadius: 20,
              color: "white",
            }}
            sx={{ padding: "5px 30px", fontWeight: "bold", letterSpacing: 3 }}
          >
            Accept
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCustom;

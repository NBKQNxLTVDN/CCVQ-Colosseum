import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  all: {
    display: "grid",
    gridTemplateColumns: "auto",
    gridGap: "3rem",
  },
  textBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  nameBox: {
    background: "#560a0a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "hidden",
    borderRadius: "15px",
    color: "white",
    padding: "10px",
  },

  timeBox: {
    border: "5px solid white",
    borderRadius: "15px",
    background: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  answerBox: {
    width: "100%",
    border: "hidden",
    borderRadius: "15px",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    background: "white",
    color: "black",
    padding: "2rem",
  },
}));

const AnswerUser = (props) => {
  const styles = useStyles();
  const { display, player } = props;

  return (
    <div
      className={styles.all}
      style={
        player.status === "null"
          ? {
              animation: `${
                props.index * 0.5
              }s ease 0s 1 normal none running slideInRight`,
            }
          : {}
      }
    >
      <div
        className={styles.answerBox}
        style={
          player.status === "correct"
            ? { background: "orange" }
            : player.status === "incorrect"
            ? {
                background: "#f66767",
                border: "5px solid red",
              }
            : {}
        }
      >
        <div className={styles.nameBox}>{display && player.name}</div>
        <div className={styles.textBox}>{display && player.answer}</div>
      </div>
      {/* <div className={styles.timeBox}>{display && (player.seconds + " s")}</div> */}
    </div>
  );
};

export default AnswerUser;

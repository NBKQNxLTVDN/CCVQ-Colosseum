import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  all: {
    display: "grid",
    gridTemplateColumns: "5fr 1fr",
    gridGap: "3rem",
  },
  textBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  nameBox: {
    background: "#ebcb93",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "hidden",
    borderRadius: "15px",
    color: "#000432",
    padding: "10px"
  },

  timeBox: {
    border: "8px solid #000432",
    borderRadius: "15px",
    display: "flex",
    background: "white",
    alignItems: "center",
    justifyContent: "center",
    color: "#000432",
  },

  answerBox: {
    width: "100%",
    border: "hidden",
    borderRadius: "15px",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    background: "#000432",
    color: "white",
    padding: "1rem"
  },
}));

const AnswerUser = (props) => {
  const styles = useStyles();
  const { display, player } = props;

  return (
    <div
      className={styles.all}
      style={
        player.status === "null" ?
          { animation: `${props.index * 0.5}s ease 0s 1 normal none running slideInRight`, } : {}
      }>
      <div className={styles.answerBox}
        style={
          player.status === "correct"
            ? { background: "#34df34",
                border: "5px solid green",
              }
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
      <div className={styles.timeBox}>{display && (player.seconds + " s")}</div>
    </div>
  );
};

export default AnswerUser;

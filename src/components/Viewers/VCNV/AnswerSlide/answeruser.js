import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
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

  answerBox: {
    width: "100%",
    border: "hidden",
    borderRadius: "15px",
    display: "grid",
    gridTemplateColumns: "3fr 7fr 1fr",
    background: "white",
    color: "black",
    padding: "1rem",
    animation: "2s ease 0s 1 normal none running zoomIn",
  },
  bellBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "red",
  },
}));

const AnswerUser = (props) => {
  const styles = useStyles();
  const { display, player } = props;

  return (
    <div className={styles.answerBox}>
      <div className={styles.nameBox}>{display && player.name}</div>
      <div className={styles.textBox}>{display && player.ans}</div>
      {props.bellRank > -1 && (
        <div className={styles.bellBox}>{props.bellRank + 1}</div>
      )}
    </div>
  );
};

export default AnswerUser;

import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";

import { getTime } from "utils/helpers";
import { useTimer } from "hooks/useTimer";

import { socket } from "service/socket";

const useStyles = makeStyles(() => ({
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 100,
  },
  timer: {
    fontFamily: "Teko",
    letterSpacing: "1rem",
  },
  question: {
    marginBottom: 20,
    border: "2px solid black",
    padding: "20px 30px",
    fontSize: 40,
    backgroundColor: "white",
    borderRadius: 20,
    textAlign: "left",
  },
}));

const Question = () => {
  const styles = useStyles();

  const [question, setQuestion] = useState("");
  const [timerFontSize, setTimerFontSize] = useState(300);

  const { timer } = useTimer({ step: 1000 });

  useEffect(() => {
    if (question && question !== "") {
      setTimerFontSize(100);
    } else {
      setTimerFontSize(300);
    }
  }, [question]);

  useEffect(() => {
    socket.on("ccvq:sendQuestion_client", (data) => {
      setQuestion(data.question);
    });
    return () => {
      socket.off("ccvq:sendQuestion_client");
    };
  }, []);

  return (
    <div className={styles.container}>
      {question && question !== "" && (
        <div className={styles.question}>{question}</div>
      )}
      <div className={styles.timer} style={{ fontSize: timerFontSize }}>
        {getTime(timer / 1000)}
      </div>
    </div>
  );
};

export default Question;

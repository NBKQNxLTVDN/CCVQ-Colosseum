import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

import { getTime } from "utils/helpers";

const useStyles = makeStyles((theme) => ({
  timer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  header: {
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    color: "red",
    padding: "1% 20%",
    fontSize: "2vh",
    borderRadius: "5vh",
    fontWeight: "bold",
    boxShadow: "0.5vh 0.5vh 0.5vh black",
  },
  countdown: {
    fontWeight: 700,
    fontSize: "7rem",
    height: "fit-content",
    width: "fit-content",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    padding: "5%",
    border: "1px solid black",
    borderRadius: "3vh",
    boxShadow: "inset 5px 5px 5px black",
    textShadow: "2px 2px 5px #403e36",
  },
  horizontalLine: {
    borderTop: "6px solid green",
    width: "80%",
    position: "absolute",
    top: "13%",
    left: "10%",
    zIndex: -1,
    borderRadius: "30%",
  },
}));

const Timer = () => {
  const styles = useStyles();

  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(true);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("ccvq:setName", {
        role: "mc",
        name: "mc",
        position: "mc",
      });
    });
  });

  socket.on("ccvq:setTime", (data) => {
    setTime(data.seconds);
    setPause(true);
    clearTimeout(timer);
  });

  socket.on("ccvq:timeState", (data) => {
    setPause(data.status === "pause");
  });

  useEffect(() => {
    if (time > 0 && !pause)
      setTimer(
        setTimeout(() => {
          if (!pause) setTime(time - 1);
        }, 1000)
      );
  }, [pause, time]);

  return (
    <div className={styles.timer}>
      <div className={styles.header}>Timer</div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.countdown}>{getTime(time)}</div>
    </div>
  );
};

export default Timer;

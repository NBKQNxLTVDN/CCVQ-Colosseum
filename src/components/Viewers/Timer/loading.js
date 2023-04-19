import React, { useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  timeLoading: {
    width: "100%",
    height: "100%",
  },
  loading: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    textContent: "",
  },
}));

const Timer = ({ timer, timeLeft }) => {
  const loading = useRef();
  const styles = useStyles();

  useEffect(() => {
    console.log(timeLeft);
    let process = (1 - parseInt(timeLeft) / parseInt(timer)) * 100 + "%";
    loading.current.style.width = process;
  }, [timeLeft]);

  return (
    <div className={styles.timeLoading}>
      <div
        className={styles.loading}
        ref={loading}
        styles={{ width: 1 - parseInt(timeLeft) / parseInt(timer) + "%" }}
      ></div>
      {timeLeft}
    </div>
  );
};

export default Timer;

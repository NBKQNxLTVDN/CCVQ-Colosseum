import React, { useEffect, useRef, useState } from "react";

import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Cloud from "../../assets/images/Cloud.svg";
import Cloud2 from "../../assets/images/Cloud2.svg";

import { socket } from "service/socket";

const useStyles = makeStyles(() => ({
  container: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%, 0)",
    marginBottom: "10vh",
    width: "50vw",
    zIndex: 2,
  },
  cloud: {
    height: "14vh",
    position: "absolute",
    top: "5%",
    right: "-10%",
    zIndex: 3,
  },
  cloud2: {
    height: "16vh",
    position: "absolute",
    top: 0,
    left: "-5%",
    zIndex: 3,
  },
}));

const Answer = ({ playerOrder }) => {
  const styles = useStyles();

  const [input, setInput] = useState("");
  const [disable, setDisable] = useState(true);
  const [answer, setAnswer] = useState("");

  const [start, setStart] = useState(null);
  const [timeAns, setTimeAns] = useState(0);

  const inputRef = useRef(null);

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    setAnswer(input);
    setInput("");
  };

  useEffect(() => {
    if (answer && start) {
      let tmp = (new Date() - start) / 1000;
      setTimeAns(tmp);
      socket.emit("client:talk", {
        receivers: ["controller", "mc"],
        eventName: "ccvq:send_ans",
        data: {
          seconds: tmp,
          order: parseInt(playerOrder),
          answer: answer,
        },
      });
    }
    //eslint-disable-next-line
  }, [answer]);

  useEffect(() => {
    socket.on("ccvq:answerBoxStatus", (data) => {
      if (data.status === "open") {
        setDisable(false);
        setAnswer("");
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
        setStart(new Date());
      } else if (data.status === "block") {
        setDisable(true);
      }
    });
    return () => {
      socket.off("ccvq:answerBoxStatus");
    };
  }, []);

  return (
    <form className={styles.container} onSubmit={handleSubmitAnswer}>
      <img className={styles.cloud} src={Cloud} alt="cloud" />
      <TextField
        fullWidth
        type="text"
        value={input}
        InputProps={{
          style: {
            backgroundColor: "#E0E6E8",
            border: "5px solid #001328",
            borderRadius: 30,
            height: 100,
          },
        }}
        inputProps={{
          style: {
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: 36,
          },
        }}
        onChange={(e) => {
          setInput(e.target.value.toUpperCase());
        }}
        placeholder={`Your answer is ${
          timeAns ? `${answer} (${timeAns} s)` : ""
        }`}
        disabled={disable}
        inputRef={inputRef}
      />
      <img className={styles.cloud2} src={Cloud2} alt="cloud2" />
    </form>
  );
};

export default Answer;

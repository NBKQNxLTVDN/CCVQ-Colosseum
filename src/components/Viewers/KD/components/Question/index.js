import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import HTMLStringConvert from "components/HTMLStringConvert";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  questionBox: {
    position: "absolute",
    left: "5%",
    top: "8%",
    width: "68%",
    height: "51%",
    zIndex: 2,
    backgroundColor: "#F7F5F8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 900,
  },
  content: {
    fontSize: "5vh",
    color: "#3D2147",
    animation: "1s ease 0s 1 normal none running lightSpeedIn",
  },
}));

const Question = ({ handleEndRound }) => {
  const styles = useStyles();

  const [question, setQuestion] = useState(
    JSON.parse(localStorage.getItem("question"))?.question ||
    "Lượt thi khởi động bắt đầu."
  );
  const [url, setUrl] = useState(null);

  useEffect(() => {
    socket.on("ccvq:sendQuestion_client", (data) => {
      setQuestion(data.question);
      setUrl(data.url);
      localStorage.setItem("question", JSON.stringify(data));
    });

    socket.on("KD:status", (data) => {
      if (data.status === "start") {
        setQuestion("Lượt thi khởi động bắt đầu.")
      }
      if (data.status === "pause") {
        setQuestion("Phần thi đã kết thúc");
        localStorage.removeItem("question");
        localStorage.removeItem("timeStart");
        localStorage.removeItem("timer");
        localStorage.removeItem("KD_player");
        localStorage.removeItem("KD_score");
        localStorage.removeItem("soundStatus");
        handleEndRound();
      }
    });

    return () => {
      socket.off("ccvq:sendQuestion_client");
      socket.off("KD:status");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.questionBox}>
      {url && (
        <img
          style={{ height: "90%", paddingRight: "50px" }}
          alt="question"
          src={`${process.env.PUBLIC_URL}/data/KD/${url}`}
        />
      )}
      <div className={styles.content}>
        <HTMLStringConvert string={question} />
      </div>
    </div>
  );
};

export default Question;

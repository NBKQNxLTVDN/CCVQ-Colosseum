import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import HTMLStringConvert from "components/HTMLStringConvert";
import { socket } from "service/socket";
import { BigPlayButton, Player } from "video-react";
import ControlBar from "video-react/lib/components/control-bar/ControlBar";

const useStyles = makeStyles((theme) => ({
  questionText: {
    position: "absolute",
    top: "6.5%",
    left: "9%",
    zIndex: 3,
    height: "15%",
    width: "68%",
    display: "flex",
    color: "white",
    fontSize: "4vh",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #e3d9c8",
    borderRadius: "2vh",
    backgroundColor: "#000432",
  },
  questionMedia: {
    position: "absolute",
    top: "58.25%",
    left: "43%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    width: "65%",
    height: "60%",
  },
  questionVideo: {
    position: "absolute",
    top: "58.25%",
    left: "43%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    width: "63.5%",
  },
}));

const Question = ({ dataSolution, slide }) => {
  const styles = useStyles();
  const [question, setQuestion] = useState();
  const player = useRef(null);
  //

  useEffect(() => {
    socket.on("ccvq:sendQues_viewer", (data) => {
      setQuestion(data);
    });

    return () => {
      socket.off("ccvq:sendQues_viewer");
    };
    //eslint-disable-next-line
  });

  useEffect(() => {
    socket.on("ccvq:startVideo", () => {
      player.current.actions.seek(0);
      console.log(player.current.actions);
      player.current.actions.play();
    });

    socket.on("ccvq:timeState", (data) => {
      if (data.status === "pause") {
        player.current.actions.pause();
      }
    });

    return () => {
      socket.off("ccvq:startVideo");
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  });

  return (
    <div>
      <div
        className={styles.questionText}
        style={
          slide === "question"
            ? { animation: "2s ease 0s 1 normal none running slideInDown" }
            : {}
        }
      >
        <HTMLStringConvert
          string={
            (question && question.ques_content) ||
            (dataSolution && dataSolution.ques_content)
          }
        />
      </div>
      {slide === "question" && question && question.ques_type === "image" && (
        <img
          alt="quesMedia"
          src={question.url}
          className={styles.questionMedia}
        />
      )}
      {slide === "question" && question && question.ques_type === "video" && (
        <div className={styles.questionVideo}>
          <Player ref={player} src={question.url}>
            <BigPlayButton position="center" />
            <ControlBar disableCompletely={true} />
          </Player>
        </div>
      )}
      {slide === "solution" && dataSolution && (
        <img
          alt="quesMedia"
          src={dataSolution.url}
          className={styles.questionMedia}
        />
      )}
    </div>
  );
};

export default Question;

import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

import Background from "../../assets/images/question_container.png";

import TimerBar from "components/Viewers/KD/components/TimeProcessingBar";
import HTMLStringConvert from "components/HTMLStringConvert";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";

import QuestionSound from "../../assets/sounds/Mở câu hỏi.mp4";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  content: {
    color: "white",
    fontSize: "5vh",
    textAlign: "start",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: "100%",
    height: "100%",
    padding: "3% 5%",
    animation: "2s ease 0s 1 normal none running fadeInUp",
  },
}));

const Question = ({ field }) => {
  const styles = useStyles();
  const [playSound, setPlaySound] = useState("PLAYING");
  const [question, setQuestion] = useState({
    question: `Phan thi so truong ${field}`,
    type: "text",
  });

  const { volume } = useContext(SoundContext);

  const [display, setDisplay] = useState(false);
  const [fontSize, setFontSize] = useState(40);

  useEffect(() => {
    socket.on("CHST:sendQuestion", (data) => {
      setDisplay(false);
      setQuestion({
        question: data.data.question,
        type: data.type,
        url: data.data.url,
      });
      setDisplay(true);
    });

    socket.on("VD:changeFontSize", (data) => {
      if (data.action === "increase") {
        setFontSize((prevState) => prevState + 1);
      } else if (data.action === "decrease") {
        setFontSize((prevState) => prevState - 1);
      }
    });

    return () => {
      socket.off("CHST:sendQuestion");
      socket.off("VD:changeFontSize");
    };
    //eslint-disable-next-line
  }, []);

  const _renderQuestion = () => {
    // switch (question.type) {
    //   case "video":
    //     return <>{question.url && <div>Video {question.url}</div>}</>;
    //   case "image":
    //     return <>{question.url && <div>Image {question.url}</div>}</>;

    //   default:
    return <HTMLStringConvert string={question.question} />;
    // }
  };
  return (
    <div className={styles.container}>
      <img alt="question" src={Background} className={styles.background} />
      {display && (
        <>
          <Sound
            volume={volume}
            url={QuestionSound}
            playStatus={playSound}
            onFinishedPlaying={() => setPlaySound("STOPPED")}
          />
          <div className={styles.content} style={{ fontSize: `${fontSize}px` }}>
            {_renderQuestion()}
          </div>
        </>
      )}
      <TimerBar isVD={true} />
    </div>
  );
};

export default Question;

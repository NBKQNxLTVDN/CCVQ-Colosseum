import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";
import ContentQuestion from "../ContentQuestion";

//sounds
import { SoundContext } from "contexts/sound";
import Sound from "react-sound";
import OpenQuestionSound from "../../assets/sounds/Mở câu hỏi.mp4";
import HopeStar from "../HopeStar";

const useStyles = makeStyles((theme) => ({
  Question: {
    backgroundColor: "black",
    borderRadius: "30px",
    padding: "10px",
    animation: "1s ease 0s 1 normal none running zoomIn",
  },
  content: {
    color: "#001226",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    borderRadius: "23px",
    padding: "3% 2%",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    textAlign: "justify",
    justifyContent: "center",
    // position: "relative",
  },
  valueQuestion: {
    backgroundColor: "#C4C4C4",
    position: "absolute",
    top: 0,
    left: 0,
    boxShadow: "inset 5px 5px 5px #000",
    border: "2px solid black",
    padding: "1% 2%",
    margin: "5%",
    borderRadius: "20px",
    fontSize: "5vh",
    animation: "2s ease 0s 1 normal none running flipInX",
  },
}));

const Question = ({ player }) => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

  const [question, setQuestion] = useState(null);
  const [soundUrl, setSoundUrl] = useState("");

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    socket.on("VD:sendQuestion", (data) => {
      setDisplay(false);
      setQuestion(data.questions);
      setDisplay(true);
      setSoundUrl(OpenQuestionSound);
    });
    return () => {
      socket.off("VD:sendQuestion");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.Question} style={{ position: "relative" }}>
      <Sound
        volume={volume}
        url={soundUrl}
        playStatus={"PLAYING"}
        onFinishedPlaying={() => {
          setSoundUrl(null);
        }}
      />
      {display && (
        <div
          className={styles.content}
          style={{
            animation: "3s ease 0s 1 normal none running fadeInUp",
          }}
        >
          {!question ? (
            <div style={{ textAlign: "center", position: "relative" }}>
              {/* Phần thi về đích của {players[player - 1].name}
              <br /> xin được phép bắt đầu */}
            </div>
          ) : (
            <>
              <ValueQuestion score={question.score} />
              <ContentQuestion question={question.data} />
            </>
          )}
        </div>
      )}
      <HopeStar />
    </div>
  );
};

let timeout;

const ValueQuestion = ({ score }) => {
  const styles = useStyles();

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    timeout = setTimeout(() => {
      setDisplay(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>{display && <div className={styles.valueQuestion}>{score} ĐIỂM</div>}</>
  );
};

export default Question;

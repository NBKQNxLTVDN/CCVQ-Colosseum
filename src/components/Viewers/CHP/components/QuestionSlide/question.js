import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

import Background from "../../assets/images/background_question.png";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import OpenQuestionSound from "../../assets/sounds/Mở câu hỏi.mp4";

const useStyles = makeStyles((theme) => ({
  Question: {
    animation: "1s ease 0s 1 normal none running zoomIn",
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
  },
  content: {
    position: "absolute",
    zIndex: 10,
    fontSize: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: "5%",
  },
}));

const Question = ({ question }) => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

  const [ques, setQuestion] = useState(question);
  const [soundUrl, setSoundUrl] = useState(OpenQuestionSound);

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    socket.on("CHP:sendQuestion", (data) => {
      setDisplay(false);
      setQuestion(data.question);
      setDisplay(true);
      setSoundUrl(OpenQuestionSound);
    });
    return () => {
      socket.off("CHP:sendQuestion");
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
      <img className={styles.background} alt="background" src={Background} />
      {display && <div className={styles.content}>{ques?.question}</div>}
    </div>
  );
};

export default Question;

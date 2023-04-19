import React, { useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import Background from "../assets/QuestionScreen/questionTTTL.png";
import Question from "./question.js";
import Timer from "./timer.js";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import StartQues from "../assets/Sounds/SoundStartQuesTCTT.mp3";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "absolute",
    top: "0%",
    left: "0%",
    height: "100vh",
    width: "100vw",
    zIndex: 1,
  },
}));

const QuestionSlide = (props) => {
  const styles = useStyles();
  const { volume } = useContext(SoundContext);
  const [playSound, setPlaySound] = useState("PLAYING");

  return (
    <div>
      {!props.dataSolution && (
        <Sound
          volume={volume}
          url={StartQues}
          playStatus={playSound}
          onFinishedPlaying={() => setPlaySound("STOPPED")}
        />
      )}
      <img alt="background" src={Background} className={styles.background} />
      <Question slide={props.slide} dataSolution={props.dataSolution} />
      <Timer slide={props.slide} />
    </div>
  );
};

export default QuestionSlide;

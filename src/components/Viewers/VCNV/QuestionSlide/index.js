import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import Background from "../assets/QuestionScreen/questionVCNV-TTTL.png";
import Bell from "../Bell";
import Crossword from "../CrosswordSlide/crossword.js";
import Question from "./question.js";
import Timer from "./timer.js";

import { SoundContext } from "contexts/sound";
import Sound from "react-sound";
import QuestionCTC from "../assets/Sounds/QuestionCTC.mp3";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "100vh",
    width: "100vw",
    zIndex: 1,
  },
  crossword: {
    width: "39%",
    height: "30%",
    position: "absolute",
    top: "68%",
    left: "82%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
}));

const QuestionSlide = ({ crossword, status }) => {
  const styles = useStyles();
  const [playSound, setPlaySound] = useState("PLAYING");
  const { volume } = useContext(SoundContext);

  return (
    <>
      <Sound
        volume={volume}
        url={QuestionCTC}
        playStatus={playSound}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      <img alt="background" src={Background} className={styles.background} />
      <Question />
      <div className={styles.crossword}>
        <Crossword crossword={crossword} status={status} size="medium" />
      </div>
      <Timer />
      <Bell direction="row" />
    </>
  );
};

export default QuestionSlide;

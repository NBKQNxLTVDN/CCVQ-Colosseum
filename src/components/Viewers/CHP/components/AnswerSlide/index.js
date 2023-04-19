import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import Background from "../../assets/images/background_screen.png";
import AnswerUser from "./answeruser";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import SoundResult from "../../assets/sounds/SoundResultTCTT.mp3";

const useStyles = makeStyles((theme) => ({
  answerSlide: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateRows: "auto",
    gridGap: "3rem",
    padding: "4rem",
    fontSize: "4vh",
    fontWeight: "bold",
  },
}));

const AnswerSlide = ({ Candidate }) => {
  const styles = useStyles();
  const { volume } = useContext(SoundContext);
  const [playSound, setPlaySound] = useState("PLAYING");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!Candidate.map((item) => item.status).includes("null")) {
      setPlaySound("STOPPED");
      setDisplay(true);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.answerSlide}>
      <Sound
        volume={volume}
        url={SoundResult}
        playStatus={playSound}
        onPlaying={(props) => {
          if (props.position >= 2000) setDisplay(true);
        }}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      {Candidate &&
        Candidate.map((player, index) => (
          <AnswerUser display={display} player={player} index={index + 1} />
        ))}
    </div>
  );
};

export default AnswerSlide;

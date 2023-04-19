import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";

import Info from "../../components/Info";

import Background from "../../assets/images/background_choose_scores.png";
import ColumnScore from "../../components/ColumsScore";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";

import IntroSound from "../../assets/sounds/Intro MDTC.mp4";

const useStyles = makeStyles((theme) => ({
  screen: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    fontFamily: "Verdana",
  },
  background: {
    width: "100vw",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  content: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    padding: "5%",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    columnGap: "5%",
  },
}));

const SetQuestionsScreen = (props) => {
  const styles = useStyles();
  const { player, field, review } = props;
  const [playSound, setPlaySound] = useState("PLAYING");

  const { volume } = useContext(SoundContext);
  return (
    <div className={styles.screen}>
      <Sound
        volume={volume}
        url={IntroSound}
        playStatus={playSound}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      <img src={Background} alt="background" className={styles.background} />
      <div className={styles.content}>
        <ColumnScore />
        <Info playerId={player} field={field} review={review} />
      </div>
    </div>
  );
};

export default SetQuestionsScreen;

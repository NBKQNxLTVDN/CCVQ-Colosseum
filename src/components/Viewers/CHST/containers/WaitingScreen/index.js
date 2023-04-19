import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";

import Background from "../../assets/images/background.png";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";

import StartSound from "../../assets/sounds/Thí sinh bước lên phần thi của mình.mp4";
import EndSound from "../../assets/sounds/Về vị trí.mp4";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100vw",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const WaitingScreen = ({ isEnd }) => {
  const styles = useStyles();
  const [playSound, setPlaySound] = useState("PLAYING");
  const { volume } = useContext(SoundContext);

  return (
    <>
      <Sound
        volume={volume}
        url={isEnd ? EndSound : StartSound}
        playStatus={playSound}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      <img src={Background} alt="background" className={styles.background} />
    </>
  );
};

export default WaitingScreen;

import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
import WaitingScreen from "./containers/WaitingScreen";
import InPlaygroundScreen from "./containers/InPlaygroundScreen";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import KDIntro from "./assets/sounds/KDIntro.mp4";
import KDStartTurn from "./assets/sounds/KDStartTurn.mp4";
import KDFinishTurn from "./assets/sounds/KDFinishTurn.mp4";

const useStyles = makeStyles((theme) => ({
  KDviewer: {
    width: "100vw",
    height: "100vh",
    fontFamily: "Verdana",
  },
}));

const ViewerKD = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  // eslint-disable-next-line
  const [player, setPlayer] = useState(localStorage.getItem("KD_player") - 1);
  const [display, setDisplay] = useState(true);
  const [isViewWaitingScreen, setIsViewWaitingScreen] = useState(
    localStorage.getItem("KD_isViewWaitingScreen") !== "false"
  );

  const [soundUrl, setSoundUrl] = useState(KDIntro);

  useEffect(() => {
    socket.on("KD:ready", (data) => {
      if (data.status) {
        localStorage.removeItem("question");
        localStorage.removeItem("timeStart");
        localStorage.removeItem("timer");
        localStorage.removeItem("KD_player");
        localStorage.removeItem("soundStatus");
        setSoundUrl(null);
        setDisplay(false);
        setIsViewWaitingScreen(false);
        localStorage.setItem("KD_isViewWaitingScreen", false);
        setPlayer(data.player - 1);
        localStorage.setItem("KD_player", data.player);
        setSoundUrl(KDStartTurn);
        setDisplay(true);
      }
    });

    return () => {
      socket.off("KD:ready");
    };
    //eslint-disable-next-line
  }, []);

  const handleEndRound = () => {
    setSoundUrl(KDFinishTurn);
    setIsViewWaitingScreen(true);
    localStorage.setItem("KD_isViewWaitingScreen", true);
  };

  return (
    <div className={styles.KDviewer}>
      <Sound
        volume={volume}
        url={soundUrl}
        playStatus={localStorage.getItem("question") ? "STOPPED" : "PLAYING"}
        onFinishedPlaying={() => {
          setSoundUrl(null);
        }}
      />
      {display && (
        <>
          {isViewWaitingScreen ? (
            <WaitingScreen />
          ) : (
            <InPlaygroundScreen
              // player={JSON.parse(localStorage.getItem("players"))[player]}
              handleEndRound={handleEndRound}
            />
          )}s
        </>
      )}
    </div>
  );
};

export default ViewerKD;

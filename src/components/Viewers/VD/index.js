import React, { useState, useEffect, useContext } from "react";

//material-ui
import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

import QuestionContainer from "./containers/QuestionsContainers";
import WaitingScreen from "./containers/WaitingScreen";
import ChooseValuesQuestionScreen from "./containers/ChooseValuesQuestionScreen";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import VDIntro from "./assets/sounds/Intro MDTC.mp4";
import ChoosePlayerSound from "./assets/sounds/Thí sinh bước lên phần thi của mình.mp4";
import EndGameSound from "./assets/sounds/Về vị trí.mp4";

//styles
const useStyles = makeStyles((theme) => ({
  ViewerVD: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "Verdana",
  },
}));

const ViewerVD = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  const [player, setPlayer] = useState(1);
  const [screen, setScreen] = useState(1);
  const [soundUrl, setSoundUrl] = useState(VDIntro);

  const [display, setDisplay] = useState(true);

  useEffect(() => {
    socket.on("VD:init_data", (data) => {
      setSoundUrl(null);
      setScreen(1);
      setPlayer(parseInt(data.player));
      setSoundUrl(ChoosePlayerSound);
    });

    socket.on("VD:swap_screen", (data) => {
      if (data.screen === "question") {
        setDisplay(false);
        setScreen(3);
        setDisplay(true);
      } else if (data.screen === "value") {
        setDisplay(false);
        setScreen(2);
        setDisplay(true);
      }
    });

    socket.on("VD:status", (data) => {
      if (data.status === "end") {
        setDisplay(false);
        setScreen(1);
        setDisplay(true);
        setSoundUrl(EndGameSound);
      }
    });

    return () => {
      socket.off("VD:init_data");
      socket.off("VD:swap_screen");
      socket.off("VD:status");
    };
    //eslint-disable-next-line
  }, []);

  const _renderScreen = () => {
    switch (screen) {
      case 1:
        return <WaitingScreen />;
      case 2:
        return <ChooseValuesQuestionScreen />;
      case 3:
        return <QuestionContainer playerOrder={player} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.ViewerVD}>
      <Sound
        volume={volume}
        url={soundUrl}
        playStatus={screen === 1 ? "PLAYING" : "PAUSED"}
        onFinishedPlaying={() => {
          setSoundUrl(null);
        }}
      />
      {display && _renderScreen()}
    </div>
  );
};

export default ViewerVD;

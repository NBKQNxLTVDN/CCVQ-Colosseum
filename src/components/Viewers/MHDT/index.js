//material-ui
import { makeStyles } from "@mui/styles";
//socket
import { socket } from "service/socket";
import React, { useContext, useEffect, useState } from "react";
import PopupPlayerInfo from "./components/PopupPlayerInfo";
//components
import ViewFullPlayersScreen from "./containers/ViewFullPlayersScreen";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";

import Welcome from "./assets/sounds/WelcomeContestants.mp3";
import TKDSound from "./assets/sounds/TKĐ.mp4";
import Award from "./assets/sounds/Award.mp3";

//styles
const useStyles = makeStyles((theme) => ({
  ViewerMHDT: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "'Montserrat', sans-serif",
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
}));

const ViewerMHDT = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

  const [isShowFullScore, setIsShowFullScore] = useState(
    localStorage.getItem("showFullScore") || false
  );
  const [url, setUrl] = useState();
  const [soundStatus, setSoundStatus] = useState("PAUSED");

  useEffect(() => {
    socket.on("mhdt:changeSlide", (data) => {
      if (data.status) {
        setIsShowFullScore((prevState) => !prevState);
        localStorage.setItem("showFullScore", data.status);
      }
    });

    socket.on("mhdt:playSound", (data) => {
      if (data.name === "intro") setUrl(TKDSound);
      if (data.name === "award") setUrl(Award);
      if (data.name === "welcome") setUrl(Welcome);
      setSoundStatus("PLAYING");
    });

    return () => {
      socket.off("mhdt:changeSlide");
      socket.off("mhdt:playIntro");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.ViewerMHDT}>
      <Sound
        volume={volume}
        url={url}
        playStatus={soundStatus}
        onFinishedPlaying={() => {
          setSoundStatus("STOPPED");
        }}
      />
      {isShowFullScore ? <ViewFullPlayersScreen /> : <PopupPlayerInfo />}
    </div>
  );
};

export default ViewerMHDT;

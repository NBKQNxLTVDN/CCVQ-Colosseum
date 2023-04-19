import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
import Background from "../assets/AnswerScreen/background.png";
import AnswerUser from "./answeruser";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import RingerBell from "../assets/Sounds/RingerBell.mp3";
import ResultCTC from "../assets/Sounds/ResultCTC.mp3";

const useStyles = makeStyles((theme) => ({
  answerSlide: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    gridGap: "2rem",
    padding: "4rem",
    fontSize: "4vh",
    fontWeight: "bold",
  },
}));

const AnswerSlide = ({ data }) => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  const [display, setDisplay] = useState(
    localStorage.getItem("display") === "true"
  );
  const [url, setUrl] = useState(ResultCTC);
  const [playSound, setPlaySound] = useState("PLAYING");
  const [bellRank, setBellRank] = useState(
    JSON.parse(localStorage.getItem("bellRank")) || []
  );

  useEffect(() => {
    socket.on("ccvq:bell_signal", (data) => {
      setPlaySound("STOPPED");
      setUrl(RingerBell);
      setPlaySound("PLAYING");
      setBellRank((bellRank) => [...bellRank, data.order]);
    });

    socket.on("ccvq:bellStatus", (data) => {
      if (data.status === "open") setBellRank([]);
    });

    return () => {
      socket.off("ccvq:bell_signal");
      socket.off("ccvq:resetAllBells");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("bellRank", JSON.stringify(bellRank));
  }, [bellRank]);

  return (
    <div className={styles.answerSlide}>
      <Sound
        volume={volume}
        url={url}
        playStatus={playSound}
        onPlaying={(props) => {
          if (props.position > 2000) {
            setDisplay(true);
            localStorage.setItem("display", "true");
          }
        }}
        onFinishedPlaying={() => {
          setPlaySound("STOPPED");
          localStorage.removeItem("url");
        }}
      />
      {data &&
        data.map((player, index) => (
          <AnswerUser
            display={display}
            player={player}
            bellRank={bellRank.indexOf(index + 1)}
          />
        ))}
    </div>
  );
};

export default AnswerSlide;

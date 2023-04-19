import { makeStyles } from "@mui/styles";
import { MainContext } from "contexts/MainContext";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "service/socket";
import Background from "../assets/HorizantalQuizScreen/bell.png";
import bellQuesSlide from "../assets/HorizantalQuizScreen/bellQuesSlide.png";

import { SoundContext } from "contexts/sound";
import Sound from "react-sound";
import RingerBell from "../assets/Sounds/RingerBell.mp3";

const useStyles = makeStyles((theme) => ({
  bellColumn: {
    position: "absolute",
    zIndex: 3,
    transform: "translate(-50%, -50%)",
    top: "8%",
    left: "50%",
    height: "8%",
    width: "95%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    alignItems: "center",
  },
  bellRow: {
    position: "absolute",
    zIndex: 3,
    transform: "translate(-50%, -50%)",
    top: "32.8%",
    left: "90.8%",
    height: "26%",
    width: "15%",
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
  },
  name: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0%",
    left: "0%",
    display: "flex",
    fontSize: "3.25vh",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Bell = ({ direction }) => {
  const styles = useStyles();

  const { players } = useContext(MainContext);
  const { volume } = useContext(SoundContext);
  const [playSound, setPlaySound] = useState("STOPPED");
  const [bellRank, setBellRank] = useState(
    JSON.parse(localStorage.getItem("bellRank")) || []
  );

  useEffect(() => {
    socket.on("ccvq:bell_signal", (data) => {
      setPlaySound("STOPPED");
      setPlaySound("PLAYING");
      setBellRank((bellRank) => [...bellRank, data.order]);
    });

    socket.on("ccvq:bellStatus", (data) => {
      if (data.status === "open") setBellRank([]);
    });

    return () => {
      socket.off("ccvq:bell_signal");
      socket.off("ccvq:bellStatus");
    };
    //eslint-disable-next-line
  });

  useEffect(() => {
    localStorage.setItem("bellRank", JSON.stringify(bellRank));
  }, [bellRank]);

  switch (direction) {
    case "column":
      return (
        <div className={styles.bellColumn}>
          <Sound
            volume={volume}
            url={RingerBell}
            playStatus={playSound}
            onFinishedPlaying={() => setPlaySound("STOPPED")}
          />
          {bellRank.map(
            (item, index) =>
              item && (
                <div style={{ position: "relative" }}>
                  <img
                    alt="background"
                    src={Background}
                    style={{ width: "85%" }}
                  />
                  <div className={styles.name}>
                    {`${index + 1}. ${players[item - 1].name}`}
                  </div>
                </div>
              )
          )}
        </div>
      );

    case "row":
      return (
        <div className={styles.bellRow}>
          <Sound
            volume={volume}
            url={RingerBell}
            playStatus={playSound}
            onFinishedPlaying={() => setPlaySound("STOPPED")}
          />
          {bellRank.map(
            (item, index) =>
              item && (
                <div style={{ position: "relative" }}>
                  <img
                    alt="background"
                    src={bellQuesSlide}
                    style={{ width: "100%" }}
                  />
                  <div
                    className={styles.name}
                    style={{ paddingBottom: "5%", fontSize: "2.25vh" }}
                  >
                    {`${index + 1}. ${players[item - 1].name}`}
                  </div>
                </div>
              )
          )}
        </div>
      );

    default:
      return null;
  }
};

export default Bell;

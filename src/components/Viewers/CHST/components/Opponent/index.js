import React, { useState, useEffect, useContext } from "react";
import { socket } from "service/socket";
import { makeStyles } from "@mui/styles";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import RingerBell from "../../assets/sounds/RingerBell.mp3";

import PlayerName from "../../assets/images/name_bar.png";

const useStylesOpponent = makeStyles((theme) => ({
  opponent: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "3.5vh",
  },
  playerName: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    zIndex: 3,
    borderRadius: "10px",
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  wrap: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    opacity: 0.8,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3,
    color: "white",
    border: "5px solid white",
    borderRadius: "10px",
  },
}));

const Opponent = (props) => {
  const { order, name, score } = props;
  const styles = useStylesOpponent();
  const { volume } = useContext(SoundContext);
  const [playSound, setPlaySound] = useState("STOPPED");
  const [bell, setBell] = useState(false);

  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      if (data.order === order) {
        setBell(true);
        setPlaySound("PLAYING");
        socket.emit("controller:talk", {
          receivers: ["client"],
          eventName: "ccvq:bellStatus",
          data: {
            status: "block",
          },
        });
      }
    });

    socket.on("ccvq:bellStatus", (data) => {
      if (data.status === "open") {
        setBell(false);
      }
    });

    return () => {
      socket.off("client:bell_signal");
      socket.off("ccvq:bellStatus");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.opponent}>
      <Sound
        volume={volume}
        url={RingerBell}
        playStatus={playSound}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      <img alt="name" src={PlayerName} className={styles.background} />
      <div
        className={styles.playerName}
        style={
          bell
            ? {
                backgroundColor: "red",
                border: "5px solid white",
                color: "white",
              }
            : {}
        }
      >
        {name} {score}
      </div>
    </div>
  );
};

export default Opponent;

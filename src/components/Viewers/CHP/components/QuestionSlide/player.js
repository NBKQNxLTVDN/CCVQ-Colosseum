import { makeStyles } from "@mui/styles";
import React, { useState, useContext } from "react";
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import RingerBell from "../../assets/sounds/RingerBell.mp3";
// import Background from "../../assets/images/background_oppnent.png";

const useStyles = makeStyles((theme) => ({
  player: {
    maxWidth: "400px",
    maxHeight: "180px",
    position: "relative",
    width: "100%",
    height: "95%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "20px",
    clipPath: "polygon(5% 0, 95% 0, 100% 15%, 100% 85%, 95% 100%, 5% 100%, 0 85%, 0 15%)",
  },
  active: {
    maxWidth: "400px",
    maxHeight: "180px",
    position: "relative",
    width: "100%",
    height: "95%",
    backgroundColor: "rgba(46,125,50,1)",
    // border: "2px outset rgba(255, 255, 255, 1)",
    borderRadius: "20px",
    clipPath: "polygon(5% 0, 95% 0, 100% 15%, 100% 85%, 95% 100%, 5% 100%, 0 85%, 0 15%)",
  },
  background: {
    position: "absolute",
    left: 0,
    width: "100%",
  },
  name: {
    position: "absolute",
    top: "40%",
    left: "3%",
    zIndex: 3,
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  score: {
    position: "absolute",
    top: "20%",
    right: "5%",
    zIndex: 3,
    color: "white",
    fontSize: "5rem",
    fontWeight: "bold",
    textShadow: "5px 5px 5px #000",
  },
}));

const Player = ({ player, bell }) => {
  const styles = useStyles();
  const { volume } = useContext(SoundContext);
  const [playSound, setPlaySound] = useState("PLAYING");

  // const [active, setActive] = useState("false");
  // const [bellRank, setBellRank] = useState([]);
  // const context = useContext(MainContext);

  // useEffect(() => {
  //   socket.on("ccvq:bell_signal", (data) => {
  //     setBellRank((bellRank) => [...bellRank, data.order]);
  //   });

  //   return () => {
  //     socket.off("ccvq:bell_signal");
  //   }
  // });

  return (
    (bell === player.order) ?
      <>
        <div className={styles.active}>
          <Sound
            volume={volume}
            url={RingerBell}
            playStatus={playSound}
            onFinishedPlaying={() => setPlaySound("STOPPED")}
          />
          <div className={styles.name}>{player.name}</div>
          <div className={styles.score}>{player.score}</div>
          {/* <img
          src={Background}
          alt="background"
          className={styles.background}
          style={{
            top: size >= 3 ? "10%" : "20%",
          }}
        /> */}
        </div>
      </> :
      <>
        <div className={styles.player}>
          <div className={styles.name}>{player.name}</div>
          <div className={styles.score}>{player.score}</div>
        </div>
      </>
  );
};

export default Player;

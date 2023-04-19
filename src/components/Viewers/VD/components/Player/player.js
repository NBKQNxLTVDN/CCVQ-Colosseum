import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
//sound
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import InCorrectAnsSound from "../../assets/sounds/Trả lời sai.mp4";
import CorrectAnsSound from "../../assets/sounds/Trả lời đúng.mp4";

const useStyles = makeStyles((theme) => ({
  playerCard: {
    border: "5px solid black",
    height: "80%",
    marginTop: "20%",
    width: "100%",
    borderRadius: "30px",
    backgroundColor: "#001328",
    boxShadow: "5px 5px 5px #000",
    display: "grid",
    gridTemplateRows: "1fr 1.5fr",
    padding: "5%",
    color: "#FFFFFF",
    animation: "1s ease 0s 1 normal none running fadeInUp",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10%",
    padding: "5% 0",
  },
  name: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3vh",
    fontWeight: "900",
  },
  score: {
    backgroundColor: "white",
    color: "#001328",
    border: "2px solid black",
    boxShadow: "5px 5px 5px #3B0700",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4vh",
    fontWeight: "bold",
  },
  avatarBox: {
    position: "relative",
    backgroundColor: "transparen",
    border: "1px solid black",
    backgroundColor: "white",
    boxShadow: "inset 5px 5px 5px #001328",
    borderRadius: "10px",
    width: "100%",
    bottom: "1px",
  },
  playerOrderAvatar: {
    position: "absolute",
    height: "100%",
    width: "auto",
    left: "30%",
  },
}));

const PlayerCard = ({ player, setBellRank }) => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

  const [soundUrl, setSoundUrl] = useState();

  useEffect(() => {
    socket.on("VD:result_question", (data) => {
      setBellRank([]);
      if (data.status) {
        setSoundUrl(CorrectAnsSound);
      } else {
        setSoundUrl(InCorrectAnsSound);
      }
    });

    return () => {
      socket.off("VD:result_question");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.playerCard}>
      {soundUrl && (
        <Sound
          volume={volume}
          url={soundUrl}
          playStatus={"PLAYING"}
          onFinishedPlaying={() => {
            setSoundUrl(null);
          }}
        />
      )}
      <div className={styles.content}>
        <div className={styles.name}>{player.name}</div>
        <div className={styles.score}>{player.score}</div>
      </div>
      <div className={styles.avatarBox}>
        <img
          alt="ava"
          src={
            `${process.env.PUBLIC_URL}/images/TS${player.order}.png` ||
            `${process.env.PUBLIC_URL}/images/logo.png`
          }
          className={styles.playerOrderAvatar}
        />
      </div>
    </div>
  );
};

export default PlayerCard;

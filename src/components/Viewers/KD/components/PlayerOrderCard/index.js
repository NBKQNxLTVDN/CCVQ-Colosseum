import React, { useState, useEffect, useContext } from "react";

//material-ui
import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import KDCorrectAns from "../../assets/sounds/KDCorrectAns.mp4";
import KDIncorrectAns from "../../assets/sounds/KDIncorrectAns.mp4";

//styles
const useStyles = makeStyles((theme) => ({
  playerOrder: {
    display: "grid",
    gridTemplateRows: "40% 60%",
    height: "100%",
    width: "100%",
    backgroundColor: "#DAD4E2",
    animation: "2s ease 0s 1 normal none running bounceInDown",
  },
  playerOrderName: {
    color: "#3D2147",
    fontWeight: 900,
    fontSize: "4vh",
    animation: "2s ease 0s 1 normal none running flipInX",
  },
  playerOrderInfo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "5%",
    width: "100%",
    height: "100%",
    padding: "20px 20px",
    paddingBottom: "0px",
    alignItems: "center",
  },
  imageBox: {
    margin: "20px 20px",
    border: "1px solid black",
    backgroundColor: "#F7F5F8",
    borderRadius: "10px",
    boxShadow: "inset 0.3rem 0.3rem #000000",
  },
  playerOrderAvatar: {
    marginTop: "5%",
    height: "90%",
    animation: "2s ease 0s 1 normal none running zoomInRight",
  },
  playerOrderScore: {
    height: "100%",
    fontSize: "3.5vw",
    color: "#3D2147",
    fontWeight: 900,
    backgroundColor: "#EEB3A0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    border: "1px solid black",
    boxShadow: "0.5rem 0.5rem 0.5rem #000000",
    animation: "2s ease 0s 1 normal none running flipInX",
  },
}));

let interval1, interval2, interval3;

const PlayerOrderCard = (props) => {
  const styles = useStyles();

  const { player } = props;
  const [soundUrl, setSoundUrl] = useState(null);
  const [score, setScore] = useState(
    localStorage.getItem("KD_score") || player.score
  );
  const [soundStatus, setSoundStatus] = useState("STOPPED");

  const [displayCard, setDisplayCard] = useState(false); // delay 3s
  const [displayPlayerInfo, setDisplayPlayerInfo] = useState(false); // delay 5s
  const [displayAvatar, setDisplayAvatar] = useState(false); // delay 6s

  const { volume } = useContext(SoundContext);

  useEffect(() => {
    if (player.score === 0) return;
    setScore(player.score);
    localStorage.setItem("KD_score", player.score);
    //eslint-disable-next-line
  }, [player]);

  useEffect(() => {
    socket.on("KD:statusQuestion", (data) => {
      setSoundStatus("STOPPED");
      if (data.status) {
        setSoundUrl(KDCorrectAns);
        setScore((prevState) => {
          localStorage.setItem("KD_score", prevState + 10);
          return prevState + 10;
        });
      } else {
        setSoundUrl(KDIncorrectAns);
      }
      setSoundStatus("PLAYING");
    });
    return () => {
      socket.off("KD:statusQuestion");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    interval1 = setTimeout(() => {
      setDisplayCard(true);
    }, 2000);
    interval2 = setTimeout(() => {
      setDisplayPlayerInfo(true);
    }, 3000);
    interval3 = setTimeout(() => {
      setDisplayAvatar(true);
    }, 4000);

    return () => {
      clearTimeout(interval1);
      clearTimeout(interval2);
      clearTimeout(interval3);
    };
  }, []);

  return (
    <>
      {displayCard && (
        <div className={styles.playerOrder}>
          {soundUrl && (
            <Sound
              volume={volume}
              url={soundUrl}
              playStatus={soundStatus}
              onFinishedPlaying={() => setSoundStatus("STOPPED")}
            />
          )}
          <div className={styles.playerOrderInfo}>
            {displayPlayerInfo && (
              <>
                <div className={styles.playerOrderName}>{player.name}</div>
                <div className={styles.playerOrderScore}>{score}</div>
              </>
            )}
          </div>
          <div className={styles.imageBox}>
            {displayAvatar && (
              <img
                alt="avatar"
                src={
                  `${process.env.PUBLIC_URL}/images/TS${player.order}.png` ||
                  `${process.env.PUBLIC_URL}/images/logo.png`
                }
                className={styles.playerOrderAvatar}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerOrderCard;

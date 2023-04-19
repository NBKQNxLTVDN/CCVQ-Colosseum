import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

import Background from "../../assets/images/score_bar.png";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";

import ChooseQuestionSound from "../../assets/sounds/chọn các câu hỏi.mp4";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    "&::before": {
      content: '""',
      height: "136%",
      width: "35%",
      backgroundColor: "black",
      position: "absolute",
      top: "-27%",
      left: "-33%",
      borderRadius: "50%",
      boxShadow: "inset 5px 5px 5px orange",
      border: "5px solid white",
    },
    boxShadow: "5px 5px 5px #000",
    animation: "1s ease 0s 1 normal none running fadeInLeft",
  },
  background: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  rowDefault: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "5%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3.5vh",
  },
  score: {
    height: "12.1vh",
    width: "6.17vw",
    backgroundColor: "#e5311f",
    position: "absolute",
    top: "-86%",
    left: "-37%",
    borderRadius: "50%",
    boxShadow: "inset 5px 5px 5px black",
    border: "5px solid white",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3.5vh",
  },
}));

let timeOut = null;

const Row = (props) => {
  const { id } = props;
  const styles = useStyles();
  const [score, setScore] = useState(null);
  const [display, setDisplay] = useState(false);

  const { volume } = useContext(SoundContext);
  const [playStatus, setPlayStatus] = useState("PLAYING");

  useEffect(() => {
    socket.on("CHST:chooseValueQuestion", (data) => {
      if (data.id === id) {
        setScore(data.score);
      }
    });
    return () => {
      socket.off("CHST:chooseValueQuestion");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    timeOut = setTimeout(() => {
      setDisplay(true);
    }, 500 * id + 500);
    return () => {
      clearTimeout(timeOut);
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {score ? (
        <div style={{ position: "relative" }}>
          <Sound
            volume={volume}
            url={ChooseQuestionSound}
            playStatus={playStatus}
            onFinishedPlaying={() => setPlayStatus("STOPPED")}
          />
          <div className={styles.score}>{score}</div>
        </div>
      ) : (
        display && (
          <div className={styles.container}>
            <img
              src={Background}
              alt="background"
              className={styles.background}
            />
            <div className={styles.rowDefault}>
              {[10, 20, 30].map((value) => (
                <div>{value}</div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Row;

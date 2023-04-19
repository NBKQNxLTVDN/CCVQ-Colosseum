import { makeStyles } from "@mui/styles";
import { MainContext } from "contexts/MainContext";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "service/socket";
import Background from "../../assets/images/background_screen.png";

import Player from "./player";
import Question from "./question.js";
import Timer from "./timer";

const useStyles = makeStyles((theme) => ({
  QuestionContainer: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    border: "1px solid black",
    padding: "3%",
    zIndex: 2,
    display: "grid",
    gridTemplateColumns: "11fr 4fr",
    gridGap: "2%",
  },
  box: {
    border: "1px solid black",
    height: "100%",
    width: "100%",
    borderRadius: "30px",
    backgroundColor: "orange",
  },
  rightContainer: {
    position: "relative",
    display: "grid",
    gridTemplateRows: "3fr 1fr",
    height: "100%",
  },
  leftContainer: {
    display: "grid",
    gridTemplateRows: "10fr 1fr",
    rowGap: "5%",
  },
  players: {
    display: "grid",
    gridTemplateRows: "auto",
  },
  count: {
    position: "absolute",
    background: "#810017",
    width: "55%",
    height: "25%",
    bottom: "0",
    right: "20%",
    clipPath:
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
    fontSize: "10rem",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textShadow: "5px 5px 5px #000",
    boxShadow: "inset 5px 5px 5px #000",
  },
}));

const QuestionSlide = ({ question }) => {
  const styles = useStyles();
  const context = useContext(MainContext);
  const [playerActive, setPlayerActive] = useState(0);
  const [playerOrder, setPlayerOrder] = useState(0);
  const [bellRank, setBellRank] = useState([]);

  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      setBellRank((bellRank) => [...bellRank, data.order]);      
    });

    socket.on("ccvq:bellStatus", (data) => {
      // if (data.status === "open"){
      //   setPlayerActive(playerOrder);
      // }
      if (data.status === "open") setBellRank([]);
    });

    return () => {
      socket.off("client:bell_signal");
      socket.off("ccvq:bellStatus");
    };
  }, []);

  useEffect(() => {
    setPlayerActive(bellRank[0]);
  }, [bellRank]);

  const players = context.players.filter(
    (player) =>
      player.score ===
      Math.max(...context.players.map((player) => player.score))
  );

  return (
    <div className={styles.QuestionContainer}>
      <img alt="background" src={Background} className={styles.background} />
      <div className={styles.content}>
        <div className={styles.leftContainer}>
          <Question question={question} />
          <Timer />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.players}>
            {players.map(( player ) => (
              <Player player={player} bell={playerActive}/>
            ))}
          </div>
          <div className={styles.count}>{question?.id}</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSlide;

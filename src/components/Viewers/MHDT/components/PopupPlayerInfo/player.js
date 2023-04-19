import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import ScoreFrame from "../../assets/images/ViewEachPlayersScreen/player.png";

import { MainContext } from "contexts/MainContext";

const useStyles = makeStyles(() => ({
  player: {
    display: "grid",
    gridTemplateRows: "77% 23%",
    width: "40vw",
    height: "47vh",
  },
  scoreFrame: {
    width: "40vw",
    height: "46vh",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: "40%",
    bottom: "25%",
    right: "10%",
    zIndex: 0,
  },
  name: {
    bottom: "30%",
    color: "#fbf6f5",
    fontWeight: 600,
    fontSize: "3vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  score: {
    position: "absolute",
    top: "25%",
    left: "7%",
    color: "black",
    fontWeight: 800,
    fontSize: "7vw",
    zIndex: 1,
  },
}));

const Player = (props) => {
  const { rank, order } = props;
  const styles = useStyles();

  const { players } = useContext(MainContext);

  const _renderRank = () => {
    switch (rank) {
      case 1:
        return ScoreFrame;
      case 2:
        return ScoreFrame;
      case 3:
        return ScoreFrame;
      case 4:
        return ScoreFrame;

      default:
        return null;
    }
  };

  return (
    <div className={styles.player}>
      <img alt="scoreFrame" src={_renderRank()} className={styles.scoreFrame} />
      <img
        alt="avatar"
        src={
          `${process.env.PUBLIC_URL}/images/TS${order}.png` ||
          `${process.env.PUBLIC_URL}/images/logo.png`
        }
        className={styles.avatar}
      />
      <div className={styles.name}>{players[order - 1].name}</div>
      <div className={styles.score}>{players[order - 1].score}</div>
    </div>
  );
};

export default Player;

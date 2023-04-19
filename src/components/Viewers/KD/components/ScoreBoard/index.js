import React, { useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { MainContext } from "contexts/MainContext";
import OpponentCard from "../OpponentsCard";
// import PlayerOrderCard from "../PlayerOrderCard";

const useStyles = makeStyles(() => ({
  scoreBoard: {
    display: "grid",
    gridTemplateColumns: "75% 25%",
  },
  otherOpponents: {
    position: "absolute",
    bottom: "6%",
    left: "5%",
    width: "90%",
    height: "18%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "3rem",
  },
  // playerOrder: {
  //   position: "absolute",
  //   bottom: "6%",
  //   right: "3.5%",
  //   height: "35%",
  //   width: "20%",
  // },
}));

const ScoreBoard = () => {
  const styles = useStyles();
  const { players } = useContext(MainContext);
  const [bellRank, setBellRank] = useState([]);
  // const otherOpponents = players.filter(function (player) {
  //   return player.order !== playerOrder;
  // });

  // const player = players[playerOrder - 1];

  return (
    <div className={styles.scoreBoard}>
      <div className={styles.otherOpponents}>
        {players.map((player) => (
          <OpponentCard
            player={player}
            bellRank={bellRank}
            setBellRank={setBellRank} />
        ))}
      </div>
      {/* <div className={styles.playerOrder}>
        <PlayerOrderCard player={player} />
      </div> */}
    </div>
  );
};

export default ScoreBoard;

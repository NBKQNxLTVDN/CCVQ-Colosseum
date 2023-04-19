import React, { useContext, useState } from "react";

import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";

import PlayerCard from "./player";
import OpponentCard from "./opponent";

const useStyles = makeStyles((theme) => ({
  Player: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "2.4fr 2.2fr",
    gap: "2%",
    paddingTop: "10%",
  },
  opponent: {
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: "4%",
  },
}));

const Player = ({ playerOrder }) => {
  const styles = useStyles();
  const { players } = useContext(MainContext);

  const [bellRank, setBellRank] = useState([]);
  // eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const forceUpdate = () => setSeed(Math.random());

  return (
    <div className={styles.Player}>
      <div className={styles.opponent}>
        {players
          .filter((player) => player.order !== playerOrder)
          .map((player, idx) => (
            <OpponentCard
              key={idx}
              idx={idx + 1}
              player={player}
              bellRank={bellRank}
              setBellRank={setBellRank}
              forceUpdate={forceUpdate}
            />
          ))}
      </div>
      {playerOrder && (
        <PlayerCard
          setBellRank={setBellRank}
          player={players[playerOrder - 1]}
        />
      )}
    </div>
  );
};

export default Player;

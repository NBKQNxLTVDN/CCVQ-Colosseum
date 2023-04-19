import React from "react";

//components
import PLAYER1 from "./player1";
import PLAYER2 from "./player2";
import PLAYER3 from "./player3";
import PLAYER4 from "./player4";

const PlayerInfo = (props) => {
  const { player } = props;

  switch (player.order) {
    case 1:
      return <PLAYER1 player={player} />;
    case 2:
      return <PLAYER2 player={player} />;
    case 3:
      return <PLAYER3 player={player} />;
    case 4:
      return <PLAYER4 player={player} />;
    default:
      return <></>;
  }
};

export default PlayerInfo;

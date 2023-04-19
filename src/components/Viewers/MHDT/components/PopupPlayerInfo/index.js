import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
//images
import Background from "../../assets/images/ViewEachPlayersScreen/background.png";
//components
import Player from "./player";

const useStyles = makeStyles((theme) => ({
  screen: {
    width: "100vw",
    height: "100vh",
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
  mainPlayer: {
    position: "absolute",
    top: "30%",
    left: "30%",
  },
  subPlayer: {
    position: "absolute",
    top: "30%",
    left: "5%",
  },
}));

const PopupPlayerInfo = () => {
  const styles = useStyles();

  const [order, setOrder] = useState(false);

  const [rankPlayer, setRankPlayer] = useState(null);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    socket.on("mhdt:showPlayer", (data) => {
      setDisplay(false);
      setOrder(data.id);
      setRankPlayer((prevState) => {
        if (prevState === 4) return prevState;
        else return prevState + 1;
      });
      setDisplay(true);
    });

    return () => {
      socket.off("mhdt:showPlayer");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.screen}>
      <img alt="background" src={Background} className={styles.background} />
      <div className={styles.mainPlayer}>
        {rankPlayer && display && <Player rank={rankPlayer} order={order} />}
      </div>
    </div>
  );
};

export default PopupPlayerInfo;

import React, { useState, useEffect, useContext } from "react";

import { MainContext } from "contexts/MainContext";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    columnGap: "10%",
    rowGap: "10%",
  },
  player: {
    padding: 28,
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.info.main,
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  img: {
    height: "80%",
    maxWidth: "100%",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%,0)",
  },
  tag: {
    padding: "10px 20px",
    backgroundColor: "green",
    color: "white",
    fontWeight: "bold",
    borderRadius: 10,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
}));

const Players = () => {
  const styles = useStyles();
  const [playerActive, setPlayerActive] = useState(0);
  const { players } = useContext(MainContext);

  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      setPlayerActive(data.order);
    });

    return () => {
      socket.off("client:bell_signal");
    };
  }, []);

  return (
    <div className={styles.container}>
      {players.map((player) => (
        <div
          className={styles.player}
          style={
            playerActive === player.order
              ? {
                backgroundColor: "#EC8A17",
                boxShadow: "5px 5px 5px black",
                border: "1px solid black",
              }
              : {}
          }
        >
          <div
            style={{
              borderRadius: 30,
              height: "60%",
              backgroundColor:
                playerActive === player.order ? "#C4C4C4" : "#51AFC3",
              boxShadow:
                playerActive === player.order
                  ? "inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
                  : "0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "100%",
              position: "relative",
            }}
          >
            <img
              alt="avatar"
              src={
                `${process.env.PUBLIC_URL}/images/TS${player.order}.png` ||
                `${process.env.PUBLIC_URL}/images/logo.png`
              }
              className={styles.img}
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              className={styles.tag}
              style={{
                backgroundColor:
                  playerActive === player.order ? "#2e7d32" : "#EC8A17",
              }}
            >
              {player.name}
            </div>
            <div className={styles.tag} style={{ backgroundColor: "#c62828" }}>
              {player.score}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Players;

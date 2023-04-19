import React, { useEffect, useContext } from "react";
// import CalcCounter from "../CalcCounter";
import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  scoreboard: {
    position: "absolute",
    zIndex: 3,
    top: 0,
    left: 0,
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    width: "100%",
    height: "150px",
    userSelect: "none",
  },
  player: {
    width: "300px",
    height: "120px",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  currentHighlight: {
    position: "absolute",
    top: "25px",
    left: "25px",
    zIndex: 2,
    width: "34px",
    height: "auto",
  },
  name: {
    position: "absolute",
    top: "82px",
    left: "99px",
    zIndex: 2,
    width: "195px",
    height: "36px",
    fontSize: "25px",
    lineHeight: "36px",
    fontWeight: "bold",
    color: "black",
    textOverflow: "ellipsis",
    overflow: "hidden",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  score: {
    position: "absolute",
    top: "23px",
    left: "89px",
    zIndex: 2,
    width: "205px",
    height: "48px",
    fontSize: "40px",
    lineHeight: "48px",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
}));

const Scoreboard = (props) => {
  const styles = useStyles();
  const { players, action } = useContext(MainContext);

  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      action.setBellRinger(parseInt(data.order));
    });
    return () => {
      socket.off("client:bell_signal");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("ccvq:bellStatus", () => {
      action.resetAllBells(true);
    });

    return () => {
      socket.off("ccvq:bellStatus");
    };

    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.scoreboard}>
      {players.map((player, ind) => (
        <div key={ind} className={styles.player}>
          {parseInt(props.order) === player.order ? (
            <img
              className={styles.background}
              alt={player.name}
              src={`${process.env.PUBLIC_URL}/scoreboard/player0_name.svg`}
            />
          ) : (
            <img
              className={styles.background}
              alt={player.name}
              src={`${process.env.PUBLIC_URL}/scoreboard/player1_name.svg`}
            />
          )}
          {player.bell && (
            <img
              className={styles.currentHighlight}
              alt="current"
              src={process.env.PUBLIC_URL + "/scoreboard/turn.svg"}
            />
          )}
          <div className={styles.name}>{player.name}</div>
          <div className={styles.score}>{player.score}</div>
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;

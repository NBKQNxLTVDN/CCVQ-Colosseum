import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    columnGap: "5%",
    height: "100%",
  },
  playerContainer: {
    border: "1px solid black",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "75% 25%",
    paddingBottom: "2%",
    paddingRight: "2%",
    borderRadius: "2vh",
    backgroundColor: theme.palette.primary.main,
    overflowY: "visible",
    boxShadow: "5px 5px 5px black",
  },
  playerChosenContainer: {
    border: "1px solid black",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "75% 25%",
    paddingBottom: "2%",
    paddingRight: "2%",
    borderRadius: "2vh",
    backgroundColor: theme.palette.tertiary.main,
    overflowY: "visible",
    boxShadow: "5px 5px 5px black",
  },
  score: {
    border: "1px solid black",
    margin: "3%",
    borderRadius: "2vh",
    height: "80%",
    fontWeight: 700,
    fontSize: "6vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "inset 0.5vh 0.5vh 0.5vh black",
  },
  bell: {
    border: "1px solid black",
    borderRadius: "50%",
    margin: "3%",
    height: "60%",
    boxShadow: "0.3vh 0.3vh 0.3vh black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3vh",
    fontWeight: "bold",
    color: "white",
  },
  info: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "80% 15%",
    columnGap: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    backgroundColor: theme.palette.tertiary.main,
    width: "fit-content",
    height: "100%",
    color: "red",
    border: "1px solid black",
    padding: "0 10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    fontWeight: "bold",
    boxShadow: "2px 2px 2px black",
    fontSize: "1.5vh",
  },
  playerChosenName: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    width: "fit-content",
    height: "100%",
    border: "1px solid black",
    padding: "0 10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    fontWeight: "bold",
    boxShadow: "2px 2px 2px black",
    fontSize: "1.5vh",
  },
}));

const ScoreBoard = () => {
  const styles = useStyles();
  const { players, action } = useContext(MainContext);

  const [choosePlayer, setChoosePlayer] = useState(null);
  const [rankBell, setRankBell] = useState([]);

  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      action.setBellRinger(parseInt(data.order));
      if (rankBell.length <= 4 && rankBell.indexOf(data.order) === -1) {
        setRankBell((prevState) => [...prevState, data.order]);
      }
    });

    socket.on("ccvq:choosePlayer", (data) => {
      if (data.order === -1) {
        setChoosePlayer(null);
      } else {
        setChoosePlayer(parseInt(data.order));
      }
    });

    socket.on("VD:init_data", (data) => {
      setChoosePlayer(parseInt(data.player));
    });

    socket.on("ccvq:bellStatus", (data) => {
      if (data.status === "open") {
        action.resetAllBells(true);
        setRankBell([]);
      }
    });

    socket.on("ccvq:changeRound", () => {
      setChoosePlayer(null);
    });

    return () => {
      socket.off("client:bell_signal");
      socket.off("ccvq:choosePlayer");
      socket.off("ccvq:bellStatus");
      socket.off("ccvq:changeRound");
      socket.off("VD:init_data");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      {players.map((player) => (
        <div key={player.order}>
          {player.order === choosePlayer ? (
            <div className={styles.playerChosenContainer}>
              <div className={styles.info}>
                <div className={styles.score}>{player.score}</div>
                <div
                  className={styles.bell}
                  style={
                    player.bell
                      ? {
                          backgroundColor: "red",
                        }
                      : {
                          backgroundColor: "green",
                        }
                  }
                >
                  {player.bell && rankBell.indexOf(player.order) + 1}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className={styles.playerChosenName}>{player.name}</div>
              </div>
            </div>
          ) : (
            <div className={styles.playerContainer}>
              <div className={styles.info}>
                <div className={styles.score}>{player.score}</div>
                <div
                  className={styles.bell}
                  style={
                    player.bell
                      ? {
                          backgroundColor: "red",
                        }
                      : {
                          backgroundColor: "green",
                        }
                  }
                >
                  {player.bell && rankBell.indexOf(player.order) + 1}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className={styles.name}>{player.name}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;

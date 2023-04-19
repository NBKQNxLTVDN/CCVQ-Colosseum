import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    rowGap: "5%",
    width: "40%",
    // padding: "0 25%",
  },
  title: {
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#C4C4C4",
    boxShadow: "inset 5px 5px 5px #000000",
    display: "flex",
    flexDirection: "row",
    gap: "5%",
    alignItems: "center",
    height: "100%",
    minWidth: "30%",
    padding: "1% 10%",
    fontSize: "2rem",
  },
  header: {
    backgroundColor: "#51AFC3",
    padding: "10px",
    margin: "0 10px 10px 0",
    border: "2px solid black",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px black",
    fontWeight: "bold",
    color: "white",
    width: "fit-content",
    display: "inline-block",
    fontSize: "3rem",
  },
}));

const MHDT = ({ setHideTitleRound }) => {
  const styles = useStyles();
  const { players } = useContext(MainContext);

  const [choosePlayer, setChoosePlayer] = useState(null);

  useEffect(() => {
    socket.on("mhdt:showPlayer", (data) => {
      setChoosePlayer(data.id);
    });
    setHideTitleRound(true);

    return () => {
      socket.off("mhdt:showPlayer");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <div className={styles.container}>
        {players
          .sort((prevPlayer, curPlayer) => prevPlayer.score - curPlayer.score)
          .map((player) => (
            <div key={player.order} className={styles.title}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    color: player.order === choosePlayer ? "red" : "black",
                  }}
                  className={styles.header}
                >
                  {player.name}
                </div>
                <div className={styles.header}>{player.score}</div>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.title} style={{ width: "50%" }}>
        CÁI NÀY ĐỂ CHO VUI MÀ THÔI
      </div>
    </div>
  );
};

export default MHDT;

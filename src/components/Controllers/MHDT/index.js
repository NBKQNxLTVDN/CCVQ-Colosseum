import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import React, { useContext } from "react";
import ScoreView from "./components/ScoreViews";

const useStyles = makeStyles((theme) => ({
  round: {
    flexGrow: 12,
    border: "1px solid black",
    borderRadius: "5px",
    background: "#C4C4C4",
    boxShadow: "inset 5px 5px 5px #000",
    height: "calc(100vh - 150px)",
    padding: "1%",
  },
  roundDisplay: {
    background: "#51AFC3",
    padding: "2%",
    height: "100%",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px #000",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "space-between",
  },
  players: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    width: "100%",
    height: "50%",
    columnGap: "5%",
    transform: "translate(0, 50%)",
  },
  roundControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "5%",
  },
  changeSlideButton: {},
}));

const ControllerMHDT = () => {
  const styles = useStyles();
  const context = useContext(MainContext);

  const handleShowFullScore = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "mhdt:changeSlide",
      data: {
        status: true,
      },
    });
  };

  const handlePlayWelcome = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "mhdt:playSound",
      data: {
        name: "welcome",
      },
    });
  };

  const handlePlayIntro = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "mhdt:playSound",
      data: {
        name: "intro",
      },
    });
  };

  const handlePlayAward = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "mhdt:playSound",
      data: {
        name: "award",
      },
    });
  };

  return (
    <div className={styles.round}>
      <div className={styles.roundDisplay}>
        <div className={styles.players}>
          {context.players.map((player, idx) => (
            <ScoreView key={idx} player={player} />
          ))}
        </div>
        <div className={styles.roundControl}>
          <Button
            className={styles.changeSlideButton}
            variant="contained"
            onClick={handlePlayWelcome}
            color="tertiary"
          >
            Welcome Contestants
          </Button>
          <Button
            className={styles.changeSlideButton}
            style={{ marginRight: "50px" }}
            variant="contained"
            onClick={handlePlayIntro}
            color="tertiary"
          >
            Intro
          </Button>
          <Button
            className={styles.changeSlideButton}
            variant="contained"
            onClick={handleShowFullScore}
            color="tertiary"
          >
            Change Slide
          </Button>
          <Button
            className={styles.changeSlideButton}
            variant="contained"
            onClick={handlePlayAward}
            color="tertiary"
          >
            Trao giải
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ControllerMHDT;

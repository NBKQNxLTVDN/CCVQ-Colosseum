import React, { useEffect } from "react";

//mui
import { ButtonGroup, IconButton, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

//components
import { ArrowForwardIosSharp, ArrowBackIosSharp } from "@mui/icons-material";
import ConnectionStatement from "./components/ConnectionStatement";
import MediaController from "./components/MediaController";
import OrderAction from "./components/OrderAction";
import ScoreController from "./components/ScoreController";
import TimeController from "./components/TimeController";
import VolumeController from "./components/VolumeController";
import { socket } from "service/socket";
import BlankSound from "./components/assets/BlankSound.mp3";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "fit-content",
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: "1rem",
    width: "100%",
  },
  action: {
    backgroundColor: theme.palette.secondary.main,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 45,
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignContent: "center",
    marginRight: "2rem",
    height: "fit-content",
    maxWidth: "80vw",
    overflow: "scroll",
    border: "1px solid black",
    boxShadow: "5px 5px 5px black",
  },
  name: {
    backgroundColor: theme.palette.secondary.main,
    padding: 30,
    paddingTop: 20,
    paddingBottom: 20,
    width: "15%",
    height: 100,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    border: "1px solid black",
    borderBottom: "5px solid black",
  },
  title: {
    backgroundColor: theme.palette.info.main,
    height: "100%",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    border: "1px solid black",
    boxShadow: "inset 5px 5px 5px black",
  },
}));

const BattleController = (props) => {
  const styles = useStyles();

  const {
    openController,
    gameShown,
    handleSyncData,
    handleNextRound,
    handlePreviousRound,
  } = props;

  useEffect(() => {
    socket.on("ccvq:catchEvent", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("ccvq:catchEvent");
    };
  }, []);

  return (
    <div className={styles.container}>
      <ConnectionStatement
        openController={openController}
        roundName={gameShown}
      />
      <div className={styles.action}>
        <MediaController />
        <VolumeController />
        <ScoreController />
        <OrderAction />
        <TimeController />
      </div>
      <div className={styles.name}>
        <Button variant="contained" onClick={() => {
          socket.emit("controller:talk", {
            receivers: ["viewer", "client", "controller"],
            eventName: "ccvq:sendSound",
            data: {
              autoPlay: true,
              url: "Sound_ô_trống_O9.mp3",
              type: "audio",
            }
          })
        }}>
          BlankSound
        </Button>
        {/* <div className={styles.title}>
          <ButtonGroup
            style={{ justifyContent: "space-around", width: "100%" }}
          >
            <IconButton aria-label="next_round" onClick={handlePreviousRound}>
              <ArrowBackIosSharp fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="sync" onClick={handleSyncData}>
              {gameShown}
            </IconButton>
            <IconButton aria-label="next_round" onClick={handleNextRound}>
              <ArrowForwardIosSharp fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
        </div> */}
      </div>
    </div>
  );
};

export default BattleController;

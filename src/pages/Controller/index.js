import React, { useEffect, useRef, useState, useContext } from "react";

import { makeStyles } from "@mui/styles";

//service
import { socket } from "service/socket";

//context
import { MainContext } from "contexts/MainContext";

//controller components
import BattleController from "components/Controllers/BattleController";
import ControllerCHP from "components/Controllers/CHP";
import ControllerCHST from "components/Controllers/CHST";
import ControllerSystem from "components/Controllers/ControllerSystem";
import ControllerKD from "components/Controllers/KD";
import ControllerMHDT from "components/Controllers/MHDT";
import ControllerTT from "components/Controllers/TT";
import ControllerVCNV from "components/Controllers/VCNV";
import ControllerVD from "components/Controllers/VD";

import { useConnectedSocket } from "hooks/connectedSocket";

const useStyles = makeStyles((theme) => ({
  controller: {
    maxWidth: "100vw",
    maxHeight: "100vh",
    // display: "grid",
    // gridTemplateRows: "8fr 1fr",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "2rem",
    textAlign: "center",
    padding: "1rem",
    margin: 0,
  },
}));

const ROUND_NAME = ["DKHT", "MHDT", "KD", "VCNV", "TT", "VD", "ST", "CHP"];

const Controller = () => {
  const styles = useStyles();
  const [gameShown, setGameShown] = useState("DKHT");
  const { players } = useContext(MainContext);
  const refSync = useRef(null);

  console.log("Controller is render");

  const openController = (roundName) => {
    setGameShown(roundName);
  };

  const handleSyncData = () => {
    console.log("syncData", gameShown);
    refSync.current();
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "client", "mc"],
      eventName: "ccvq:changeRound",
      data: {
        roundName: gameShown,
      },
    });
  };

  const handleNextRound = () => {
    setGameShown(ROUND_NAME[ROUND_NAME.indexOf(gameShown) + 1]);
  };

  const handlePreviousRound = () => {
    setGameShown(ROUND_NAME[ROUND_NAME.indexOf(gameShown) - 1]);
  };

  useConnectedSocket();

  useEffect(() => {
    socket.emit("controller:talk", {
      receivers: ["client", "viewer", "scoreboard", "mc"],
      eventName: "ccvq:updateScore",
      data: { players },
    });
  }, [players]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("ccvq:setName", {
        role: "controller",
        name: "Admin",
        position: "controller",
      });
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div className={styles.controller}>
      {gameShown === "DKHT" && <ControllerSystem />}
      {gameShown === "MHDT" && <ControllerMHDT />}
      {gameShown === "KD" && <ControllerKD refSync={refSync} />}
      {gameShown === "VCNV" && <ControllerVCNV refSync={refSync} />}
      {gameShown === "TT" && <ControllerTT refSync={refSync} />}
      {gameShown === "VD" && <ControllerVD refSync={refSync} />}
      {gameShown === "ST" && <ControllerCHST refSync={refSync} />}
      {gameShown === "CHP" && <ControllerCHP refSync={refSync} />}
      <BattleController
        openController={openController}
        gameShown={gameShown}
        handleSyncData={handleSyncData}
        handleNextRound={handleNextRound}
        handlePreviousRound={handlePreviousRound}
      />
    </div>
  );
};

export default Controller;

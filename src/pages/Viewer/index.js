import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import Video from "components/Video";
import SoundCCVQ from "components/Sound";

import ViewerWaitingScreen from "components/Viewers/WaitingScreen";
import ViewerKD from "components/Viewers/KD";
import ViewerTT from "components/Viewers/TT";
import { useConnectedSocket } from "hooks/connectedSocket";
import ViewerVCNV from "components/Viewers/VCNV";
import ViewerVD from "components/Viewers/VD";
import ViewerST from "components/Viewers/CHST";
import ViewerMHDT from "components/Viewers/MHDT";
import ViewerCHP from "components/Viewers/CHP";
import Logo from "./logo.png"

const useStyles = makeStyles((theme) => ({
  top: {
    position: "absolute",
    top: '1vh',
    right: '1vw',
    zIndex: 10000
  },
  bot: {
    position: "absolute",
    bottom: '1vh',
    right: '1vw',
    zIndex: 10000,
  },
  viewer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
  },
}));

const Viewer = () => {
  const styles = useStyles();
  const context = useContext(MainContext);
  //

  const [round, setRound] = useState(localStorage.getItem("round") || "DKHT");
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("ccvq:setName", {
        role: "viewer",
        name: "viewer",
        position: "viewer",
      });
    });
    return () => {
      socket.off("connect");
    };

    //eslint-disable-next-line
  }, []);

  useConnectedSocket();

  useEffect(() => {
    socket.on("ccvq:changeRound", (data) => {
      setDisplay(false);
      setRound(data.roundName);
      const players = localStorage.getItem("players");
      localStorage.clear();
      localStorage.setItem("players", players);
      localStorage.setItem("round", data.roundName);
      setDisplay(true);
    });

    return () => {
      socket.off("ccvq:changeRound");
    };

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(context.players));
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.viewer}>
      {display && (
        <>
          <div className={styles.top}>
            <img src={Logo} alt="CCVQ" style={{ height: '69px' }}/>
          </div>
          <div className={styles.bot}>
            <h3>Contact: <a href="https://www.facebook.com/r2thang/">R2th</a></h3>
          </div>
          <Video />
          <SoundCCVQ />
          {round === "DKHT" && <ViewerWaitingScreen />}
          {round === "MHDT" && <ViewerMHDT />}
          {round === "KD" && <ViewerKD />}
          {round === "VCNV" && <ViewerVCNV />}
          {round === "TT" && <ViewerTT />}
          {round === "VD" && <ViewerVD />}
          {round === "ST" && <ViewerST />}
          {round === "CHP" && <ViewerCHP />}
        </>
      )}
    </div>
  );
};

export default Viewer;
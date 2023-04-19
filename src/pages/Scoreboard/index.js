import React, { useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import ViewFullPlayersScreen from "components/Viewers/MHDT/containers/ViewFullPlayersScreen";
import Video from "components/Video";
import { useConnectedSocket } from "hooks/connectedSocket";

const useStyles = makeStyles((theme) => ({
  viewer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
  },
}));

const Scoreboard = () => {
  const styles = useStyles();
  const context = useContext(MainContext);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("ccvq:setName", {
        role: "scoreboard",
        name: "scoreboard",
        position: "scoreboard",
      });
    });

    return () => {
      socket.off("connect");
    };

    //eslint-disable-next-line
  }, []);

  useConnectedSocket();

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(context.players));
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.viewer}>
      <Video />
      <ViewFullPlayersScreen />
    </div>
  );
};

export default Scoreboard;

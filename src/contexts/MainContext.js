import React, { useState } from "react";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContext = React.createContext();

const MainProvider = ({ children }) => {
  // Context state
  const [players, setPlayers] = useState([
    {
      name: "THI SINH 1",
      score: 0,
      order: 1,
      bell: false,
    },
    {
      name: "THI SINH 2",
      score: 0,
      order: 2,
      bell: false,
    },
    {
      name: "THI SINH 3",
      score: 0,
      order: 3,
      bell: false,
    },
    {
      name: "THI SINH 4",
      score: 0,
      order: 4,
      bell: false,
    },
  ]);
  const [data, setData] = useState({
    connections: {},
    nViewers: 0,
    logContent: "",
    logContentController: "",
    logContentClient: {
      client1: "",
      client2: "",
      client3: "",
      client4: "",
    },
    logContentViewer: "",
    logContentMC: "",
  });
  const action = {
    setEachPlayerScore: (playerId, score) => {
      setPlayers((prevState) => {
        let tmp = prevState;
        tmp[playerId - 1].score += score;
        return [...tmp];
      });
    },
    setPlayersScore: (playersScore) => {
      setPlayers((prevState) => [
        ...prevState.map((player, idx) => ({
          ...player,
          score: parseInt(playersScore[idx].score),
          name: playersScore[idx].name,
        })),
      ]);
    },
    setBellRinger: (playerOrder) => {
      // setData((prevState) => ({
      //   ...prevState,
      //   players: prevState.players.map((player) => {
      //     if (player.order === playerOrder) {
      //       return { ...player, bell: true };
      //     } else {
      //       return { ...player };
      //     }
      //   }),
      // }));
    },
    resetAllBells: (status) => {
      // if (status) {
      //   setData((prevState) => ({
      //     ...prevState,
      //     players: prevState.players.map((player) => ({
      //       ...player,
      //       bell: false,
      //     })),
      //   }));
      // }
    },
    setPlayerName: (order, name) => {
      setPlayers((prevState) => {
        let tmp = prevState;
        tmp[order - 1].name = name;
        return [...tmp];
      });
    },
    setPlayerInfo: (order, info) => {
      setPlayers((prevState) => [
        ...prevState.map((player) => {
          if (player.order === order) {
            return { ...player, avatar: info.avatar };
          } else return { ...player };
        }),
      ]);
    },
    setConnections: (updatedData, viewer) => {
      setData((prevState) => ({
        ...prevState,
        connections: updatedData,
        nViewers: viewer,
      }));
    },
    addLog: (level = "INFO", role = "undefined", newLog = "") => {
      let date = new Date().toLocaleString("vi-vn");
      let formattedLog = `[${date}][${level}][${role}] ${newLog}\n`;
      setData((prevState) => ({
        ...prevState,
        logContent: prevState.logContent + formattedLog,
      }));
    },
  };
  return (
    <MainContext.Provider
      value={{
        state: data,
        action: action,
        players: players,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export { MainProvider, MainContext };

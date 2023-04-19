import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import axios from "axios";

import PlayScreen from "./containers/PlayScreen";
import ReadyScreen from "./containers/ReadyScreen";

import { socket } from "service/socket";
import { FormatQuestion } from "./utils/formatQuestion";

const API_URL = process.env.REACT_APP_ADMIN_ENDPOINT;

const ALL_CLIENTS = ["client"];

const ALL = [...ALL_CLIENTS, "controller", "mc", "viewer", "livestream"];

const useStyles = makeStyles((theme) => ({
  round: {
    border: "1px solid black",
    borderRadius: "5px",
    height: "calc(100vh - 150px)",
    background: "#C4C4C4",
    overflowY: "scroll",
    boxShadow: "inset 5px 5px 5px #000",
  },
}));

const ControllerVD = ({ refSync }) => {
  const styles = useStyles();

  const [data, setData] = useState(null);
  const [nextForm, setNextForm] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(1); // thi sinh
  const [currentQuestion, setCurrentQuestion] = useState(1); // cau hoi hien tai
  const [formatQuestion, setFormatQuestion] = useState([...FormatQuestion]); // goi cau hoi

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    console.log("VD IS RENDER");
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(API_URL + "/game-content/VD");
      console.log("[DATA] ", res.data);
      setData(res.data);
    };
    fetchQuestion();
    refSync.current = fetchQuestion;
    setIsFirstRender(false);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (nextForm) {
      socket.emit("controller:talk", {
        receivers: [...ALL],
        eventName: "VD:swap_screen",
        data: {
          screen: "question",
        },
      });
    } else {
      if (!isFirstRender) {
        socket.emit("controller:talk", {
          receivers: [...ALL],
          eventName: "VD:status",
          data: { status: "end", player: selectedPlayer },
        });
        setFormatQuestion((prevState) => {
          return prevState.map((question) => {
            return { ...question, score: -1, data: {} };
          });
        });
      } else setIsFirstRender(false);
    }
    //eslint-disable-next-line
  }, [nextForm]);

  return (
    <div className={styles.round}>
      {data && (
        <>
          {!nextForm ? (
            <ReadyScreen
              nextForm={nextForm}
              setNextForm={setNextForm}
              data={data}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              formatQuestion={formatQuestion}
              setFormatQuestion={setFormatQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
          ) : (
            <PlayScreen
              nextForm={nextForm}
              setIsFirstRender={setIsFirstRender}
              formatQuestion={formatQuestion}
              setFormatQuestion={setFormatQuestion}
              currentQuestion={currentQuestion}
              setNextForm={setNextForm}
              selectedPlayer={selectedPlayer}
              setCurrentQuestion={setCurrentQuestion}
            />
          )}
        </>
      )}
    </div>
  );
};
export default ControllerVD;

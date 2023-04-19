import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import { NotificationContext } from "contexts/notification";

import Background from "./assets/images/background.png";
import Tree from "./assets/images/Tree.svg";

import SetNameForm from "./components/SetNameForm";
import Scoreboard from "./components/ScoreBoard";
import Question from "./components/Question";
import Answer from "./components/Answer";
import Bell from "./components/Bell";

import { useConnectedSocket } from "hooks/connectedSocket";

const useStyles = makeStyles((theme) => ({
  client: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
  backgroundImg: {
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  nameForm: {
    position: "absolute",
    zIndex: 2,
  },
  error: {
    position: "absolute",
    zIndex: 2,
    border: "10px solid red",
    // borderImage:
    //   "radial-gradient(circle, rgba(252,0,0,1) 0%, rgba(255,97,0,1) 20%, rgba(242,173,59,1) 40%, rgba(255,97,0,1) 49%, rgba(242,173,59,1) 60%, rgba(255,97,0,1) 80%, rgba(255,0,0,1) 100%)",
    // borderImageSlice: "1",
    width: "100%",
    height: "100%",
    animation: "1.5s ease 0s infinite normal none running flash",
  },
  tree: {
    height: "70vh",
    position: "fixed",
    bottom: "5%",
    left: "-8%",
    zIndex: 100,
  },
}));

const Client = () => {
  const styles = useStyles();
  const context = useContext(MainContext);

  // eslint-disable-next-line
  const [gameShown, setGameShown] = useState("");
  const [showForm, setShowForm] = useState(true);
  // eslint-disable-next-line
  const [playerOrder, setPlayerOrder] = useState(-1);
  const { showNoti } = useContext(NotificationContext);
  const [question, setQuestion] = useState({
    id: "",
    text: "CCVQ CHUA BAT DAU",
  });

  socket.on("ccvq:changeRound", (data) => {
    setGameShown(data.roundName);
  });

  useConnectedSocket();

  useEffect(() => {
    if (showForm) {
      showNoti(
        "default",
        "Login",
        <SetNameForm
          updatePlayerOrder={(playerOrder) => setPlayerOrder(playerOrder)}
          showForm={showForm}
          setShowForm={() => {
            setShowForm((prevState) => !prevState);
          }}
        />
      );
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("ccvq:choosePlayer", (data) => {
      setQuestion({
        id: "",
        text: `Phần thi của thí sinh ${context.players[data.order - 1].name
          } chuẩn bị được bắt đầu`,
      });
    });
    socket.on("ccvq:sendQuestion_client", (data) => {
      setQuestion({
        id: "Câu hỏi số " + data.id,
        text: data.question,
      });
    });
    return () => {
      socket.off("ccvq:sendQuestion_client");
      socket.off("KD:ready");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.client}>
      <img alt="background" src={Background} className={styles.backgroundImg} />
      <img alt="tree" src={Tree} className={styles.tree} />
      <Scoreboard order={playerOrder} />
      <Question question={question} playerOrder={playerOrder} />
      <Answer playerOrder={playerOrder} />
      <Bell playerOrder={playerOrder} />
    </div>
  );
};

export default Client;

import React from "react";

import { makeStyles } from "@mui/styles";

import { ToastContainer } from "react-toastify";

import ScoreBoard from "./components/ScordBoard";
import MessagesChannel from "./components/MessagesChannel";
import Timer from "./components/Timer";
import QuestionContent from "./components/Question";

const containerStyle = {
  zIndex: 1999,
};

const useStyles = makeStyles((theme) => ({
  mc: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateRows: "18% 82%",
    padding: "1%",
    border: "1px solid black",
  },
  scoreboard: {
    border: "1px solid black",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    padding: "1%",
    height: "100%",
    width: "100%",
  },
  mainContainer: {
    border: "1px solid black",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    padding: "1%",
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "79% 20%",
    columnGap: "1%",
    overflowX: "scroll",
  },
  question: {
    backgroundColor: "#51AFC3",
    border: "10px solid black",
    padding: "1%",
    borderRadius: "20px",
  },
  extraContainer: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateRows: "42% 55%",
    rowGap: "3%",
  },
  timer: {
    border: "1px solid black",
    borderRadius: "20px",
  },
  messagesChannel: {},
}));

const ViewerMc = () => {
  const styles = useStyles();
  return (
    <div className={styles.mc}>
      <div className={styles.scoreboard}>
        <ScoreBoard />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.question}>
          <QuestionContent />
        </div>
        <div className={styles.extraContainer}>
          <div className={styles.timer}>
            <Timer />
          </div>
          <div className={styles.messagesChannel}>
            <MessagesChannel />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={containerStyle}
      />
    </div>
  );
};

export default ViewerMc;

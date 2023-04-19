import React, { useState, useEffect, useContext } from "react";
import { Typography, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PermDeviceInformation } from "@mui/icons-material";
import { socket } from "service/socket";
import { NotificationContext } from "contexts/notification";
import HTMLStringConvert from "components/HTMLStringConvert";

const useStyles = makeStyles((theme) => ({
  viewQuestion: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    overflow: "scroll",
    gap: 30,
  },
  currentQuestion: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextQuestion: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    backgroundColor: theme.palette.tertiary.main,
    width: "175px",
    height: "50px",
    textAlign: "center",
    borderRadius: "5px",
    border: "1px solid black",
    boxShadow: "inset 1px 1px 2px black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  box: {
    width: "100%",
  },
  detail: {
    backgroundColor: theme.palette.info.main,
    maxWidth: "100%",
    height: "100%",
    borderRadius: 20,
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    marginBottom: 10,
    gap: 10,
  },
  attribute: {
    backgroundColor: theme.palette.tertiary.main,
    width: "10%",
    padding: "10px",
    textJustify: "center",
    borderRadius: "10px",
    border: "1px solid black",
    boxShadow: "1px 1px 2px black",
  },
}));

const ViewQuestion = (props) => {
  const { nextQuestion } = props;
  const styles = useStyles();

  const { showNoti } = useContext(NotificationContext);
  const [info, setInfo] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState();

  useEffect(() => {
    socket.on("KD:ready", (data) => {
      setInfo(
        "Bộ đề số " +
        data.selectedOption
      );
    });
    return () => {
      socket.off("KD:ready");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentQuestion) setInfo(null);
  }, [currentQuestion]);

  useEffect(() => {
    if (info) {
      setCurrentQuestion(null);
    }
  }, [info]);

  useEffect(() => {
    socket.on("ccvq:sendQuestion_mc", (data) => {
      setCurrentQuestion(data.data);
    });
    return () => {
      socket.off("ccvq:sendQuestion_mc");
    };
    //eslint-disable-next-line
  }, []);

  const openInfo = (e) => {
    console.log(e.target.value);
    console.log("In how it is the bug bruh");
    showNoti(
      "confirm",
      "Form update content question",
      currentQuestion.question
    );
  };

  return (
    <div className={styles.viewQuestion}>
      <div className={styles.currentQuestion}>
        {/* {info && <div className={styles.box}>{info}</div>} */}
        {currentQuestion && (
          <div className={styles.box}>
            <div className={styles.detail}>
              <div className={styles.attribute}>Question</div>
              <Typography variant="h6">
                <HTMLStringConvert string={currentQuestion.question} />
              </Typography>
              <IconButton
                className={styles.infoIcon}
                onClick={openInfo}
                value="question"
              >
                <PermDeviceInformation value="question" />
              </IconButton>
            </div>
            <div className={styles.detail}>
              <div className={styles.attribute}>Topic</div>
              <Typography variant="h6">
                <HTMLStringConvert string={currentQuestion.topic} />
              </Typography>
              <IconButton
                className={styles.infoIcon}
                onClick={openInfo}
                value="topic"
              >
                <PermDeviceInformation value="topic" />
              </IconButton>
            </div>
            <div className={styles.detail}>
              <div className={styles.attribute}>Answer</div>
              <Typography variant="h6">
                <HTMLStringConvert string={currentQuestion.ans} />
              </Typography>
              <IconButton
                className={styles.infoIcon}
                onClick={openInfo}
                value="answer"
              >
                <PermDeviceInformation value="answer" />
              </IconButton>
            </div>
            {(currentQuestion.type === "image" ||
              currentQuestion.type === "audio") && (
                <div className={styles.detail}>
                  <div className={styles.attribute}>Url</div>
                  <Typography variant="h6">
                    <HTMLStringConvert string={currentQuestion.url} />
                  </Typography>
                  <IconButton
                    className={styles.infoIcon}
                    onClick={openInfo}
                    value="url"
                  >
                    <PermDeviceInformation value="url" />
                  </IconButton>
                </div>
              )}
          </div>
        )}
      </div>
      <div className={styles.nextQuestion}>
        <div className={styles.box}>
          <div className={styles.detail}>
            <div className={styles.attribute}>Next Question</div>
            <Typography variant="h6">
              {nextQuestion && (
                <HTMLStringConvert string={nextQuestion.question} />
              )}
            </Typography>
            <IconButton
              className={styles.infoIcon}
              onClick={openInfo}
              value="next_question"
            >
              <PermDeviceInformation value="next_question" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;

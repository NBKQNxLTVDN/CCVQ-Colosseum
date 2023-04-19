import React, { useContext, useState } from "react";

import { makeStyles } from "@mui/styles";

import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import { IconButton } from "@mui/material";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 80,
    height: 80,
    backgroundColor: theme.palette.info.main,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    border: "1px solid black",
    boxShadow: "inset 1px 1px 1px black",
  },
}));

const OrderAction = () => {
  const styles = useStyles();

  const [isAvailableAnswer, setIsAvailableAnswer] = useState(false);
  const [isAvailableRingBell, setIsAvailableRingBell] = useState(false);

  const { action } = useContext(MainContext);

  const onClickBell = () => {
    setIsAvailableRingBell(!isAvailableRingBell);
    if (!isAvailableRingBell) {
      action.resetAllBells(true);
      socket.emit("controller:talk", {
        receivers: ["client", "controller", "mc", "viewer", "livestream"],
        eventName: "ccvq:timeState",
        data: {
          status: "start",
        },
      });
    }

    socket.emit("controller:talk", {
      receivers: ["client", "controller", "mc", "viewer", "livestream"],
      eventName: "ccvq:bellStatus",
      data: {
        status: !isAvailableRingBell ? "open" : "block",
      },
    });
  };

  const onClickSendAnswer = () => {
    setIsAvailableAnswer(!isAvailableAnswer);
    socket.emit("controller:talk", {
      receivers: ["client"],
      eventName: "ccvq:answerBoxStatus",
      data: {
        status: !isAvailableAnswer ? "open" : "block",
      },
    });
  };

  // useEffect(() => {
  //   socket.on("ccvq:bellStatus", (data) => {
  //     setIsAvailableAnswer(true);
  //   });

  //   return () => {
  //     socket.off("ccvq:bellStatus");
  //   };
  // }, [isAvailableRingBell]);

  return (
    <>
      <IconButton
        className={styles.icon}
        style={{
          fontSize: 45,
        }}
        sx={(theme) => ({
          color: "black",
          backgroundColor: theme.palette.info.main,
          border: "1px solid black",
          "&:hover": {
            backgroundColor:
              theme.palette[isAvailableAnswer ? "success" : "danger"].main,
            border: 0,
            color: theme.palette.info.main,
          },
        })}
        onClick={onClickSendAnswer}
      >
        {isAvailableAnswer ? (
          <QuestionAnswerIcon fontSize="inherit" htmlColor="inherit" />
        ) : (
          <CommentsDisabledIcon fontSize="inherit" htmlColor="inherit" />
        )}
      </IconButton>
      <IconButton
        className={styles.icon}
        style={{
          fontSize: 45,
        }}
        sx={(theme) => ({
          color: "black",
          border: "1px solid black",
          backgroundColor: theme.palette.info.main,
          "&:hover": {
            backgroundColor:
              theme.palette[isAvailableRingBell ? "success" : "danger"].main,
            border: 0,
            color: theme.palette.info.main,
          },
        })}
        onClick={onClickBell}
      >
        {isAvailableRingBell ? (
          <NotificationsActiveIcon fontSize="inherit" htmlColor="inherit" />
        ) : (
          <NotificationsOffIcon fontSize="inherit" htmlColor="inherit" />
        )}
      </IconButton>
    </>
  );
};

export default OrderAction;

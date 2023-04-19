import React from "react";

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { controllerEmitData, controllerEmitDataToAll } from "utils/helpers";
import { socket } from "service/socket";
import UndoIcon from "@mui/icons-material/Undo";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import FastForwardIcon from "@mui/icons-material/FastForward";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.info.main,
    width: "100%",
    height: "30%",
    borderRadius: 30,
    boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    width: 75,
    height: 75,
    filter: "drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25))",
    fontWeight: "bold",
  },
}));

const KDControl = (props) => {
  const styles = useStyles();

  const {
    data,
    selectedOption,
    sendQuestion,
    setCountCorrect,
    setCountIncorrect,
    count,
    countCorrect,
    countIncorrect,
    setCount,
    // disabled,
    total,
  } = props;

  const nextQuestion = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "client", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: 0,
      }
    });
    let tempCount = count;
    if (tempCount === 18) {
      tempCount = 18;
      // endGame("without_swap_screen");
      controllerEmitDataToAll("ccvq:setTime", {
        seconds: 0,
      });
      controllerEmitDataToAll("ccvq:timeState", {
        status: "pause",
      });
      return;
    } else {
      tempCount = tempCount + 1;
    }
    sendQuestion(tempCount);
  };

  const backQuestion = () => {
    let tempCount = count;
    if (tempCount === 1) {
      tempCount = 1;
    } else {
      tempCount = tempCount - 1;
    }
    sendQuestion(tempCount);
  };

  const controlBellStatus = (status) => {
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream", "mc", "client"],
      eventName: "ccvq:bellStatus",
      data: {
        status: status,
      },
    });
  };

  const resultAns = (result) => {
    if (result) {
      setCountCorrect(countCorrect + 1);
    } else {
      setCountIncorrect(countIncorrect + 1);
    }
    nextQuestion();
    controllerEmitDataToAll("KD:statusQuestion", {
      quesId: count,
      status: result,
      answer: data[selectedOption - 1].data[count - 1].ans,
    });
  };

  const countdown = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:timeState",
      data: {
        status: "start",
      },
    });
  };

  const countdownBell = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: 3,
      },
    });

    // socket.emit("controller:talk", {
    //   receivers: ["viewer", "livestream", "mc", "controller", "client"],
    //   eventName: "ccvq:bellStatus",
    //   data: {
    //     status: "open",
    //   },
    // });
    countdown();
  };

  // const handleClickStartTime = () => {
  //   socket.emit("controller:talk", {
  //     receivers: ["viewer", "livestream", "controller", "mc", "client"],
  //     eventName: "ccvq:setTime",
  //     data: {
  //       seconds: 3,
  //     },
  //   });

  //   socket.emit("controller:talk", {
  //     receivers: ["viewer", "livestream", "controller", "mc", "client"],
  //     eventName: "ccvq:timeState",
  //     data: {
  //       status: "start",
  //     },
  //   });
  // };

  const initData = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "client", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: 0,
      }
    });
    setCount(0);
    controllerEmitData(["controller", "mc", "viewer"], "KD:ready", {
      status: true,
      data: data[selectedOption - 1].data,
    });
    controllerEmitDataToAll("KD:status", {
      status: "start",
    })
  }

  const startTurn = () => {
    sendQuestion(1);
  };

  return (
    <div className={styles.container}>
      <Button
        color="tertiary"
        variant="contained"
        className={styles.button}
        sx={{
          borderRadius: 5,
        }}
        onClick={initData}
      >
        <>Nạp đề</>
      </Button>
      <Button
        color="tertiary"
        variant="contained"
        className={styles.button}
        sx={{
          borderRadius: 5,
        }}
        onClick={() => {
          startTurn();
          controlBellStatus("open");
        }
        }
      >
        <>Bắt đầu</>
      </Button>
      <Button
        color="danger"
        variant="contained"
        className={styles.button}
        sx={{
          borderRadius: 5,
        }}
        onClick={() => {
          backQuestion();
          controlBellStatus("open");
        }
        }
      >
        <UndoIcon fontSize="large" />
      </Button>
      <Button
        color="danger"
        variant="contained"
        className={styles.button}
        sx={{
          borderRadius: 5,
        }}
        onClick={() => {
          resultAns(false);
          controlBellStatus("open");
        }}
      >
        <HighlightOffIcon fontSize="large" style={{ color: "white" }} />
      </Button>
      <Button
        color="success"
        variant="contained"
        className={styles.button}
        sx={{
          borderRadius: 5,
        }}
        onClick={() => {
          resultAns(true);
          controlBellStatus("open");
        }}
      >
        <DoneIcon fontSize="large" style={{ color: "white" }} />
      </Button>
      <Button
        color="tertiary"
        variant="contained"
        className={styles.button}
        sx={{
          borderRadius: 5,
        }}
        onClick={() => {
          nextQuestion();
          controlBellStatus("open");
        }
        }
      >
        <FastForwardIcon fontSize="large" />
      </Button>
      <Button
        color="tertiary"
        variant="contained"
        className={styles.button}
        sx={{
          borderRadius: 5,
        }}
        onClick={countdownBell}
      >
        <h1>3S</h1>
      </Button>
      <h1
        style={{
          color: "gray",
          fontFamily: "Teko",
          fontSize: 128,
          paddingTop: 20,
        }}
      >
        {count}/{total}
      </h1>
    </div>
  );
};

export default KDControl;

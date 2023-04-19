import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import TimerIcon from "@mui/icons-material/Timer";

import { Button, ButtonGroup, IconButton, TextField } from "@mui/material";

import ModalCustom from "components/Modal";
import ProcessIcon from "../ProcessIcon";

import { useTimeProcessing } from "hooks/useTimer";
import { socket } from "service/socket";
import { getTime } from "utils/helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: "2vh",
    paddingBottom: "3vh",
  },
  btnGroup: {
    display: "flex",
    gap: 20,
  },
}));

const TimeController = () => {
  const styles = useStyles();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState();

  const {
    duration,
    setDuration,
    timer,
    isPause,
    handleOnPause,
    handleReset,
    handleOnStart,
  } = useTimeProcessing({ isTimer: true, step: 100 });

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleSubmitModal = () => {};

  const handleInputTime = (e) => {
    if (e.keyCode === 13 && value > 0) {
      setDuration(value * 1000);
    }
    handleOnStart();
  };

  const handleFastTime = (e) => {
    handleOnStart(e.target.id);
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "client"],
      eventName: "ccvq:setTime",
      data: {
        seconds: e.target.id,
      },
    });
  };

  useEffect(() => {
    socket.on("ccvq:setTime", (data) => {
      setDuration(data.seconds * 1000);
      handleReset();
    });

    socket.on("ccvq:timeState", (data) => {
      if (data.status === "pause") {
        handleOnPause();
      } else if (data.status === "start") {
        handleOnStart();
      } else if (data.status === "reset") {
        handleReset();
      } else {
        console.log(data.status);
      }
    });

    return () => {
      socket.off("ccvq:setTime");
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <ProcessIcon
        process={timer / duration}
        isPause={isPause}
        handleOnPause={handleOnPause}
        handleReset={handleReset}
        handleOnStart={handleOnStart}
        setShow={setShow}
      >
        <TimerIcon fontSize="inherit" />
      </ProcessIcon>
      <ModalCustom
        show={show}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        type="medium"
        id="modal-time-controller"
      >
        <h1>Timer</h1>
        <div className={styles.container}>
          <h1 style={{ fontSize: 100 }}>
            {getTime((duration - timer) / 1000)}
          </h1>
          <ButtonGroup className={styles.btnGroup} size="large">
            <IconButton
              style={{ fontSize: 60 }}
              sx={() => ({
                color: "black",
                "&:hover": {
                  border: 0,
                },
              })}
              onClick={handleReset}
            >
              <ReplayCircleFilledIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              style={{ fontSize: 60 }}
              sx={() => ({
                color: "black",
                "&:hover": {
                  border: 0,
                },
              })}
              onClick={() => {
                if (Math.round((timer / duration) * 100) === 100) {
                  console.log("reset");
                  handleReset();
                }
                if (isPause) {
                  handleOnStart();
                } else {
                  handleOnPause();
                }
              }}
            >
              {!isPause ? (
                <PauseIcon fontSize="inherit" />
              ) : (
                <PlayArrowOutlinedIcon fontSize="inherit" />
              )}
            </IconButton>
            <IconButton
              style={{ fontSize: 60 }}
              sx={() => ({
                color: "black",
                "&:hover": {
                  border: 0,
                },
              })}
            >
              <SkipNextIcon fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
          <div
            style={{
              padding: "15px 20px",
              border: "3px solid black",
              borderRadius: 20,
              backgroundColor: "#c4c4c4",
              marginBottom: 10,
            }}
            tabIndex={1}
            onKeyDown={handleInputTime}
          >
            <TextField
              sx={{
                backgroundColor: "#c4c4c4",
                borderRadius: 1,
                border: "1px solid black",
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            {[
              { value: 5, color: "#EDD502" },
              { value: 10, color: "#EC8A17" },
              { value: 15, color: "#DF2121" },
              { value: 20, color: "#6B1C1C" },
              { value: 30, color: "#000000" },
            ].map((btn) => (
              <Button
                key={btn.value}
                id={btn.value}
                sx={{
                  backgroundColor: btn.color,
                  borderRadius: 5,
                  border: "2px solid black",
                  height: 60,
                  width: 50,
                  fontWeight: "bold",
                  color: "#f9f9f9",
                  fontSize: 20,
                }}
                onClick={handleFastTime}
              >
                + {btn.value}
              </Button>
            ))}
          </div>
        </div>
      </ModalCustom>
    </>
  );
};

export default TimeController;

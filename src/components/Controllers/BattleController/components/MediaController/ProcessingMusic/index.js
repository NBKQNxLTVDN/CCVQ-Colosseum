import React, { useEffect } from "react";

import { ButtonGroup, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { getTime } from "utils/helpers";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    columnGap: 20,
    padding: "10px 0",
    marginTop: "3vh",
    marginBottom: "3vh",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 60,
    paddingLeft: 40,
  },
  processing: {
    height: 5,
    backgroundColor: "#000",
    borderRadius: 3,
    position: "absolute",
    top: 0,
    left: 0,
    "&::after": {
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: "#000",
      content: '""',
      right: -10,
      top: -7,
      position: "absolute",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  horizontal: {
    height: 5,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 3,
    position: "absolute",
    top: 0,
    left: 0,
    "&:hover": {
      cursor: "pointer",
    },
  },
  btnGroup: {
    marginTop: 20,
    display: "flex",
    gap: 20,
  },
}));

const ProcessingMusic = ({
  currentMedia,
  duration,
  setDuration,
  timer,
  isPause,
  handleOnPause,
  handleReset,
  handleOnStart,
}) => {
  const styles = useStyles();

  useEffect(() => {
    if (currentMedia) {
      const a = new Audio(
        `${process.env.PUBLIC_URL}/sounds/${currentMedia.name}`
      );

      a.onerror = function () {
        console.log("File does not exist.");
        setDuration(null);
      };
      a.onloadeddata = function () {
        console.log("File exists.");
        setDuration(a.duration * 1000);
      };
    }

    //eslint-disable-next-line
  }, [currentMedia]);

  return (
    <div className={styles.container}>
      <h1>PLAYLISTS</h1>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            transform: "translate(0,-50%)",
            marginBottom: 10,
          }}
        >
          {getTime((duration - timer) / 1000)}
        </p>
        <div className={styles.horizontal} />
        <div
          className={styles.processing}
          style={{ width: `${(timer / duration) * 100}%` }}
        />
        <ButtonGroup className={styles.btnGroup} size="large">
          <IconButton
            style={{ fontSize: 40 }}
            sx={() => ({
              color: "black",
              "&:hover": {
                border: 0,
              },
            })}
            onClick={handleReset}
          >
            <ReplayCircleFilledIcon fontSize="inherit" onClick={() => {
              socket.emit("controller:talk", {
                receivers: ["viewer", "client", "controller"],
                eventName: `ccvq:${currentMedia.type === "video" ? "video" : "sound"}Status`,
                data: {
                  status: "end",
                }
              })
            }} />
          </IconButton>
          <IconButton
            style={{ fontSize: 40 }}
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
              <PauseIcon fontSize="inherit" onClick={() => {
                socket.emit("controller:talk", {
                  receivers: ["viewer", "client", "controller"],
                  eventName: `ccvq:${currentMedia.type === "video" ? "video" : "sound"}Status`,
                  data: {
                    status: "pause",
                  }
                })
              }} />
            ) : (
              <PlayArrowOutlinedIcon fontSize="inherit" onClick={() => {
                socket.emit("controller:talk", {
                  receivers: ["viewer", "client", "controller"],
                  eventName: `ccvq:send${currentMedia.type === "video" || currentMedia.type === "image" ? "Video" : "Sound"}`,
                  data: {
                    autoPlay: true,
                    url: currentMedia.name,
                    type: currentMedia.type,
                  }
                })
              }} />
            )}
          </IconButton>
          <IconButton
            style={{ fontSize: 40 }}
            sx={(theme) => ({
              color: "black",
              "&:hover": {
                border: 0,
              },
            })}
          >
            <SkipNextIcon fontSize="inherit" />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProcessingMusic;

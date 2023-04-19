import React from "react";

//mui
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.info.main,
    borderRadius: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    border: "1px solid black",
    padding: 10,
    boxShadow: "inset 2px 2px 2px black",
    position: "relative",
  },
  process: {
    backgroundColor: "gray",
    opacity: 0.8,
    backgroundFilter: "blur(60)",
    position: "absolute",
    height: "100%",
    top: 0,
    left: 0,
    borderTopLeftRadius: 70,
    borderBottomLeftRadius: 70,
    borderTop: "2px solid black",
  },
}));

const ProcessIcon = ({
  children,
  process = 0,
  isPause,
  handleOnPause,
  handleReset,
  handleOnStart,
  setShow,
}) => {
  const styles = useStyles();
  return (
    <div
      className={styles.background}
      style={{
        background: `linear-gradient(90deg, gray ${process * 100}%, #c4c4c4 ${process * 100
          }%)`,
      }}
    >
      <IconButton
        style={{ fontSize: 40 }}
        sx={() => ({
          color: "black",
          backgroundColor: "transparent",
          "&:hover": {
            border: 0,
          },
        })}
        onClick={handleReset}
      >
        <ReplayCircleFilledIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        style={{ fontSize: 40 }}
        sx={() => ({
          color: "black",
          backgroundColor: "transparent",
          "&:hover": {
            border: 0,
          },
        })}
        onClick={() => {
          if (Math.round(process * 100) === 100) {
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
        style={{ fontSize: 40 }}
        sx={() => ({
          color: "black",
          backgroundColor: "transparent",
          "&:hover": {
            border: 0,
          },
        })}
        onClick={() => {
          setShow(true);
        }}
      >
        {children}
      </IconButton>
    </div>
  );
};

export default ProcessIcon;

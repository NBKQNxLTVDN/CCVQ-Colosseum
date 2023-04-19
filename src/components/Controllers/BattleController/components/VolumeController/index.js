import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { IconButton, Slider } from "@mui/material";

import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.info.main,
    borderRadius: 70,
    border: "1px solid black",
    padding: 10,
    boxShadow: "inset 2px 2px 2px black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 280,
    gap: 10,
    paddingRight: 25,
  },
}));

const DEFAULT_VOLUME = 75;

const VolumeController = () => {
  const styles = useStyles();

  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMute, setIsMute] = useState(false);

  useEffect(() => {
    if (isMute) {
      setVolume(0);
    } else {
      setVolume(DEFAULT_VOLUME);
    }
  }, [isMute]);

  useEffect(() => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "ccvq:changeVolume",
      data: {
        volume,
      },
    });
    //eslint-disable-next-line
  }, [volume]);

  return (
    <div className={styles.container}>
      <IconButton
        style={{
          fontSize: 30,
        }}
        sx={(theme) => ({
          color: "black",
          backgroundColor: theme.palette.info.main,
          "&:hover": {
            backgroundColor: theme.palette.info.main,
            border: 0,
          },
        })}
        onClick={() => {
          setIsMute(!isMute);
        }}
      >
        {isMute ? (
          <VolumeOffIcon fontSize="inherit" htmlColor="inherit" />
        ) : (
          <VolumeUpRounded fontSize="inherit" htmlColor="inherit" />
        )}
      </IconButton>
      <Slider
        aria-label="Volume"
        defaultValue={30}
        value={volume}
        sx={(theme) => ({
          color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
          "& .MuiSlider-track": {
            border: "none",
          },
          "& .MuiSlider-thumb": {
            width: 24,
            height: 24,
            backgroundColor: "#fff",
            "&:before": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
              boxShadow: "none",
            },
          },
        })}
        onChange={(e) => setVolume(e.target.value)}
      />
    </div>
  );
};

export default VolumeController;

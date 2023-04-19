import React, { useContext, useEffect, useState } from "react";

import { socket } from "service/socket";

import { makeStyles } from "@mui/styles";
import { SoundContext } from "contexts/sound";
import Sound from "react-sound";
import Timer15sSound from "../../assets/sounds/CHP-15s.mp4";

import "./index.css";

const useStyles = makeStyles((theme) => ({
  timer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  background: {
    background: "#810017",
    width: "100%",
  },
  inside: {
    background: "white",
    transform: "scale(98%, 80%)",
    width: "50%",
  },
}));

let timeOut = null;

const Timer = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  //eslint-disable-next-line
  const [display, setDisplay] = useState(false);
  const [time, setTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [pause, setPause] = useState(true);
  const [dateBegin, setDateBegin] = useState(null);
  const [soundUrl, setSoundUrl] = useState();
  const [playSound, setPlaySound] = useState("PAUSED");

  const controlBellStatus = (status) => {
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream", "mc", "client"],
      eventName: "ccvq:bellStatus",
      data: {
        status: status,
      },
    });
  };

  useEffect(() => {
    socket.on("ccvq:setTime", (data) => {
      setPlaySound("STOPPED");
      setSoundUrl(null);
      setPause(true);
      setTime(data.seconds * 1000);
      setCurrentTime(data.seconds * 1000);
      setSoundUrl(Timer15sSound);
    });

    socket.on("ccvq:timeState", (data) => {
      if (data.status === "start") {
        setDateBegin(new Date());
        setPlaySound("PLAYING");
      } else if (data.status === "timeout" || data.status === "pause") {
      }
      setPause(data.status === "pause");
    });

    return () => {
      socket.off("ccvq:setTime");
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!pause) {
      timeOut = setTimeout(() => {
        if (currentTime > 0) {
          setCurrentTime(currentTime - 5);
        } else {
          clearTimeout(timeOut);
        }
      }, 5 - (new Date() - dateBegin - (time - currentTime)));

      return () => {
        clearTimeout(timeOut);
      };
    }
    //eslint-disable-next-line
  }, [pause, currentTime]);

  useEffect(() => {
    timeOut = setTimeout(() => {
      setDisplay(true);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <div className={styles.timer}>
      {soundUrl && (
        <Sound
          volume={volume}
          url={soundUrl}
          playStatus={playSound}
          onPlaying={(props) => {
            if (props.position > 5000) {
              controlBellStatus("block");
            }
          }}
          onFinishedPlaying={() => {
            setSoundUrl(null);
          }}
        />
      )}
      <div id="octagon" className={styles.background} />
      <div
        id="octagon"
        className={styles.inside}
        style={
          !time
            ? { width: "0%" }
            : (time - currentTime) / time === 1
            ? {
                width: ((time - currentTime) / time) * 100 + "%",
              }
            : {
                width: ((time - currentTime) / time) * 100 + "%",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }
        }
      />
    </div>
  );
};

export default Timer;

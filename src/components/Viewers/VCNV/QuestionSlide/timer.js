import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

import { getTime } from "utils/helpers";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import TimerCTC from "../assets/Sounds/TimerCTC.mp3";

const useStyles = makeStyles((theme) => ({
  timer: {
    width: "18.75%",
    height: "26%",
    position: "absolute",
    top: "32.5%",
    left: "72.75%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat",
    fontSize: "10vh",
    fontWeight: "bold",
  },
  bar2: {
    left: "4%",
    width: "90%",
    bottom: "5%",
    height: "1%",
    zIndex: 2,
    position: "absolute",
  },
  time2: {
    height: "100%",
    position: "relative",
    backgroundColor: "#3D2147",
    "&::after": {
      content: '""',
      backgroundColor: "#3D2147",
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      position: "absolute",
      top: "-80%",
      right: "-1.5%",
      animation: "2s ease 0s infinite normal none running flash",
    },
  },
  timeDone: {
    height: "100%",
    width: "100%",
    backgroundColor: "#3D2147",
  },
}));

const Timer = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  const [time, setTime] = useState(localStorage.getItem("time") || 0);
  const [currentTime, setCurrentTime] = useState(
    localStorage.getItem("currentTime") || 0
  );
  const [playSound, setPlaySound] = useState(
    localStorage.getItem("playSound") || "STOPPED"
  );

  useEffect(() => {
    socket.on("ccvq:setTime", (data) => {
      setPlaySound("STOPPED");
      setCurrentTime(0);
      setTime(data.seconds);
      localStorage.setItem("playSound", "STOPPED");
      localStorage.setItem("currentTime", 0);
      localStorage.setItem("time", data.seconds);
    });

    socket.on("ccvq:timeState", (data) => {
      if (data.status === "start") {
        setPlaySound("PLAYING");
        localStorage.setItem("playSound", "PLAYING");
        socket.emit("controller:talk", {
          receivers: ["client"],
          eventName: "ccvq:answerBoxStatus",
          data: {
            status: "open",
          },
        });
      }
      if (data.status === "pause") {
        setPlaySound("PAUSED");
        localStorage.setItem("playSound", "PAUSED");
        socket.emit("controller:talk", {
          receivers: ["client"],
          eventName: "ccvq:answerBoxStatus",
          data: {
            status: "block",
          },
        });
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
      <Sound
        volume={volume}
        url={TimerCTC}
        playStatus={playSound}
        onPlaying={(props) => {
          if (currentTime < 15) {
            setCurrentTime(parseInt(props.position / 1000));
            localStorage.setItem(
              "currentTime",
              parseInt(props.position / 1000)
            );
          }
        }}
        onFinishedPlaying={() => {
          setPlaySound("STOPPED");
          socket.emit("controller:talk", {
            receivers: ["viewer", "livestream", "controller", "mc", "client"],
            eventName: "ccvq:timeState",
            data: {
              status: "pause",
            },
          });
        }
        }
      />
      <div className={styles.timer}>{getTime(time - currentTime)}</div>
    </>
  );
};

export default Timer;

import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
// import {socket} from "service/socket"
import { socket } from "service/socket";
import TimeBar from "../assets/QuestionScreen/TimeBarTTTL.png";
import TimeDivider from "../assets/QuestionScreen/TimeDivider.png";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
// import SoundTimer from "../assets/Sounds/SoundTimerTCTT.mp3";
import SoundTimer1 from "../assets/Sounds/10s.mp3";
import SoundTimer2 from "../assets/Sounds/20s.mp3";
import SoundTimer3 from "../assets/Sounds/30s.mp3";
import SoundTimer4 from "../assets/Sounds/40s.mp3";

const useStyles = makeStyles((theme) => ({
  bar: {
    zIndex: 2,
    position: "absolute",
    top: "7.25%",
    left: "80.45%",
    width: "10.5%",
    height: "84.5%",
  },
  background: {
    position: "absolute",
    zIndex: 3,
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
  },
  time: {
    position: "absolute",
    zIndex: 4,
    top: "0.5%",
    left: "0%",
    height: "99%",
    width: "100%",
    padding: "5%",
  },
  runTime: {
    borderRadius: "1vh",
    backgroundColor: "#F7F5F8",
  },
  TimeDivider: {
    position: "absolute",
    zIndex: 5,
    top: "23.3%",
    left: "39.4%",
    width: "60%",
    height: "56%",
  },
}));

const Timer = ({ slide }) => {
  const styles = useStyles();
  //
  const { volume } = useContext(SoundContext);

  const [time, setTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [pause, setPause] = useState(false);
  const [playSound, setPlaySound] = useState("STOPPED");
  const [soundUrl, setSoundUrl] = useState(null);

  useEffect(() => {
    socket.on("ccvq:setTime", (data) => {
      setPlaySound("STOPPED");
      setTime(data.seconds * 1000);
      setCurrentTime(data.seconds * 1000);
      switch (data.seconds) {
        case 10: {
          setSoundUrl(SoundTimer1);
          break;
        }
        case 20: {
          setSoundUrl(SoundTimer2);
          break;
        }
        case 30: {
          setSoundUrl(SoundTimer3);
          break;
        }
        case 40: {
          setSoundUrl(SoundTimer4);
          break;
        }
        default:
          break;
      }
    });

    socket.on("ccvq:timeState", (data) => {
      if (data.status === "start") {
        setPlaySound("PLAYING");
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
        setPause(true);
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
  });

  useEffect(() => {
    if (!pause) {
      let timeId = setTimeout(() => {
        if (currentTime > 0) {
          setCurrentTime(currentTime - 50);
        } else {
          setCurrentTime(0);
          clearTimeout(timeId);
        }
      }, 50);

      return () => {
        clearTimeout(timeId);
      };
    }
    //eslint-disable-next-line
  }, [pause, currentTime]);


  return (
    <div
      className={styles.bar}
      style={
        slide === "question"
          ? { animation: "2s ease 0s 1 normal none running slideInRight" }
          : {}
      }
    >
      {slide === "question" && (
        <Sound
          volume={volume}
          url={soundUrl}
          playStatus={playSound}
          onPlaying={(props) => {
            if (props.position <= time) setCurrentTime(time - props.position);
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
          }}
        />
      )}
      <img alt="timeBar" src={TimeBar} className={styles.background} />
      <div className={styles.time}>
        <div
          className={styles.runTime}
          style={
            !time
              ? { height: "100%" }
              : {
                height: 100 - ((time - currentTime) / time) * 100 + "%",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
          }
        />
      </div>
      <img alt="timeDivider" src={TimeDivider} className={styles.TimeDivider} />
    </div>
  );
};

export default Timer;

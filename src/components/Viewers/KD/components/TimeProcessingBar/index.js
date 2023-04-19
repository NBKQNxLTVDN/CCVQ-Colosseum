import React, { useState, useEffect, useContext } from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//socket
import { socket } from "service/socket";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import KD60s from "../../assets/sounds/KD60s.mp4";
import CHST10s from "../../assets/sounds/CHST-10s.mp4";
import CHST15s from "../../assets/sounds/CHST-15s.mp4";
import CHST20s from "../../assets/sounds/CHST-20s.mp4";
import CHST5s from "../../assets/sounds/CHST-5s.mp4";
import KD3s from "../../assets/sounds/3sec.mp4";

//styles
const useStyles = makeStyles((theme, props) => ({
  bar: {
    border: "7px solid #3D2147",
    backgroundColor: "#F7F5F8",
    zIndex: 2,
    position: "absolute",
    bottom: "28%",
    left: "5%",
    width: "90%",
    height: "6%",
    animation: "6s ease 0s 1 normal none running zoomInUp",
  },
  bar2: {
    left: "4%",
    width: "90%",
    bottom: "5%",
    height: "1%",
    zIndex: 2,
    position: "absolute",
  },
  time: {
    height: "100%",
    backgroundColor: "#3D2147",
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

let interval;

let timerInterval;

const TimerBar = (props) => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

  const [time, setTime] = useState(localStorage.getItem("time") || 0);
  const [pause, setPause] = useState(
    localStorage.getItem("timeState") !== "start"
  );
  const [milliseconds, setMilliseconds] = useState(
    localStorage.getItem("timer") || 0
  );
  const [display, setDisplay] = useState(false);
  const [soundUrl, setSoundUrl] = useState(localStorage.getItem("soundUrl"));
  const [playStatus, setPlayStatus] = useState(
    localStorage.getItem("soundStatus") || "STOPPED"
  );

  const [timer, setTimer] = useState(0);

  //test
  const [start, setStart] = useState(localStorage.getItem("timeStart") || 0);

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
      setSoundUrl(null);
      setMilliseconds(data.seconds * 1000);
      setTime(data.seconds * 1000);
      localStorage.setItem("time", data.seconds * 1000);
      localStorage.setItem("timer", data.seconds * 1000);
      switch (data.seconds) {
        case 60: {
          setSoundUrl(KD60s);
          localStorage.setItem("soundUrl", KD60s);
          break;
        }
        case 10: {
          setSoundUrl(CHST10s);
          localStorage.setItem("soundUrl", CHST10s);
          break;
        }
        case 15: {
          setSoundUrl(CHST15s);
          localStorage.setItem("soundUrl", CHST15s);
          break;
        }
        case 20: {
          setSoundUrl(CHST20s);
          localStorage.setItem("soundUrl", CHST20s);
          break;
        }
        case 5: {
          setSoundUrl(CHST5s);
          localStorage.setItem("soundUrl", CHST5s);
          break;
        }
        case 3: {
          setSoundUrl(KD3s);
          // localStorage.setItem("soundUrl", KD3s);
          break;
        }
        default: {
          console.log("NO SOUND FOR THIS TIME", data.seconds);
          setSoundUrl(null);
          localStorage.setItem("soundUrl", null);
          break;
        }
      }
    });
    socket.on("ccvq:timeState", (data) => {
      localStorage.setItem("timeState", data.status);
      // if (data.status === "pause" || data.status === "timeout") {
      //   socket.emit("controller:talk", {
      //     receivers: ["client"],
      //     eventName: "ccvq:bellStatus",
      //     data: {
      //       status: "block",
      //     },
      //   });
      //   setPause(true);
      // }
      if (data.status === "start") {
        setPause(false);
        setPlayStatus("PLAYING");
        localStorage.setItem("soundStatus", "PLAYING");
        setStart(new Date().getTime());
        localStorage.setItem("timeStart", new Date().getTime());
      }
    });

    return () => {
      socket.off("ccvq:setTime");
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!pause) {
      timerInterval = setTimeout(() => {
        if (milliseconds > 0) {
          setMilliseconds(milliseconds - 100);
          localStorage.setItem("timer", milliseconds - 100);
        } else {
          clearTimeout(timerInterval);
        }
      }, 100);
      return () => {
        clearTimeout(timerInterval);
      };
    }
  }, [pause, milliseconds]);

  useEffect(() => {
    if (Date.now() - start <= time) {
      const _timer = ((Date.now() - start) / time) * 100;
      setTimer(_timer);
    }
    //eslint-disable-next-line
  }, [milliseconds]);

  useEffect(() => {
    interval = setTimeout(() => {
      setDisplay(true);
    }, 3000);
    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <>
      {display && (
        <div className={props.isVD ? styles.bar2 : styles.bar}>
          <Sound
            volume={volume}
            url={soundUrl}
            playStatus={playStatus}
            onPlaying={(props) => {
              if (soundUrl === CHST5s && props.position > 5000) {
                socket.emit("controller:talk", {
                  receivers: ["client"],
                  eventName: "ccvq:bellStatus",
                  data: {
                    status: "block",
                  },
                });
              }
              // else if (soundUrl === KD3s && props.position > 3000) {
              //   socket.emit("controller:talk", {
              //     receivers: ["client"],
              //     eventName: "ccvq:bellStatus",
              //     data: {
              //       status: "block",
              //     },
              //   });
              // }
            }}
            onFinishedPlaying={() => {
              setPause(true);
              setPlayStatus("STOPPED");
              socket.emit("controller:talk", {
                receivers: ["viewer", "client", "mc", "controller"],
                eventName: "ccvq:timeState",
                data: {
                  status: "timeout",
                }
              });
            }}
          />
          <div
            className={
              !time || timer === 100 || pause
                ? styles.timeDone
                : props.isVD
                  ? styles.time2
                  : styles.time
            }
            style={!time ? { width: "0%" } : { width: timer + "%" }}
          ></div>
        </div>
      )}
    </>
  );
};

export default TimerBar;

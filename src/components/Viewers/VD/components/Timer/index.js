import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import Timer10sSound from "../../assets/sounds/10s MDTC.mp4";
import Timer15sSound from "../../assets/sounds/15s MDTC.mp4";
import Timer20sSound from "../../assets/sounds/20s MDTC.mp4";
import Timer40sSound from "../../assets/sounds/40s MDTC.mp4";

import Timer5sSound from "../../assets/sounds/Thời gian giành quyền trả lời.mp4";

const useStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: "#FFFFFF",
    border: "6px solid #001328",
    height: "100%",
    width: "100%",
    borderRadius: "30px",
    animation: "1.5s ease 0s 1 normal none running roleIn",
  },
  runTime: {
    backgroundColor: "#001328",
    borderRadius: "23px",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    // boxShadow: "5px 5px 5px black",
  },
}));

let VD_timer = null;

const Timer = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

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
      switch (parseInt(data.seconds)) {
        case 15:
          setSoundUrl(Timer15sSound);
          break;
        case 10:
          setSoundUrl(Timer10sSound);
          break;
        case 20:
          setSoundUrl(Timer20sSound);
          break;
        case 5:
          controlBellStatus("open");
          setSoundUrl(Timer5sSound);
          break;
        case 40:
          setSoundUrl(Timer40sSound);
          break;
        default:
          console.log("Invalid sound URL");
      }
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
      VD_timer = setTimeout(() => {
        if (currentTime > 0) {
          setCurrentTime(currentTime - 5);
        } else {
          clearTimeout(VD_timer);
        }
      }, 5 - (new Date() - dateBegin - (time - currentTime)));

      return () => {
        clearTimeout(VD_timer);
      };
    }
    //eslint-disable-next-line
  }, [pause, currentTime]);

  useEffect(() => {
    VD_timer = setTimeout(() => {
      setDisplay(true);
    }, 500);
    return () => {
      clearTimeout(VD_timer);
    };
  }, []);

  return (
    <>
      {display ? (
        <div className={styles.bar}>
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              padding: "10px",
            }}
          >
            <div
              style={{
                boxShadow: "inset 5px 5px 5px black",
                width: "100%",
                height: "100%",
                borderRadius: "23px",
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            >
              <div
                className={styles.runTime}
                style={
                  !time
                    ? { height: "50%" }
                    : (time - currentTime) / time === 1
                    ? {
                        height: ((time - currentTime) / time) * 100 + "%",
                      }
                    : {
                        height: ((time - currentTime) / time) * 100 + "%",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                      }
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Timer;

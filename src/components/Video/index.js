import React, { useEffect, useRef, useState } from "react";

import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";
import { ControlBar, Player } from "video-react";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#C43B00",
    width: "100vw",
    height: "100vh",
    zIndex: 100,
  },
  video: {
    margin: "auto",
  },
}));

let timeout = null;

const EffectIn = [
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "flipInX",
  "flipInY",
  "lightSpeedIn",
  "roleIn",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
];

const Video = () => {
  const styles = useStyles();

  const player = useRef(null);

  const [url, setUrl] = useState(null);
  const [status, setStatus] = useState("pause");
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState(null);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (url && player.current) {
      switch (status) {
        case "play": {
          player.current.actions.play();
          break;
        }
        case "pause": {
          player.current.actions.pause();
          break;
        }
        case "reset": {
          player.current.actions.seek(0);
          player.current.actions.pause();
          break;
        }
        default:
          break;
      }
    }
    if (status === "close") {
      setDisplay(false);
    }
  }, [status, url]);

  useEffect(() => {
    socket.on("ccvq:playVideo", (data) => {
      setStatus(data.status);
    });

    socket.on("ccvq:sendVideo", (data) => {
      setDisplay(false);
      if (data.url) {
        setType(data.type);
        setUrl(data.url);
        setAnimation(
          EffectIn[Math.floor(Math.random() * (EffectIn.length - 0 + 1)) + 0]
        );
        setDisplay(true);
        if (data.autoPlay) {
          timeout = setTimeout(() => {
            setStatus("play");
          }, 2500);
          return () => {
            clearTimeout(timeout);
          };
        }
      }
    });

    socket.on("ccvq:videoStatus", (data) => {
      if (data.status === "end") {
        setDisplay(false);
        setStatus("pause");
      }
    });

    return () => {
      socket.off("ccvq:playVideo");
      socket.off("ccvq:sendVideo");
      socket.off("ccvq:videoStatus");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {display && (
        <div
          className={styles.container}
          style={{
            animation: `2s ease 0s 1 normal none running ${animation}`,
          }}
        >
          {url && (
            <div className={styles.video}>
              {type === "image" ? (
                <img
                  src={`${process.env.PUBLIC_URL}/${url}`}
                  alt="question"
                  style={{
                    height: "auto",
                    width: "96%",
                    padding: "2%",
                  }}
                />
              ) : (
                <Player
                  ref={player}
                  src={`${process.env.PUBLIC_URL}/${url}`}
                  style={{
                    height: "auto",
                    width: "96%",
                    padding: "2%",
                  }}
                  onEnded={() => {
                    timeout = setTimeout(() => {
                      setDisplay(false);
                      setStatus("pause");
                      socket.emit("controller:talk", {
                        receivers: ["controller", "scoreboard"],
                        eventName: "ccvq:videoStatus",
                        data: {
                          status: "end",
                        },
                      });
                    }, 1000);
                    return () => {
                      clearTimeout(timeout);
                    };
                  }}
                >
                  <ControlBar disableCompletely={true} />
                </Player>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Video;

import React, { useState, useEffect, useContext } from "react";
import { socket } from "service/socket";
import { SoundContext } from "contexts/sound";
import Sound from "react-sound";

const SoundCCVQ = () => {
  const { volume, action } = useContext(SoundContext);
  const [url, setUrl] = useState("Sound_ô_trống_O9.mp3");
  const [soundStatus, setSoundStatus] = useState("PAUSED");

  const endMusic = () => {
    setSoundStatus("STOPPED");
    socket.emit("controller:talk", {
      receivers: ["controller"],
      eventName: "ccvq:soundStatus",
      data: {
        status: "end",
      },
    });
  };

  useEffect(() => {
    socket.on("ccvq:changeVolume", (data) => {
      action.handleChangeVolume(data.volume);
    });

    socket.on("ccvq:sendSound", (data) => {
      setSoundStatus("STOPPED");
      setUrl(data.url);
      if (data.autoPlay) {
        setSoundStatus("PLAYING");
      }
    });

    socket.on("ccvq:soundStatus", (data) => {
      switch (data.status) {
        case "end": {
          setSoundStatus("STOPPED");
          break;
        }
        case "pause": {
          setSoundStatus("PAUSED");
          break;
        }
        default: {
          break;
        }
      }
    });

    return () => {
      socket.off("ccvq:changeVolume");
      socket.off("ccvq:sendSound");
      socket.off("ccvq:soundStatus");
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sound
      volume={volume}
      url={`${process.env.PUBLIC_URL}/sounds/${url}`}
      playStatus={soundStatus}
      onFinishedPlaying={endMusic}
    />
  );
};

export default SoundCCVQ;

import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import StarSound from "../../assets/sounds/Ngôi sao hy vọng.mp4";

import StarImg from "../../assets/QuestionScreen/star.png";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "3%",
    right: "2%",
    padding: "0px 5px",
    borderRadius: "50%",
    animation: "2s ease 0s 1 normal none running fadeInUp",
    zIndex: 100,
  },
}));

const HopeStar = ({ withBg }) => {
  const styles = useStyles();
  const [display, setDisplay] = useState(false);
  const [soundUrl, setSoundUrl] = useState(null);

  const { volume } = useContext(SoundContext);

  useEffect(() => {
    socket.on("ccvq:hopeStar", (data) => {
      if (data.status === true) {
        setDisplay((prevState) => {
          if (prevState) {
            setSoundUrl(null);
          } else setSoundUrl(StarSound);
          return !prevState;
        });
      }
    });
    return () => {
      socket.off("ccvq:hopeStar");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {display && (
        <div
          className={styles.container}
          style={
            withBg
              ? {
                  boxShadow: "2px 2px 2px black",
                }
              : {}
          }
        >
          {soundUrl && (
            <Sound
              volume={volume}
              url={soundUrl}
              playStatus={"PLAYING"}
              onFinishedPlaying={() => {
                setSoundUrl(null);
              }}
            />
          )}
          <img alt="star" src={StarImg} style={{maxWidth: "100px"}}/>
        </div>
      )}
    </>
  );
};

export default HopeStar;

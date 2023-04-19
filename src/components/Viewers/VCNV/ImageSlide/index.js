import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
import Bell from "../Bell";
// import Background from "../assets/ImageQuizScreen/background.png";
import Background from "../assets/ImageQuizScreen/backgroundtttl.png";
// import MG1 from "../assets/ImageQuizScreen/MG1.png";
// import MG2 from "../assets/ImageQuizScreen/MG2.png";
// import MG3 from "../assets/ImageQuizScreen/MG3.png";
// import MG4 from "../assets/ImageQuizScreen/MG4.png";
// import MG5 from "../assets/ImageQuizScreen/MG5.png";
// import OTT from "../assets/ImageQuizScreen/OTT.png";
import Cover from "../assets/ImageQuizScreen/cover.png";

import MG1 from "../assets/ImageQuizScreen/Layer1.png";
import MG2 from "../assets/ImageQuizScreen/Layer2.png";
import MG3 from "../assets/ImageQuizScreen/Layer3.png";
import MG4 from "../assets/ImageQuizScreen/Layer4.png";
// import MG5 from "../assets/ImageQuizScreen/Layer5.png";
import OTT from "../assets/ImageQuizScreen/LayerCenter.png";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import OpenImage from "../assets/Sounds/OpenImage.mp3";
const image = [MG1, MG2, MG3, MG4];

const useStyles = makeStyles((theme) => ({
  background: {
    position: "absolute",
    top: "0%",
    left: "0%",
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  // Old MG
  // mg1: {
  //   position: "absolute",
  //   height: "51%",
  //   width: "38.75%",
  //   transform: "translate(-50%, -50%)",
  //   top: "41.15%",
  //   left: "31%",
  //   zIndex: 1,
  // },
  // mg2: {
  //   position: "absolute",
  //   height: "32.75%",
  //   width: "49%",
  //   transform: "translate(-50%, -50%)",
  //   top: "32%",
  //   left: "51%",
  //   zIndex: 1,
  // },
  // mg3: {
  //   position: "absolute",
  //   height: "53.75%",
  //   width: "28.75%",
  //   transform: "translate(-50%, -50%)",
  //   top: "42.4%",
  //   left: "74%",
  //   zIndex: 1,
  // },
  // mg4: {
  //   position: "absolute",
  //   height: "23%",
  //   width: "48.5%",
  //   transform: "translate(-50%, -50%)",
  //   top: "80.6%",
  //   left: "64.2%",
  //   zIndex: 1,
  // },
  // mg5: {
  //   position: "absolute",
  //   height: "44%",
  //   width: "35.5%",
  //   transform: "translate(-50%, -50%)",
  //   top: "70.2%",
  //   left: "29.25%",
  //   zIndex: 1,
  // },
  // ott: {
  //   position: "absolute",
  //   height: "34%",
  //   width: "31.75%",
  //   transform: "translate(-50%, -50%)",
  //   top: "52.15%",
  //   left: "50.1%",
  //   zIndex: 1,
  // },
  // cnv: {
  //   position: "absolute",
  //   height: "76.5%",
  //   width: "76.5%",
  //   transform: "translate(-50%, -50%)",
  //   top: "50%",
  //   left: "50%",
  //   zIndex: 0,
  // },
  mg: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    height: "78%",
    width: "78%",
    zIndex: 1,
  },
  cnv: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    height: "78%",
    width: "78%",
    top: "50%",
    left: "50%",
    zIndex: 0,
  },
  solution: {
    position: "absolute",
    height: "10%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    top: "85%",
    left: "50%",
    zIndex: 3,
    display: "flex",
    fontFamily: "Montserrat",
    fontSize: "5vh",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: "50%",
    color: "white",
  },
}));

const ImageSlide = ({ status, prevStatus, setPrevStatus, CNV }) => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  const [playSound, setPlaySound] = useState("STOPPED");
  const [url, setUrl] = useState(Cover);
  const [solution, setSolution] = useState();

  useEffect(() => {
    socket.on("vcnv:load_image", (data) => {
      setPlaySound("PLAYING");
      setUrl(data.url);
      setPrevStatus([...status]);
      setSolution(CNV);
      localStorage.setItem("prevStatus", JSON.stringify(status));
    });

    return () => {
      socket.off("vcnv:load_image");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Sound
        volume={volume}
        url={OpenImage}
        playStatus={playSound}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      <Bell direction="column" />
      <img alt="background" src={Background} className={styles.background} />
      {prevStatus.map((item, index) => {
        if (item !== "showed") {
          if (index < 4)
            return (
              <img
                alt={`mg${index + 1}`}
                src={image[index]}
                className={styles.mg}
                style={item === "hidden" ? { filter: "grayscale(75%)" } : {}}
              />
            );
          else if (index == 4)
            return (
              <img
                alt="ott"
                src={OTT}
                className={styles.mg}
                style={item === "hidden" ? { filter: "grayscale(75%)" } : {}}
              />
            );
        }
        return null;
      })}
      <img alt="cnv" src={url} className={styles.cnv} />
      {solution && <div className={styles.solution}>{solution}</div>}
    </div>
  );
};

export default ImageSlide;

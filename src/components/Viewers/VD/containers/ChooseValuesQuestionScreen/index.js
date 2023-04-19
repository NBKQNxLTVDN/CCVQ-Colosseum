import React, { useEffect, useContext, useState } from "react";

import { makeStyles } from "@mui/styles";

import background from "../../assets/ChooseQuestionScreen/VD-bg.png";
import scoreFrame from "../../assets/ChooseQuestionScreen/Asset 5.png";
import scoreFrame20 from "../../assets/ChooseQuestionScreen/Asset 4.png";
import scoreFrame30 from "../../assets/ChooseQuestionScreen/Asset 3.png";
// import circle1 from "../../assets/ChooseQuestionScreen/circle1.png";
// import circle2 from "../../assets/ChooseQuestionScreen/circle2.png";

import { socket } from "service/socket";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import OpenChooseValueQuestionScore from "../../assets/sounds/Mở gói câu hỏi.mp4";
import ChooseQuestionScoreSound from "../../assets/sounds/chọn các câu hỏi.mp4";
import ParticlesConfig from "../../components/Particles";

const useStyles = makeStyles((theme) => ({
  ChooseValuesQuestionScreen: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
  circle1: {
    position: "absolute",
    bottom: "8.4%",
    left: "3.7%",
    zIndex: 10,
    animation: "5s ease 0s 1 normal none running fadeInUp",
  },
  circle2: {
    position: "absolute",
    top: "8.6%",
    left: "34.2%",
    zIndex: 10,
    animation: "5s ease 0s 1 normal none running fadeInDown",
  },
  circle3: {
    position: "absolute",
    bottom: "8.5%",
    right: "3.5%",
    zIndex: 10,
    animation: "5s ease 0s 1 normal none running fadeInUp",
  },
  route: {
    position: "absolute",
    top: "31.5%",
    left: "27.5%",
    zIndex: 14,
  },
  route2: {
    position: "absolute",
    top: "14%",
    left: "26%",
    zIndex: 14,
  },
  scoreContainer: {
    position: "absolute",
    display: "grid",
    width: "100%",
    height: "100%",
    top: "20%",
    gridTemplateColumns: "1fr 1fr 1fr",
    animation: "3s ease 0s 1 normal none running fadeInUp",
  },
  questionItem: {
    position: "relative",
  },
  score: {
    position: "absolute",
    top: "18%",
    left: "43%",
    fontSize: "5em",
  },
  scoreFrame: {
    maxWidth: "400px",
  },
}));

let interval1,
  interval2,
  interval3 = null;

const ChooseValuesQuestionScreen = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

  const [soundUrl, setSoundUrl] = useState(OpenChooseValueQuestionScore);
  const [playSound, setPlaySound] = useState("PLAYING");
  const [score1, setScore1] = useState(scoreFrame);
  const [score2, setScore2] = useState(scoreFrame);
  const [score3, setScore3] = useState(scoreFrame);

  useEffect(() => {
    socket.on("VD:chooseValueQuestion", (data) => {
      setSoundUrl(null);
      setPlaySound("STOPPED");
      let id = parseInt(data.id);
      let score = parseInt(data.score);
      if(id === 0){
        if(score === 20){
          setScore1(scoreFrame20);
        }
        else if(score === 30){
          setScore1(scoreFrame30);
        }
        else setScore1(scoreFrame);
      }
      else if (id === 1){
        if(score === 20){
          setScore2(scoreFrame20);
        }
        else if(score === 30){
          setScore2(scoreFrame30);
        }
        else setScore2(scoreFrame);      }
      else if (id === 2){
        if(score === 20){
          setScore3(scoreFrame20);
        }
        else if(score === 30){
          setScore3(scoreFrame30);
        }
        else setScore3(scoreFrame);      }
      // let line = document.getElementById("line" + (id + 1));
      // if (id === 0) {
      //   line.setAttribute(
      //     "transform",
      //     "rotate(-" + (360 - 45 + 120 * (score - 1)) + ",74,75)"
      //   );
      //   clearInterval(interval1);
      // } else if (id === 1) {
      //   line.setAttribute(
      //     "transform",
      //     "rotate(" + (120 * (score - 1) - 15) + ",74,75)"
      //   );
      //   clearInterval(interval2);
      // } else if (id === 2) {
      //   line.setAttribute(
      //     "transform",
      //     "rotate(-" + (360 - 45 + 120 * (score - 1)) + ",74,75)"
      //   );
      //   clearInterval(interval3);
      // }
      setSoundUrl(ChooseQuestionScoreSound);
      setPlaySound("PLAYING");
    });

    return () => {
      socket.off("VD:chooseValueQuestion");
    };
    //eslint-disable-next-line
  }, []);

  // const rotateCircle1 = () => {
  //   clearInterval(interval1);
  //   var i = 0;
  //   var line1 = document.getElementById("line1");
  //   interval1 = setInterval(function () {
  //     i += 5;
  //     line1.setAttribute("transform", "rotate(" + i + ",74,75)");
  //   }, 25);
  // };

  // const rotateCircle2 = () => {
  //   clearInterval(interval2);
  //   var i = 0;
  //   var line = document.getElementById("line2");
  //   interval2 = setInterval(function () {
  //     i -= 5;
  //     line.setAttribute("transform", "rotate(" + i + ",74,75)");
  //   }, 25);
  // };

  // const rotateCircle3 = () => {
  //   clearInterval(interval3);
  //   var i = 0;
  //   var line = document.getElementById("line3");
  //   interval3 = setInterval(function () {
  //     i += 5;
  //     line.setAttribute("transform", "rotate(" + i + ",74,75)");
  //   }, 25);
  // };

  // useEffect(() => {
  //   rotateCircle1();
  //   rotateCircle2();
  //   rotateCircle3();
  // }, []);

  const onFinishSound = () => {
    setSoundUrl(null);
    setPlaySound("STOPPED");
  };

  return (
    <div className={styles.ChooseValuesQuestionScreen}>
      <Sound
        volume={volume}
        url={soundUrl}
        playStatus={playSound}
        onFinishedPlaying={onFinishSound}
      />
      <ParticlesConfig />
      <div className={styles.scoreContainer}>
        <div className={styles.questionItem}>
          <img alt="scoreFrame" src={score1} className={styles.scoreFrame} />
        </div>
        <div className={styles.questionItem}>
          <img alt="scoreFrame" src={score2} className={styles.scoreFrame} />
        </div> 
        <div className={styles.questionItem}>
          <img alt="scoreFrame" src={score3} className={styles.scoreFrame} />
        </div> 

        
      </div>
      <img alt="background" src={background} className={styles.background} />

      {/* <div className={styles.circle1}>
        <img alt="circle1" src={circle1} />
        <svg height="150" width="150" className={styles.route} id="line1">
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            stroke-width="20"
            stroke="black"
          ></line>
        </svg>
      </div>
      <div className={styles.circle2}>
        <img alt="circle2" src={circle2} />
        <svg height="150" width="150" className={styles.route2} id="line2">
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            stroke-width="20"
            stroke="black"
          ></line>
        </svg>
      </div>
      <div className={styles.circle3}>
        <img alt="circle3" src={circle1} />
        <svg height="150" width="150" className={styles.route} id="line3">
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            stroke-width="20"
            stroke="black"
          ></line>
        </svg>
      </div> */}
    </div>
  );
};

export default ChooseValuesQuestionScreen;

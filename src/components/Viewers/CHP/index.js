import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import { socket } from "service/socket";
import AnswerSlide from "./components/AnswerSlide";
import QuestionSlide from "./components/QuestionSlide";

import Background from "./assets/images/background.png";
import Beginning from "./assets/sounds/SoundBeginningTCTT.mp3";
import RightAnswer from "./assets/sounds/Trả lời đúng.mp4";
import WrongAnswer from "./assets/sounds/Trả lời sai.mp4";

const useStyles = makeStyles((theme) => ({
  viewer: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    fontFamily: "Verdana",
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
}));

const ViewerCHP = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  const [url, setUrl] = useState(Beginning);
  const [slide, setSlide] = useState("waiting");
  const [playSound, setPlaySound] = useState("PLAYING");
  const [Candidate, setCandidate] = useState();
  const [question, setQuestion] = useState();

  useEffect(() => {
    socket.on("CHP:sendQuestion", (data) => {
      setQuestion(data.question);
      setSlide("question");
    });

    socket.on("CHP:result_question", (data) => {
      if (data.status) {
        setUrl(RightAnswer);
      } else {
        setUrl(WrongAnswer);
      }
    });
    //   socket.on("ccvq:show_solution", (data) => {
    //     setSlide("solution");
    //   });
    //   socket.on("ccvq:show_all_players_ans", (data) => {
    //     setCandidate(data.players);
    //     setSlide("answer");
    //   });

    //   // socket.on("CHP:sound", (data) => {
    //   //   if (data.name === "RightAnswer") setUrl(RightAnswer);
    //   //   if (data.name === "WrongAnswer") setUrl(WrongAnswer);
    //   //   setPlaySound("PLAYING");
    //   // });

    return () => {
      socket.off("CHP:sendQuestion");
      //     socket.off("ccvq:show_solution");
      //     socket.off("ccvq:show_all_players_ans");
      socket.off("CHP:result_question");
    };
    //   //eslint-disable-next-line
  }, []);



  return (
    <div className={styles.viewer}>
      <Sound
        volume={volume}
        url={url}
        playStatus={playSound}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      {slide === "waiting" && (
        <img className={styles.background} alt="background" src={Background} />
      )}
      {(slide === "question" || slide === "solution") && (
        <QuestionSlide question={question} />
      )}
      {slide === "answer" && <AnswerSlide Candidate={Candidate} />}
    </div>
  );
};

export default ViewerCHP;

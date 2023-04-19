import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import Background from "./assets/WaitingScreen/background.png";
import AnswerSlide from "./AnswerSlide";
import QuestionSlide from "./QuestionSlide";
import { socket } from "service/socket";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import Beginning from "./assets/Sounds/SoundBeginningTCTT.mp3";
import RightAnswer from "./assets/Sounds/RightAnswer.mp3";
import WrongAnswer from "./assets/Sounds/WrongAnswer.mp3";

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

const ViewerTT = () => {
  const styles = useStyles();
  //
  const { volume } = useContext(SoundContext);
  const [slide, setSlide] = useState("waiting");
  const [url, setUrl] = useState(Beginning);
  const [playSound, setPlaySound] = useState("PLAYING");
  const [Candidate, setCandidate] = useState();
  const [dataSolution, setDataSolution] = useState();

  useEffect(() => {
    socket.on("tt:state", () => {
      setDataSolution(null);
      setSlide("waiting");
      setSlide("question");
    });

    socket.on("ccvq:show_solution", (data) => {
      setDataSolution(data);
      setSlide("solution");
    });
    socket.on("ccvq:show_all_players_ans", (data) => {
      setCandidate(data.players);
      setSlide("answer");
    });

    socket.on("tt:sound", (data) => {
      if (data.name === "RightAnswer") setUrl(RightAnswer);
      if (data.name === "WrongAnswer") setUrl(WrongAnswer);
      setPlaySound("PLAYING");
    });

    return () => {
      socket.off("tt:state");
      socket.off("ccvq:show_solution");
      socket.off("ccvq:show_all_players_ans");
      socket.off("tt:sound");
    };
    //eslint-disable-next-line
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
        <QuestionSlide slide={slide} dataSolution={dataSolution} />
      )}
      {slide === "answer" && <AnswerSlide Candidate={Candidate} />}
    </div>
  );
};

export default ViewerTT;

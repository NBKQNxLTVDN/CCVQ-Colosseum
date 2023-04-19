import React, { useState, useEffect, useContext } from "react";
import { socket } from "service/socket";
import { makeStyles } from "@mui/styles";
import HTMLStringConvert from "components/HTMLStringConvert";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";

const useStyles = makeStyles((theme) => ({
  question: {
    display: "flex",
    width: "58%",
    height: "80%",
    position: "absolute",
    top: "49.5%",
    left: "31.75%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    userSelect: "none",
    fontSize: "4vh",
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "white",
    padding: "20px",
  },
  image: {
    position: "absolute",
    zIndex: 2,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "100%",
    width: "100%",
  },
}));

const Question = () => {
  const styles = useStyles();
  const { volume } = useContext(SoundContext);

  const [playSound, setPlaySound] = useState("PLAYING");
  const [question, setQuestion] = useState(
    JSON.parse(localStorage.getItem("question")) || null
  );
  const [playQuesAudio, setPlayQuesAudio] = useState(
    localStorage.getItem("playQuesAudio") === "true"
  );

  useEffect(() => {
    socket.on("ccvq:sendQues_viewer", (data) => {
      setQuestion(data);
      localStorage.setItem("question", JSON.stringify(data));
    });

    socket.on("vcnv:playQuesAudio", () => {
      setPlayQuesAudio(true);
      localStorage.setItem("playQuesAudio", "true");
    });

    return () => {
      socket.off("ccvq:sendQues_viewer");
      socket.off("vcnv:showQuesImage");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.question}>
        {question && question.type !== "image" && (
          <HTMLStringConvert string={question.ques_content} />
        )}
        {question && question.type === "image" && (
          <img
            src={`${process.env.PUBLIC_URL}/data/VCNV/${question.url}`}
            alt="question"
            style={{ height: "100%", width: "100%" }}
          />
        )}
      </div>
      {playQuesAudio && (
        <Sound
          volume={volume}
          url={`${process.env.PUBLIC_URL}/data/VCNV/${question?.url}`}
          playStatus={playSound}
          onFinishedPlaying={() => setPlaySound("STOPPED")}
        />
      )}
    </>
  );
};

export default Question;

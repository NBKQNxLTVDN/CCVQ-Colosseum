import React, { useState, useEffect, useContext } from "react";

//material-ui
import { makeStyles } from "@mui/styles";
import Background from "./assets/WaitingScreen/background.png";
import { socket } from "service/socket";
import CrosswordSlide from "./CrosswordSlide";
import QuestionSlide from "./QuestionSlide";
import ImageSlide from "./ImageSlide";
import AnswerSlide from "./AnswerSlide";
import Bell from "./Bell";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import IntroCTC from "./assets/Sounds/IntroCTC.mp3";
import Auction from "./assets/Sounds/Auction.mp3";
import Hint from "./assets/Sounds/Hint.mp3";
import OpenAllCrossword from "./assets/Sounds/OpenAllCrossword.mp3";
import OpenOneCrossword from "./assets/Sounds/OpenOneCrossword.mp3";
import RightCNV from "./assets/Sounds/RightCNV.mp3";
import WrongCNV from "./assets/Sounds/WrongCNV.mp3";
import RightRow from "./assets/Sounds/RightRow.mp3";
import Last15s from "./assets/Sounds/Last15s.mp3";

//styles
const useStyles = makeStyles((theme) => ({
  ViewerVCNV: {
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

const defaultStatus = ["none", "none", "none", "none", "none", "none"];

const ViewerVCNV = () => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);

  const [crossword, setCrossword] = useState(
    JSON.parse(localStorage.getItem("crossword")) || null
  );

  const [CNV, setCNV] = useState(localStorage.getItem("CNV") || null);

  const [status, setStatus] = useState(
    JSON.parse(localStorage.getItem("status")) || [...defaultStatus]
  );

  const [prevStatus, setPrevStatus] = useState(
    JSON.parse(localStorage.getItem("prevStatus")) || [...defaultStatus]
  );

  const [slide, setSlide] = useState(
    localStorage.getItem("slide") || "waiting"
  );

  const [answer, setAnswer] = useState(
    JSON.parse(localStorage.getItem("answer")) || null
  );

  const syncUrlSound = (data) => {
    switch (data) {
      case "Auction":
        return Auction;
      case "Hint":
        return Hint;
      case "OpenAllCrossword":
        return OpenAllCrossword;
      case "OpenOneCrossword":
        return OpenOneCrossword;
      case "RightCNV":
        return RightCNV;
      case "WrongCNV":
        return WrongCNV;
      case "RightRow":
        return RightRow;
      case "Last15s":
        return Last15s;
      default:
        return IntroCTC;
    }
  };

  const [url, setUrl] = useState(syncUrlSound(localStorage.getItem("url")));

  const [playSound, setPlaySound] = useState("PLAYING");
  //eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const forceUpdate = () => setSeed(Math.random());

  const sendToMCStatusCrossword = (data) => {
    socket.emit("controller:talk", {
      receivers: ["mc"],
      eventName: "vcnv:sendToMCStatusCrossword",
      data: data,
    });
  };

  const controlBellStatus = (status) => {
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream", "mc", "client"],
      eventName: "ccvq:bellStatus",
      data: {
        status: status,
      },
    });
  };

  const countDown = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "controller", "mc", "client"],
      eventName: "ccvq:setTime",
      data: {
        seconds: 15,
      },
    });

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "controller", "mc", "client"],
      eventName: "ccvq:timeState",
      data: {
        status: "start",
      },
    });

    controlBellStatus("open");
  };

  useEffect(() => {
    socket.on("vcnv:crossword", (data) => {
      let temp = data.crossword.map((item, index) => {
        if (index < 4) {
          let line = [];
          for (let i = 0; i < parseInt((15 - item.length) / 2); i++) {
            line.push("");
          }
          for (let i = 0; i < item.length; i++) {
            line.push(item.word[i]);
          }
          for (let i = line.length; i < 15; i++) {
            line.push("");
          }
          return line;
        } else return null;
      });
      temp.pop();
      setCrossword(temp);
      setStatus([...defaultStatus]);
      setPrevStatus([...defaultStatus]);
      localStorage.setItem("crossword", JSON.stringify(temp));
      localStorage.setItem("status", JSON.stringify(status));
      localStorage.setItem("prevStatus", JSON.stringify(prevStatus));
    });

    socket.on("vcnv:choose_ques", (data) => {
      let temp = [...status];
      if (data.status === true) {
        setUrl(OpenOneCrossword);
        localStorage.setItem("url", "OpenOneCrossword");
        setPlaySound("PLAYING");
        temp[data.ques_num - 1] = "chosen";
      } else {
        temp[data.ques_num - 1] = "none";
        localStorage.removeItem("question");
        localStorage.removeItem("question");
      }
      setStatus(temp);
      localStorage.setItem("status", JSON.stringify(temp));
      sendToMCStatusCrossword(temp);
      forceUpdate();
    });

    socket.on("vcnv:switch_slides", (data) => {
      setSlide("waiting");
      setSlide(data.status);
      localStorage.setItem("slide", data.status);
      localStorage.removeItem("question");
      localStorage.removeItem("playQuesAudio");
      localStorage.removeItem("display");
      localStorage.removeItem("answer");
      if (
        !(
          status.includes("chosen") ||
          status.includes("showed") ||
          status.includes("hidden")
        ) &&
        data.status === "crossword"
      ) {
        setUrl(OpenAllCrossword);
        localStorage.setItem("url", "OpenAllCrossword");
        setPlaySound("PLAYING");
        controlBellStatus("open");
      }
    });

    socket.on("ccvq:show_all_players_ans", (data) => {
      setSlide("answer");
      setAnswer(data.players);
      localStorage.setItem("slide", "answer");
      localStorage.setItem("answer", JSON.stringify(data.players));
      localStorage.removeItem("question");
      localStorage.removeItem("playQuesAudio");
      localStorage.removeItem("playSound");
      localStorage.removeItem("time");
      localStorage.removeItem("currentTime");
    });

    socket.on("vcnv:sound", (data) => {
      if (data.name === "Auction") {
        setUrl(Auction);
        countDown();
      }
      if (data.name === "Hint") setUrl(Hint);
      if (data.name === "Last15s") {
        setUrl(Last15s);
        countDown();
      }
      if (data.name === "RightRow") setUrl(RightRow);
      if (data.name === "RightCNV") setUrl(RightCNV);
      if (data.name === "WrongCNV") setUrl(WrongCNV);
      localStorage.setItem("url", data.name);
      setPlaySound("PLAYING");
    });

    socket.on("vcnv:reveal_row", (data) => {
      let temp = [...status];
      temp[data.row_num - 1] = data.status ? "showed" : "hidden";
      setStatus(temp);
      localStorage.setItem("status", JSON.stringify(temp));
      sendToMCStatusCrossword(temp);
      forceUpdate();
    });

    socket.on("vcnv:openAll", (data) => {
      setStatus(["showed", "showed", "showed", "showed", "showed", "showed"]);
      setCNV(data.cnv);
      localStorage.setItem(
        "status",
        JSON.stringify([
          "showed",
          "showed",
          "showed",
          "showed",
          "showed",
          "showed",
        ])
      );
      localStorage.setItem("CNV", data.cnv);
    });

    return () => {
      socket.off("vcnv:length_row");
      socket.off("vcnv:choose_ques");
      socket.off("vcnv:switch_slides");
      socket.off("ccvq:show_all_players_ans");
      socket.off("vcnv:sound");
      socket.off("vcnv:reveal_row");
      socket.off("vcnv:openAll");
    };
    //eslint-disable-next-line
  });

  return (
    <div className={styles.ViewerVCNV}>
      <Sound
        volume={volume}
        url={url}
        onPlaying={(props) => {
          if (url === Last15s && props.position >= 15000)
            controlBellStatus("block");
        }}
        playStatus={playSound}
        onFinishedPlaying={() => {
          setPlaySound("STOPPED");
          localStorage.removeItem("url");
          if (url === Auction) controlBellStatus("block");
        }}
      />
      {slide === "waiting" && (
        <>
          <img
            alt="background"
            src={Background}
            className={styles.background}
          />
          <Bell direction={"column"} />
        </>
      )}
      {slide === "crossword" && (
        <CrosswordSlide crossword={crossword} status={status} />
      )}
      {slide === "question" && (
        <QuestionSlide crossword={crossword} status={status} />
      )}
      {slide === "answer" && <AnswerSlide data={answer} />}
      {slide === "image" && (
        <ImageSlide
          status={status}
          prevStatus={prevStatus}
          setPrevStatus={setPrevStatus}
          CNV={CNV}
        />
      )}
    </div>
  );
};

export default ViewerVCNV;

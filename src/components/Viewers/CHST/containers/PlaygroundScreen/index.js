import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import Question from "../../components/Question";
import Opponent from "../../components/Opponent";
import HopeStar from "components/Viewers/VD/components/HopeStar";

import Background from "../../assets/images/background_choose_scores.png";
import PlayerName from "../../assets/images/name_bar.png";
import PlayerScore from "../../assets/images/player_score_bar.png";

import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import OpenQuestionSound from "../../assets/sounds/Mở gói câu hỏi.mp4";
import InCorrectAnsSound from "../../assets/sounds/Trả lời sai.mp4";
import CorrectAnsSound from "../../assets/sounds/Trả lời đúng.mp4";

const useStyles = makeStyles((theme) => ({
  screen: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    fontFamily: "'Montserrat', sans-serif",
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  container: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    padding: "2% 4%",
    display: "grid",
    gridTemplateRows: "1fr 12fr 1.5fr",
    rowGap: "5%",
  },
  opponents: {
    display: "grid",
    width: "70%",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "5%",
    animation: "2s ease 0s 1 normal none running fadeInUp",
  },
  body: {
    display: "grid",
    gridTemplateColumns: "auto 25%",
    columnGap: "5%",
    alignItems: "center",
  },
  opponent: {
    width: "fit-content",
    height: "100%",
    position: "relative",
    padding: "0 15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "3.5vh",
  },
  headerField: {
    background: "-webkit-linear-gradient(left,#3B2344,#120218)",
    width: "70%",
    borderRadius: "20px",
    color: "white",
    height: "150%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "5vh",
    animation: "2s ease 0s 1 normal none running fadeInDown",
  },
}));

const PlaygroundScreen = (props) => {
  const styles = useStyles();
  const [playSound, setPlaySound] = useState("PLAYING");
  const { playerOrder, field } = props;

  const { players } = useContext(MainContext);
  const { volume } = useContext(SoundContext);

  return (
    <div className={styles.screen}>
      <Sound
        volume={volume}
        url={OpenQuestionSound}
        playStatus={playSound}
        onFinishedPlaying={() => setPlaySound("STOPPED")}
      />
      <img alt="background" src={Background} className={styles.background} />
      <div className={styles.container}>
        <div className={styles.headerField}>{field}</div>
        <div className={styles.body}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Question field={field} />
            <HopeStar withBg={true} />
          </div>
          <Player player={players[playerOrder - 1]} />
        </div>
        <div className={styles.opponents}>
          {players.map((player) => (
            <>
              {player.order !== playerOrder && (
                <Opponent
                  name={player.name}
                  score={player.score}
                  order={player.order}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

const useStylesPlayer = makeStyles((theme) => ({
  player: {
    width: "100%",
    height: "70%",
    display: "grid",
    gridTemplateRows: "1fr 4fr",
    rowGap: "5%",
    animation: "2s ease 0s 1 normal none running fadeInRight",
  },
  playerName: {
    position: "relative",
  },
  playerScore: {
    position: "relative",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
}));

const Player = (props) => {
  const styles = useStylesPlayer();

  const { player } = props;
  const [soundUrl, setSoundUrl] = useState(null);
  const [playStatus, setPlayStatus] = useState("STOPPED");

  useEffect(() => {
    socket.on("CHST:result_question", (data) => {
      if (data.status) {
        setSoundUrl(CorrectAnsSound);
      } else {
        setSoundUrl(InCorrectAnsSound);
      }
      setPlayStatus("PLAYING");
    });

    return () => {
      socket.off("CHST:result_question");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Sound
        url={soundUrl}
        playStatus={playStatus}
        onFinishedPlaying={() => {
          setSoundUrl(null);
          setPlayStatus("STOPPED");
        }}
      />
      <div className={styles.player}>
        <div className={styles.playerName}>
          <img alt="name" src={PlayerName} className={styles.background} />
          <div className={styles.content} style={{ fontSize: "4vh" }}>
            {player.name}
          </div>
        </div>
        <div className={styles.playerScore} style={{ fontSize: "20vh" }}>
          <img alt="score" src={PlayerScore} className={styles.background} />
          <div className={styles.content}>{player.score}</div>
        </div>
      </div>
    </>
  );
};

export default PlaygroundScreen;

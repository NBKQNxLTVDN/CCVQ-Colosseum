import React, { useState, useEffect, useContext } from "react";

//material-ui
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import BellRingerSound from "../../assets/sounds/Tín hiệu trả lời.mp4";

//styles
const useStyles = makeStyles((theme) => ({
  opponent: {
    display: "flex",
    borderRadius: "20px",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "32%",
    height: "100%",
    zIndex: 1,
    animation: "1s ease 0s 1 normal none running slideInLeft",
  },
  opponentInfo: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    width: "100%",
    height: "100%",
    alignItems: "center",
    columnGap: "5%",
  },
  opponentName: {
    width: "100%",
    color: "#3D2147",
    fontWeight: 800,
    fontSize: "4vh",
    paddingLeft: "10px",
    animation: "2s ease 0s 1 normal none running fadeInDown",
  },
  opponentScore: {
    width: "80%",
    height: "80%",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3D2147",
    fontWeight: 900,
    fontSize: "3.5vw",
    backgroundColor: "#EEB3A0",
    borderRadius: "10px",
    animation: "2s ease 0s 1 normal none running fadeInUp",
  },
}));

let interval;

const OpponentCard = (props) => {
  const styles = useStyles();
  const { player, bellRank, setBellRank } = props;
  const [display, setDisplay] = useState(false);
  const { volume } = useContext(SoundContext);
  const [soundUrl, setSoundUrl] = useState();
  const [soundStatus, setSoundStatus] = useState("STOPPED");
  const [bell, setBell] = useState(false);

  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      if (player.order === data.order) {
        let order = data.order;
        let client = [];
        client.push(`client${order}`);
        socket.emit("controller:talk", {
          receivers: [...client],
          eventName: "ccvq:block_bell",
          data: {
            order: order,
          },
        });
        setBellRank((prevState) => {
          if (prevState.length === 1) {
            if (data.time < prevState.time) {
              socket.emit("controller:talk", {
                receivers: ["client"],
                eventName: "ccvq:bellStatus",
                data: {
                  status: "block",
                },
              });
              return [...prevState, { ...data }];
            }
            return [...prevState];
          }
          else {
            setSoundUrl(BellRingerSound);
            setSoundStatus("PLAYING");
            return [...prevState, { ...data }];
          }
        });
      }
    });

    socket.on("ccvq:bellStatus", (data) => {
      if (data.status === "open") {
        setBellRank([]);
      }
    });

    return () => {
      socket.off("client:bell_signal");
      socket.off("ccvq:bellStatus");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setBell(bellRank[0]?.order === player.order);
    // eslint-disable-next-line
  }, [bellRank]);

  useEffect(() => {
    interval = setTimeout(() => {
      setDisplay(true);
    }, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, []);


  return (
    <div id={player.order} className={styles.opponent} key={player.order} style={
      bell
        ? { backgroundColor: "#36e736" }
        : { backgroundColor: "#DAD4E2", }
    }>
      {soundUrl && (
        <Sound
          volume={volume}
          url={soundUrl}
          playStatus={soundStatus}
          onFinishedPlaying={() => {
            setSoundUrl(null);
            setSoundStatus("STOPPED");
          }}
        />
      )}
      <div className={styles.opponentInfo}>
        {display && (
          <>
            <div className={styles.opponentName} style={bell ? { color: "white" } : {}}>{player.name}</div>
            <div className={styles.opponentScore}>{player.score}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default OpponentCard;

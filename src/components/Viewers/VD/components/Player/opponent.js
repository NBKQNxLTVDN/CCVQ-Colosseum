import React, { useState, useEffect, useContext } from "react";

import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

//sounds
import Sound from "react-sound";
import { SoundContext } from "contexts/sound";
import BellRingerSound from "../../assets/sounds/Tín hiệu trả lời.mp4";

const useStyles = makeStyles((theme) => ({
  OpponentCard: {
    border: "8px solid #001328",
    height: "100%",
    width: "100%",
    borderRadius: "30px",
    backgroundColor: "#FFFFFF",
    boxShadow: "inset 5px 5px 5px #000",
    color: "#001328",

    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5%",
    alignItems: "center",
    padding: "2%",

    position: "relative",
  },
  bellRank: {
    position: "absolute",
    top: "20%",
    left: "-13%",
    backgroundColor: "white",
    fontSize: "5vh",
    width: "20%",
    borderRadius: "50%",
    boxShadow: "3px 3px 3px #000000",
    fontWeight: "bold",
  },
  name: {
    fontSize: "3vh",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  score: {
    fontSize: "4vh",
    fontWeight: "bold",
    backgroundColor: "#001328",
    color: "#FFFFFF",
    height: "85%",
    width: "90%",
    borderRadius: "20px",
    boxShadow: "3px 3px 3px #001328",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

let timeout = null;

const OpponentCard = ({ idx, player, bellRank, setBellRank, forceUpdate }) => {
  const styles = useStyles();

  const { volume } = useContext(SoundContext);
  const [soundUrl, setSoundUrl] = useState();
  const [soundStatus, setSoundStatus] = useState("STOPPED");

  const [bell, setBell] = useState(false);
  const [display, setDisplay] = useState(false);

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
          } else {
            setSoundUrl(BellRingerSound);
            setSoundStatus("PLAYING");
            forceUpdate();
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
    timeout = setTimeout(() => {
      setDisplay(true);
    }, 500 * idx);
    return () => {
      clearTimeout(timeout);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setBell(bellRank[0]?.order === player.order);
    // eslint-disable-next-line
  }, [bellRank]);

  return (
    <>
      {display && (
        <div
          className={styles.OpponentCard}
          style={
            bell
              ? { backgroundColor: "green" }
              : {
                  animation: `1s ease 0s 1 normal none running fadeInRight`,
                }
          }
        >
          {/* {bellRank !== 0 && <div className={styles.bellRank}>{bellRank}</div>} */}
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
          <div className={styles.name}>{player.name}</div>
          <div
            className={styles.score}
            style={bell ? { backgroundColor: "orange", color: "#71001A" } : {}}
          >
            {player.score}
          </div>
        </div>
      )}
    </>
  );
};

export default OpponentCard;

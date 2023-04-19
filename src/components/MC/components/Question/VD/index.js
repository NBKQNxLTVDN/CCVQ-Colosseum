import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
import { MainContext } from "contexts/MainContext";
import BoxContent from "components/MC/components/BoxContent";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "10% 85%",
    rowGap: "5%",
    height: "100%",
  },

  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "5%",
    height: "100%",
  },

  AnswerCCVQContainer: {
    display: "grid",
    gridTemplateRows: "3fr 7fr",
    height: "100%",
    rowGap: "5%",
  },
  title: {
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#C4C4C4",
    boxShadow: "inset 5px 5px 5px #000000",
    display: "flex",
    flexDirection: "row",
    gap: "5%",
    alignItems: "center",
    height: "100%",
    minWidth: "30%",
    padding: "1%",
    fontSize: "2rem",
  },
  value: {
    padding: "1%",
    borderRadius: "50%",
    maxHeight: "50px",
    maxWidth: "50px",
    backgroundColor: theme.palette.tertiary.main,
  },
  rankPlayers: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    gap: "10%",
  },
}));

const VD = ({ setHideTitleRound }) => {
  const styles = useStyles();

  const { players } = useContext(MainContext);

  const [data, setData] = useState(null);
  const [rankPlayers, setRankPlayers] = useState(
    [...players].sort(
      (prevPlayer, currentPlayer) => currentPlayer.score - prevPlayer.score
    )
  );
  const [valueQuestions, setValueQuestions] = useState([]);
  const [star, setStar] = useState(false);

  useEffect(() => {
    socket.on("VD:init_data", () => {
      setHideTitleRound(true);
      setValueQuestions([]);
    });

    socket.on("ccvq:sendQuestion_mc", (data) => {
      setHideTitleRound(true);
      setData(data.question);
    });

    socket.on("VD:chooseValueQuestion", (data) => {
      setValueQuestions((prevState) => {
        if (prevState.length >= data.id) {
          prevState[data.id] = data.score;
        } else {
          prevState.push(data.score);
        }
        return [...prevState];
      });
    });

    socket.on("VD:status", (data) => {
      if (data.status === "end") setData(null);
      setRankPlayers((prevState) =>
        prevState
          .filter((player) => player.order !== data.player)
          .sort(
            (prevPlayer, currentPlayer) =>
              currentPlayer.score - prevPlayer.score
          )
      );
      setValueQuestions([]);
    });

    socket.on("ccvq:hopeStar", () => {
      setStar(true);
    });

    return () => {
      socket.off("VD:init_data");
      socket.off("VD:status");
      socket.off("VD:chooseValueQuestion");
      socket.off("ccvq:sendQuestion_mc");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        columnGap: "3%",
        height: "100%",
      }}
    >
      <div className={styles.rankPlayers}>
        {rankPlayers.map((player, idx) => (
          <div key={player.order} className={styles.title}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  color: idx === 0 ? "red" : "black",
                }}
              >
                {player.name}
              </div>
              <div>{player.score}</div>
              {idx === 0 && valueQuestions && (
                <div>
                  {valueQuestions.map((value) => (
                    <>| {value} |</>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {data && (
        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className={styles.title}>
              <span className={styles.header}></span>
              <span>
                ĐIỂM [{data.score}]{star && " (NSHV)"}
              </span>
            </div>
            <div className={styles.title}>
              <span className={styles.header}></span>
              {data.time_practical ? (
                <span>THỜI GIAN THỰC HÀNH [{data.time_practical}]</span>
              ) : (
                <span>LOẠI CÂU [{data.type}]</span>
              )}
            </div>
            <div className={styles.title}>
              <span className={styles.header}></span>
              <span>THỜI GIAN [{data.time || "15"}s]</span>
            </div>
          </div>
          <div className={styles.content}>
            <BoxContent header="Question" content={data.data.question} />
            <div className={styles.AnswerCCVQContainer}>
              <BoxContent header="Answer" content={data.data.ans} />
              <BoxContent header="Solution" content={data.data.solution} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VD;

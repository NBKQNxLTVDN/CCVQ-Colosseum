import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

import KD from "./KD";
import MHDT from "./MHDT";
import TT from "./TT";
import VD from "./VD";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  titleRound: {
    border: "1px solid black",
    position: "absolute",
    top: "0%",
    right: "0%",
    fontSize: "3vh",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: "1% 2%",
    borderRadius: "40px",
  },
  question: {
    height: "100%",
    overflowY: "scroll",
  },
}));

const QuestionContent = () => {
  const styles = useStyles();

  const [round, setRound] = useState(
    localStorage.getItem("roundName") || "DKHT"
  );
  const [hideTitleRound, setHideTitleRound] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    socket.on("ccvq:changeRound", (data) => {
      setDisplay(false);
      setRound(data.roundName);
      localStorage.setItem("roundName", data.roundName);
      setHideTitleRound(false);
      setDisplay(true);
    });
    return () => {
      socket.off("ccvq:changeRound");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      {!hideTitleRound && <div className={styles.titleRound}>{round}</div>}
      {display && (
        <div className={styles.question}>
          {round === "KD" && <KD setHideTitleRound={setHideTitleRound} />}
          {round === "TT" && <TT setHideTitleRound={setHideTitleRound} />}
          {round === "VCNV" && (
            <TT setHideTitleRound={setHideTitleRound} roundName="VCNV" />
          )}
          {round === "VD" && <VD setHideTitleRound={setHideTitleRound} />}
          {round === "ST" && (
            <VD setHideTitleRound={setHideTitleRound} roundName="CHST" />
          )}
          {round === "MHDT" && <MHDT setHideTitleRound={setHideTitleRound} />}
        </div>
      )}
    </div>
  );
};

export default QuestionContent;

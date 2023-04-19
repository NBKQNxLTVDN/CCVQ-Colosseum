import React, { useEffect, useState } from "react";

import { Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import HTMLStringConvert from "components/HTMLStringConvert";

import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  KDContainer: {
    display: "grid",
    gridTemplateRows: `auto`,
    rowGap: "2%",
    height: "100%",
    overflowX: "scroll",
    position: "relative",
  },
  settingsIcon: {
    position: "absolute",
    top: "-8.5%",
    left: "-4%",
    backgroundColor: "#C54D4D",
  },
  formSettings: {
    position: "absolute",
    top: "-8.5%",
    left: "0%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  control: {
    display: "flex",
    gap: "10%",
    alignItems: "center",
    border: "1px solid black",
    padding: "1%",
    borderRadius: "10px",
    backgroundColor: "#C54D4D",
    boxShadow: "5px 5px 5px #000",
    color: "white",
    textShadow: "2px 2px 2px #000",
  },
}));

const KD = (props) => {
  const styles = useStyles();
  const { setHideTitleRound } = props;
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(1);
  const [begin, setBegin] = useState(false);
  const [range, setRange] = useState(4);
  const [fontSize, setFontSize] = useState(24);

  useEffect(() => {
    socket.on("KD:ready", (data) => {
      if (data.status) setData(data.data);
      setSelectedOption(1);
      setBegin(false);
      setHideTitleRound(true);
    });
    socket.on("ccvq:timeState", (data) => {
      if (data.status === "start") {
        console.log(data);
        setBegin(true);
      }
    });
    socket.on("ccvq:sendQuestion_mc", (data) => {
      setSelectedOption(data.data.id);
    });
    return () => {
      socket.off("KD:ready");
      socket.off("ccvq:sendQuestion_mc");
    };
    //eslint-disable-next-line
  }, []);

  const handleChangeSettings = (e) => {
    switch (e.keyCode) {
      case 38: {
        // arrowUp
        setFontSize(fontSize + 1);
        break;
      }
      case 40: {
        // arrowDown
        setFontSize(fontSize - 1);
        break;
      }
      case 37: {
        //arrowLeft
        setRange(range - 1);
        break;
      }
      case 39: {
        //arrowRight
        setRange(range + 1);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      className={styles.KDContainer}
      style={{ fontSize: `${fontSize}px` }}
      onKeyDown={handleChangeSettings}
      tabIndex="0"
    >
      {data &&
        data
          .filter((question) => {
            const count = parseInt(selectedOption / range);
            if (selectedOption % range === 0) {
              return (
                question.id <= count * range &&
                question.id > (count - 1) * range
              );
            } else {
              return (
                question.id > count * range &&
                question.id <= (count + 1) * range
              );
            }
          })
          .map((question) => (
            <Question
              selectedOption={selectedOption}
              question={question}
              begin={begin}
            />
          ))}
    </div>
  );
};

const useStylesQuestion = makeStyles((theme) => ({
  questionContainer: {
    display: "grid",
    gridTemplateColumns: "5% auto 20%",
    columnGap: "2%",
    "&:focus": {},
  },
  columns: {
    textAlign: "start",
    border: "1px solid black",
    padding: "0.5% 0.5vw",
    display: "flex",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#C4C4C4",
    borderRadius: "10px",
    boxShadow: "inset 2px 2px 2px #000",
  },
}));

const Question = ({ selectedOption, question, begin }) => {
  const styles = useStylesQuestion();

  return (
    <div className={styles.questionContainer}>
      <div className={styles.columns} style={{ justifyContent: "center" }}>
        <Typography>
          <HTMLStringConvert string={question.id} />
        </Typography>
      </div>
      <div
        className={styles.columns}
        style={
          question.id === selectedOption
            ? {
                color: "white",
                backgroundColor: begin ? "#C54D4D" : "#FFB927",
                boxShadow: "3px 3px 3px #000",
              }
            : {}
        }
      >
        <HTMLStringConvert string={question.question} />
      </div>
      <Tooltip
        title={
          question.solution ||
          "méo có lời giải thích cho câu này đâu, tự suy nghĩ đi"
        }
      >
        <div className={styles.columns}>
          <HTMLStringConvert string={question.ans} />
        </div>
      </Tooltip>
    </div>
  );
};

export default KD;

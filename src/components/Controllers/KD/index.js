import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { socket } from "service/socket";
import { controllerEmitData } from "utils/helpers";

import { menu } from "utils/const";

import ViewQuestion from "./components/DisplayQuestionsKD";
import KDControl from "./components/KDControl";
import { Button } from "@mui/material";
import Players from "./components/Players";

const API_URL = process.env.REACT_APP_ADMIN_ENDPOINT;

const KD_SETTINGS = menu.filter((round) => round.id === "KD")[0];

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid black",
    borderRadius: "5px",
    background: "#C4C4C4",
    overflow: "scroll",
    height: "calc(100vh - 150px)",
    boxShadow: "inset 5px 5px 5px #000",
    padding: "1%",
  },
  round: {
    background: "#51AFC3",
    padding: "1% 3%",
    border: "1px solid black",
    borderRadius: "5px",
    marginBottom: 0,
    boxShadow: "2px 2px 2px #000",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  roundController: {
    alignSelf: "flex-start",
    width: "fit-content",
  },
  roundDisplay: {
    display: "grid",
    gridTemplateColumns: "2fr 3fr",
    height: "calc(100% - 100px)",
    columnGap: "8%",
  },
}));

const client = ["client"];
let orderBell = 0;

const ControllerKD = ({ refSync }) => {
  const styles = useStyles();
  const [data, setData] = useState();
  const [count, setCount] = useState(-1);
  const [countCorrect, setCountCorrect] = useState(-1);
  const [countIncorrect, setCountIncorrect] = useState(-1);
  // eslint-disable-next-line
  const [selectedRound, setSelectedRound] = useState(1);
  const [selectedOption, setSelectedOption] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [bell, setBell] = useState([0, 0, 0, 0]);


  console.log("KD is render");
  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      if (bell[data.order - 1] === 0) {
        let temp = bell;
        orderBell += 1;
        temp[data.order - 1] = orderBell;

        socket.emit("controller:talk", {
          receivers: ["viewer", "livestream", "controller", "mc"],
          eventName: "ccvq:bell_signal",
          data: {
            order: data.order,
          },
        });
      }
    });

    return () => {
      socket.off("client:bell_signal");
    };
    //eslint-disable-next-line
  }, []);

  const sendQuestion = (tempCount) => {
    controllerEmitData(
      ["viewer", "livestream", ...client],
      "ccvq:sendQuestion_client",
      {
        id: count + 1,
        question: data[selectedOption - 1].data[tempCount - 1].question,
        url: data[selectedOption - 1].data[tempCount - 1].url,
      }
    );
    controllerEmitData(["mc", "controller"], "ccvq:sendQuestion_mc", {
      data: data[selectedOption - 1].data[tempCount - 1],
    });
    setCount(tempCount);
  };

  useEffect(() => {
    setCount(0);
    setCountCorrect(0);
    setCountIncorrect(0);
  }, [selectedOption, selectedRound]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(API_URL + "/game-content/KD");
      console.log("[DATA] ", res.data);
      setData(res.data);
    };
    fetchQuestion();
    refSync.current = fetchQuestion;
    socket.on("ccvq:timeState", (data) => {
      if (!disabled && data.status === "timeout") {
        setDisabled(true);
      }
    });
    return () => {
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.round}>
        <div className={styles.roundController}>
          {KD_SETTINGS.round.map((round, idx) => (
            <Button
              variant="contained"
              color={idx + 1 === selectedRound ? "tertiary" : "info"}
              sx={{
                borderRadius: 4,
                border: "1px solid black",
                boxShadow: "2px 2px 2px black",
                marginRight: 5,
              }}
              onClick={() => {
                setSelectedRound(idx + 1);
                setSelectedOption(idx + 1);
                sendQuestion(0);
              }}
            >
              ROUND {idx + 1} ({round.numQuestion})
            </Button>
          ))}
        </div>
        <div className={styles.roundDisplay}>
          <Players />
          <div
            style={{
              height: "100%",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {data ? (
              <ViewQuestion
                count={count}
                nextQuestion={
                  count !== menu.filter((item) => item.id === "KD")[0].round[selectedOption - 1]
                    ? data[selectedOption - 1].data[count]
                    : {
                      question: `Đã hết gói câu hỏi, vui lòng nạp thêm câu hỏi cho bộ đề số ${selectedOption}`,
                    }
                }
              />
            ) : (
              <div style={{ height: "50%", border: "2px solid black" }} />
            )}
            <KDControl
              data={data}
              // disabled={disabled}
              selectedOption={selectedOption}
              sendQuestion={sendQuestion}
              setCountCorrect={setCountCorrect}
              setCountIncorrect={setCountIncorrect}
              //different
              count={count}
              countCorrect={countCorrect}
              countIncorrect={countIncorrect}
              setCount={setCount}
              total={KD_SETTINGS.round[selectedRound - 1].numQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControllerKD;

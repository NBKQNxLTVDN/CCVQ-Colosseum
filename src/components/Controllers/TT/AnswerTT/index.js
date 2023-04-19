import React, { useContext, useEffect, useState } from "react";
import { PlayCircleFilled, Settings } from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import { menu } from "utils/const";
import AnswerUser from "./answeruser.js";

const useStyles = makeStyles((theme) => ({
  answerBox: {
    backgroundColor: theme.palette.secondary.surface,
    color: theme.palette.secondary.contrastText,
    padding: "1rem",
    height: "100%",
    display: "grid",
    gridTemplateRows: "repeat(6,1fr)",
  },
  similarButton: {
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    boxShadow: "1px 1px 1px #000000",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#f7b928",
      color: theme.palette.secondary.contrastText,
    },
  },
  errorButton: {
    border: "1px solid black",
    backgroundColor: theme.palette.error.main,
    boxShadow: "1px 1px 1px #000000",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#f3425f",
      color: theme.palette.secondary.contrastText,
    },
  },
  successButton: {
    border: "1px solid black",
    boxShadow: "1px 1px 1px #000000",
    backgroundColor: "green",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#45bd62",
      color: theme.palette.secondary.contrastText,
    },
  },
  switch: {
    padding: "5px",
    height: "30px",
    borderRadius: "5px",
    backgroundColor: "green",
    marginLeft: "20px",
  },
  infoIcon: {
    marginLeft: "3rem",
    "&:hover": {
      color: theme.palette.tertiary.main,
    },
    "&:active": {
      backgroundColor: theme.palette.tertiary.main,
      color: "green",
    },
  },
}));

const AnswerTT = (props) => {
  const styles = useStyles();
  const { id, data, setData } = props;

  const [startTime, setStartTime] = useState(true);
  const [fixAns, setFixAns] = useState(false);
  const [grading, setGrading] = useState(false);

  // eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const forceUpdate = () => setSeed(Math.random());

  const { players } = useContext(MainContext);

  const [Candidate, setCandidate] = useState([
    { id: 0, answer: "", seconds: 0.0, status: "" },
    { id: 1, answer: "", seconds: 0.0, status: "" },
    { id: 2, answer: "", seconds: 0.0, status: "" },
    { id: 3, answer: "", seconds: 0.0, status: "" },
  ]);

  console.log("TangToc is rendering...");

  useEffect(() => {
    socket.on("ccvq:send_ans", (data) => {
      let temp = Candidate;
      temp[data.order - 1].answer = data.answer;
      temp[data.order - 1].seconds = data.seconds;
      setCandidate(temp);
      forceUpdate();
    });

    return () => {
      socket.off("ccvq:send_ans");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("ccvq:timeState", (data) => {
      if (data.status === "start") {
        setStartTime(false);
      }
      if (data.status === "timeout") {
        setStartTime(true);
      }
    });

    return () => {
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  }, []);

  const handleClickStartTime = () => {
    setGrading(false);
    let temp = Candidate;
    temp.forEach((player, index) => {
      player.id = index;
      player.answer = "";
      player.seconds = 0.0;
      player.status = "";
    });
    setCandidate(temp);

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "controller", "mc", "client"],
      eventName: "ccvq:setTime",
      data: {
        // seconds: 30,
        seconds: menu.filter((round) => round.id === "TT")[0][`time${id + 1}`],
      },
    });

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "controller", "mc", "client"],
      eventName: "ccvq:timeState",
      data: {
        status: "start",
      },
    });

    if (data[id].data.type === "video") {
      socket.emit("controller:talk", {
        receivers: ["viewer", "livestream", "controller"],
        eventName: "ccvq:startVideo",
        data: {},
      });
    }

    // socket.emit("controller:talk", {
    //   receivers: ["client"],
    //   eventName: "ccvq:answerBoxStatus",
    //   data: {
    //     status: "open",
    //   },
    // });
  };

  const handleChangeAnswer = (id) => (event) => {
    let temp = Candidate;
    temp[id].answer = event.target.value.toUpperCase();
    setCandidate(temp);
    forceUpdate();
  };

  const handleChangeAnswerBTC = (event) => {
    let temp = data;
    temp[id].data.ans = event.target.value;
    setData(temp);
    forceUpdate();
  };

  const handleChangeTime = (id) => (event) => {
    let temp = Candidate;
    temp[id].seconds = event.target.value;
    setCandidate(temp);
    forceUpdate();
  };

  const handleChangeStatus = (id) => (event) => {
    let temp = Candidate;
    temp[id].status = event.target.value;
    setCandidate(temp);
    forceUpdate();
  };

  const handleSort = () => {
    setCandidate((prevState) =>
      prevState.sort((a, b) => {
        return a.seconds - b.seconds;
      })
    );
    forceUpdate();
  };

  const handleClickShowAnswer = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "ccvq:show_all_players_ans",
      data: {
        players:
          grading === true
            ? Candidate.map((player) => {
              return { ...player, name: players[player.id].name };
            })
            : Candidate.map((player) => {
              return {
                ...player,
                name: players[player.id].name,
                status: "null",
              };
            }),
      },
    });

    socket.emit("controller:talk", {
      receivers: ["mc"],
      eventName: "ccvq:show_all_players_ans",
      data: {
        players: Candidate.map((player) => {
          return { ...player, name: players[player.id].name };
        }),
      },
    });
  };

  const handleClickShowSolution = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "ccvq:show_solution",
      data: {
        ques_content: data[id].data.question,
        url: `${process.env.PUBLIC_URL}/data/TT/${data[id].data.solutionURL}`,
      },
    });
  };

  const handleSound = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "tt:sound",
      data: {
        name: Candidate.map((item) => item.status).includes("correct")
          ? "RightAnswer"
          : "WrongAnswer",
      },
    });
  };

  return (
    <div className={styles.answerBox}>
      {Candidate.map((player, id) => (
        <AnswerUser
          player={player}
          id={id}
          name={players[player.id].name}
          handleChangeAnswer={handleChangeAnswer}
          handleChangeTime={handleChangeTime}
          handleChangeStatus={handleChangeStatus}
          fixAns={fixAns}
          key={id}
        />
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          style={{ flexGrow: "1" }}
          disabled={!fixAns}
          label="Đáp án chương trình"
          variant="filled"
          value={data[id].data.ans}
          onChange={handleChangeAnswerBTC}
        />

        <IconButton
          className={styles.infoIcon}
          onClick={() => setFixAns(!fixAns)}
        >
          <Settings />
        </IconButton>

        <Button
          style={{
            marginLeft: "5rem",
            marginRight: "5rem",
          }}
          className={styles.similarButton}
          variant="contained"
          color="tertiary"
          onClick={handleClickStartTime}
        // disabled={!startTime}
        >
          Tính giờ
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          className={styles.successButton}
          variant="contained"
          color="success"
          onClick={handleSort}
        >
          Sắp xếp
        </Button>

        <div>
          <Button
            className={styles.similarButton}
            variant="contained"
            color="tertiary"
            onClick={handleClickShowAnswer}
          >
            Hiện câu trả lời
          </Button>

          <FormControlLabel
            className={styles.switch}
            control={<Switch style={{ color: "#FFB927" }} />}
            label="Chấm"
            checked={grading}
            onChange={() => setGrading(!grading)}
          />
        </div>
        <Button
          className={styles.errorButton}
          variant="contained"
          color="danger"
          onClick={handleClickShowSolution}
          disabled={!data[id].data.hasOwnProperty("solutionURL")}
        >
          Hiện đáp án CT
        </Button>

        <IconButton
          className={styles.infoIcon}
          style={{ marginLeft: "-3rem" }}
          onClick={handleSound}
        >
          <PlayCircleFilled />
        </IconButton>
      </div>
    </div>
  );
};

export default AnswerTT;

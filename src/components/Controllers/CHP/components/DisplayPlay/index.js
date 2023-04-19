import React, { useContext, useState } from "react";

import { makeStyles } from "@mui/styles";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Switch,
} from "@mui/material";

import { MainContext } from "contexts/MainContext";

import { socket } from "service/socket";

import QuestionCard from "../QuestionCard";
import AnswerUser from "./answeruser";

import { PlayCircleFilled, Settings } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  displayPlay: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    columnGap: "2%",
    // padding: "1% 2%",
  },
  row: {
    overflowY: "scroll",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "2fr 1fr",
    rowGap: "2%",
  },
}));

const DisplayPlay = ({ data, question }) => {
  const styles = useStyles();

  const { players } = useContext(MainContext);
  const [fixAns, setFixAns] = useState(false);
  const [grading, setGrading] = useState(false);
  const [startTime, setStartTime] = useState(true);
  const [candidates, setCandidates] = useState(
    players
      .filter(
        (player) =>
          player.score === Math.max(...players.map((player) => player.score))
      )
      .map((player) => ({
        name: player.name,
        order: player.order,
        answer: "",
        status: "",
      }))
  );
  console.log(players);

  React.useEffect(() => {
    setCandidates(
      players
        .filter(
          (player) =>
            player.score === Math.max(...players.map((player) => player.score))
        )
        .map((player) => ({
          name: player.name,
          order: player.order,
          answer: "",
          status: "",
        }))
    );
  }, [players]);

  // eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const forceUpdate = () => setSeed(Math.random());

  const handleChangeAnswer = (id) => (event) => {
    let temp = candidates;
    temp[id].answer = event.target.value.toUpperCase();
    setCandidates(temp);
    forceUpdate();
  };

  const handleChangeStatus = (id) => (event) => {
    let temp = candidates;
    temp[id].status = event.target.value;
    setCandidates(temp);
    forceUpdate();
  };

  const handleClickStartTime = () => {
    setGrading(false);
    let temp = [...candidates];
    temp.forEach((player) => {
      player.answer = "";
      player.status = "";
    });
    setCandidates(temp);

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

    if (data[question].data.type === "video") {
      socket.emit("controller:talk", {
        receivers: ["viewer", "livestream", "controller"],
        eventName: "ccvq:startVideo",
        data: {},
      });
    }
  };

  const handleClickShowAnswer = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "ccvq:show_all_players_ans",
      data: {
        players:
          grading === true
            ? candidates.map((player) => {
              return { ...player };
            })
            : candidates.map((player) => {
              return { ...player, status: "null" };
            }),
      },
    });

    socket.emit("controller:talk", {
      receivers: ["mc"],
      eventName: "ccvq:show_all_players_ans",
      data: {
        players: candidates.map((player) => {
          return { ...player, name: players[player.id].name };
        }),
      },
    });
  };

  const handleSound = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "tt:sound",
      data: {
        name: candidates.map((item) => item.status).includes("correct")
          ? "RightAnswer"
          : "WrongAnswer",
      },
    });
  };

  React.useEffect(() => {
    socket.on("ccvq:timeState", (data) => {
      if (data.status === "start") {
        setStartTime(false);
      }
      if (data.status === "timeout") {
        setStartTime(true);
      }
    });

    socket.on("ccvq:send_ans", (data) => {
      let temp = [...candidates];
      temp.find((item) => item.order === data.order).answer = data.answer;
      setCandidates(temp);
      forceUpdate();
    });

    return () => {
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.displayPlay}>
      <div style={{ overflowY: "scroll" }}>
        {data.map((question) => (
          <QuestionCard
            data={question.data}
            id={question.id}
            key={question.id}
          />
        ))}
      </div>
      {/* <div className={styles.row}>
        <div>
          {candidates.map((player, id) => (
            <AnswerUser
              player={player}
              id={id}
              handleChangeAnswer={handleChangeAnswer}
              handleChangeStatus={handleChangeStatus}
              key={id}
              fixAns={fixAns}
            />
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <IconButton
              className={styles.infoIcon}
              onClick={() => setFixAns(!fixAns)}
            >
              <Settings />
            </IconButton>
            <Button
              style={{
                margin: "1rem 4rem",
                marginBottom: ".5rem",
              }}
              className={styles.similarButton}
              variant="contained"
              color="tertiary"
              onClick={handleClickStartTime}
            // disabled={!startTime}
            >
              Tính giờ
            </Button>
            <Button
              style={{
                margin: "1rem 4rem",
                marginBottom: ".5rem",
              }}
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
            <IconButton
              className={styles.infoIcon}
              style={{ marginLeft: "-3rem" }}
              onClick={handleSound}
            >
              <PlayCircleFilled />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            {players
              .filter(
                (player) =>
                  player.score ===
                  Math.max(...players.map((player) => player.score))
              )
              .map((player) => (
                <PlayerResult player={player} data={data} />
              ))}
          </div>
          <div style={{ minWidth: "300px" }}>
            <Button variant="contained" color="tertiary">
              Show ranking
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DisplayPlay;

// const PlayerResult = ({ player, data }) => {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {player.name}
//       </div>
//       {data.map(() => (
//         <CustomCheckbox />
//       ))}
//     </div>
//   );
// };

// const CustomCheckbox = () => {
//   const [checked, setChecked] = React.useState(false);
//   return (
//     <Checkbox
//       style={{ color: checked ? "green" : "red" }}
//       checked={checked}
//       onChange={(e) => setChecked(!checked)}
//     />
//   );
// };

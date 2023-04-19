import React, { useContext, useEffect, useState } from "react";

import {
  NotificationsOff,
  PlayCircleFilled,
  Settings,
} from "@mui/icons-material";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import AnswerUser from "./answeruser.js";

const useStyles = makeStyles((theme) => ({
  answerBox: {
    backgroundColor: theme.palette.secondary.surface,
    color: theme.palette.secondary.contrastText,
    padding: "1rem",
    height: "100%",
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr 1fr",
    overflow: "scroll",
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
}));

let orderBell = 0;

const AnswerVCNV = ({ data, setData, id, CNV }) => {
  const styles = useStyles();

  const [startTime, setStartTime] = useState(true);
  const [fixAns, setFixAns] = useState(false);
  const [sound, setSound] = useState("Auction");

  // eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const forceUpdate = () => setSeed(Math.random());

  const { players } = useContext(MainContext);
  const [answer, setAnswer] = useState([
    { answer: "", bell: 0, status: "null" },
    { answer: "", bell: 0, status: "null" },
    { answer: "", bell: 0, status: "null" },
    { answer: "", bell: 0, status: "null" },
  ]);

  useEffect(() => {
    socket.on("client:bell_signal", (data) => {
      console.log(answer[data.order - 1].bell);
      if (answer[data.order - 1].bell === 0) {
        let temp = answer;
        orderBell += 1;
        temp[data.order - 1].bell = orderBell;
        setAnswer(temp);
        forceUpdate();

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

  useEffect(() => {
    // Socket for Answer of answer
    socket.on("ccvq:send_ans", (data) => {
      let temp = answer;
      temp[data.order - 1].answer = data.answer;
      setAnswer(temp);
      forceUpdate();
    });

    return () => {
      socket.off("ccvq:send_ans");
    };
    //eslint-disable-next-line
  }, []);

  const handleClickStartTime = () => {
    let temp = answer;
    temp.forEach((player) => {
      player.answer = "";
      player.status = "null";
    });
    setAnswer(temp);
    setSound("RightRow");

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
  };

  const handleChangeAnswer = (id) => (event) => {
    let temp = answer;
    temp[id].answer = event.target.value.toUpperCase();
    setAnswer(temp);
    forceUpdate();
  };

  const handleChangeRightness = (id) => (event) => {
    let temp = answer;
    temp[id].status = event.target.value;
    setAnswer(temp);
    forceUpdate();
  };

  const handleChangeAnswerBTC = (event) => {
    let temp = data;
    temp[id].data.ans = event.target.value;
    setData(temp);
    forceUpdate();
  };

  const handleShowAns = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "ccvq:show_all_players_ans",
      data: {
        players: answer.map((item, index) => {
          return {
            name: players[index].name,
            ans: item.answer,
            status: item.status,
          };
        }),
      },
    });
  };

  const handleResetBell = () => {
    orderBell = 0;
    let temp = [...answer];
    temp.forEach((player) => {
      player.bell = 0;
    });
    setAnswer(temp);
    forceUpdate();
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream", "mc", "client"],
      eventName: "ccvq:bellStatus",
      data: {
        status: "open",
      },
    });
  };

  const handleClickDisplayRow = () => {
    if (answer.map((item) => item.status).includes("correct")) {
      socket.emit("controller:talk", {
        receivers: ["controller", "viewer", "livestream"],
        eventName: "vcnv:reveal_row",
        data: {
          status: true,
          row_num: id + 1,
          ques_ans: data[id].data.ans,
          length: data[id].data.length,
        },
      });
    } else {
      socket.emit("controller:talk", {
        receivers: ["controller", "viewer", "livestream"],
        eventName: "vcnv:reveal_row",
        data: {
          status: false,
          row_num: id + 1,
        },
      });
    }
  };

  const handleClickShowImage = () => {
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream"],
      eventName: "vcnv:load_image",
      data: {
        url: `${process.env.PUBLIC_URL}/data/VCNV/${CNV.url}`,
      },
    });
  };

  const handleCorrectCNV = () => {
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream"],
      eventName: "vcnv:sound",
      data: {
        name: sound,
      },
    });
  };

  const handleClickOpenAll = () => {
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream"],
      eventName: "vcnv:openAll",
      data: {
        cnv: CNV.answer.toUpperCase(),
      },
    });
  };

  return (
    <div className={styles.answerBox}>
      {answer.map((item, id) => (
        <AnswerUser
          name={players[id].name}
          answer={item}
          id={id}
          fixAns={fixAns}
          handleChangeAnswer={handleChangeAnswer}
          handleChangeRightness={handleChangeRightness}
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
          style={{ flexGrow: "1", marginRight: "5rem" }}
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
          className={styles.similarButton}
          style={{ marginLeft: "5rem", marginRight: "5rem" }}
          variant="contained"
          color="tertiary"
          onClick={handleClickStartTime}
        //disabled={!startTime}
        >
          Tính giờ
        </Button>

        <IconButton
          className={styles.infoIcon}
          style={{ marginRight: "2rem" }}
          onClick={handleResetBell}
        >
          <NotificationsOff />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Button
          className={styles.successButton}
          variant="contained"
          color="success"
          onClick={handleShowAns}
        >
          Hiện đáp án
        </Button>

        <Button
          className={styles.similarButton}
          variant="contained"
          color="tertiary"
          onClick={handleClickDisplayRow}
        >
          {answer.map((item) => item.status).includes("correct")
            ? "Hiện "
            : "Ẩn "}{" "}
          hàng ngang
        </Button>

        <Button
          className={styles.errorButton}
          variant="contained"
          color="danger"
          onClick={handleClickShowImage}
        >
          Load Ảnh CNV
        </Button>
        <div>
          <Select
            style={{ fontWeight: "bold", marginRight: "1rem" }}
            value={sound}
            onChange={(event) => setSound(event.target.value)}
            variant="outlined"
          >
            <MenuItem value="Auction"> Đấu giá </MenuItem>
            <MenuItem value="Hint"> Nhận gợi ý </MenuItem>
            <MenuItem value="RightRow"> Đúng Hàng ngang </MenuItem>
            <MenuItem value="RightCNV"> Đúng CNV </MenuItem>
            <MenuItem value="WrongCNV"> Sai CNV </MenuItem>
            <MenuItem value="Last15s"> 15 giây cuối </MenuItem>
          </Select>

          <IconButton className={styles.infoIcon} onClick={handleCorrectCNV}>
            <PlayCircleFilled />
          </IconButton>

          <Button
            className={styles.errorButton}
            style={{ marginLeft: "2rem" }}
            variant="contained"
            color="danger"
            onClick={handleClickOpenAll}
          >
            Mở tất cả
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerVCNV;

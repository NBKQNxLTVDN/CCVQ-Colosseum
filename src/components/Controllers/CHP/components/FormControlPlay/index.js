import React, { useState } from "react";

import { Check, Close, Star } from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  formControlPlay: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "20% 75%",
  },
  chooseQues: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputQuestion: {
    width: "70%",
    backgroundColor: theme.palette.background.main,
    borderRadius: "5px",
    border: "1px solid black",
    boxShadow: "1px 1px 1px #000000",
  },
  endButton: {
    margin: "1% 5%",
    fontWeight: "bold",
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    boxShadow: "1px 1px 1px #000000",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  sendQuestionBtn: {
    width: "50%",
    fontWeight: "bold",
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    boxShadow: "1px 1px 1px #000000",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.secondary.contrastText,
    },
  },
  trueBtn: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    "&:hover": {
      color: theme.palette.success.main,
      backgroundColor: "green",
    },
    border: "1px solid black",
    boxShadow: "2px 2px 2px #000000",
  },
  falseBtn: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      color: theme.palette.error.main,
      backgroundColor: "darkred",
    },
    border: "1px solid black",
    boxShadow: "2px 2px 2px #000000",
  },
  starBtn: {
    color: theme.palette.tertiary.main,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.tertiary.main,
    },
    border: "1px solid black",
    boxShadow: "2px 2px 2px #000000",
  },
  countDownButton: {
    fontWeight: "bold",
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    boxShadow: "2px 2px 2px #000000",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.secondary.contrastText,
    },
    padding: "0 30px",
  },
}));

const FormControlPlay = (props) => {
  const { data, setQuestion } = props;
  const styles = useStyles();

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const sendQuestion = () => {
    socket.emit("controller:talk", {
      receivers: ["mc"],
      eventName: "ccvq:sendQuestion_mc",
      data: {
        question: data[currentQuestion - 1].data,
        id: data[currentQuestion - 1].id,
      },
    });
    // data.data.ans = null;
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "CHP:sendQuestion",
      data: {
        question: {
          ...data[currentQuestion - 1].data,
          ans: null,
          id: data[currentQuestion - 1].id,
        },
      },
    });
    socket.emit("controller:talk", {
      receivers: ["client", "viewer"],
      eventName: "ccvq:bellStatus",
      data: {
        status: "open",
      }
    })
  };

  const hopeStar = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "CHP:hopeStar",
      data: {
        id: data.id,
        status: true,
      },
    });
  };

  const countdown = () => {
    const time = data[currentQuestion].time || 15;
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: time,
      },
    });
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:timeState",
      data: {
        status: "start",
      },
    });
  };

  const resultQuestion = (res) => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "CHP:result_question",
      data: {
        id: data[currentQuestion - 1].id,
        status: res,
      },
    });
  };

  const handleClickStartTime = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: 15,
      },
    });
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:timeState",
      data: {
        status: "start",
      },
    });
  };

  return (
    <div className={styles.formControlPlay}>
      <div className={styles.chooseQues}>
        <Select
          className={styles.formSelect}
          title="Chọn bộ đề"
          id="form_control"
          type="select"
          value={currentQuestion}
          onChange={(e) => {
            setQuestion(e.target.value);
            setCurrentQuestion(e.target.value);
          }}
          variant="outlined"
        >
          {data.map((element, idx) => (
            <MenuItem key={idx} value={element.id} className={styles.menuItem}>
              <Typography variant="h6" color="tertiary">
                Câu hỏi số {element.id} ({element.score} điểm)
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <Button className={styles.sendQuestionBtn} onClick={sendQuestion} variant="contained"
          color="tertiary">
          Gửi câu hỏi
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            marginTop: "5px",
          }}
        >
          <TextField
            className={styles.inputQuestion}
            value={
              currentQuestion === -1
                ? "Chưa chọn câu hỏi"
                : data[currentQuestion - 1].data.question
            }
            variant="outlined"
            inputProps={{
              style: {
                marginLeft: "5px",
              },
            }}
            disabled
          />
        </div>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button

            className={styles.similarButton}
            variant="contained"
            color="tertiary"
            onClick={handleClickStartTime}
          // disabled={!startTime}
          >
            Tính giờ
          </Button>

          <IconButton
            className={styles.trueBtn}
            onClick={() => {
              resultQuestion(true);
            }}
            sx={(theme) => ({
              backgroundColor: theme.palette.success.main,
            })}
          >
            <Check />
          </IconButton>
          <IconButton
            className={styles.falseBtn}
            onClick={() => {
              resultQuestion(false);
            }}
            sx={(theme) => ({
              backgroundColor: theme.palette.danger.main,
            })}
          >
            <Close />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default FormControlPlay;

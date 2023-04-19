import React, { useState } from "react";

import { Check, Close, PermDeviceInformation, Star } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  locateTimePractical,
  locateTimeQuestion,
} from "components/Controllers/VD/utils/formatQuestion";
import { socket } from "service/socket";

import SendSolution from "components/Controllers/VD/components/SendSolutionURL";

const useStyles = makeStyles((theme) => ({
  formatQuestion: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  sendQuestionBtn: {
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

const FormatQuestion = (props) => {
  const styles = useStyles();
  const { question, setQuestion, dataset, isOpenEdit, setIsOpenEdit } = props;

  const sendQuestion = () => {
    const time = locateTimeQuestion(question);

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: time,
      },
    });

    let data = { ...question };

    socket.emit("controller:talk", {
      receivers: ["mc"],
      eventName: "ccvq:sendQuestion_mc",
      data: {
        question: data,
      },
    });

    let dataInsight = { ...data.data };
    dataInsight.ans = "";
    dataInsight.solution = "";
    dataInsight.solutionURL = "";
    data = { ...data, data: dataInsight };

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "CHST:sendQuestion",
      data: {
        ...data,
      },
    });
  };

  const hopeStar = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "ccvq:hopeStar",
      data: {
        id: question.id,
        status: true,
      },
    });
  };

  const countdown = () => {
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
      eventName: "CHST:result_question",
      data: {
        id: question.id,
        status: res,
      },
    });
  };

  const countdownBell = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: 5,
      },
    });

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller", "client"],
      eventName: "ccvq:bellStatus",
      data: {
        status: "open",
      },
    });
    countdown();
  };

  return (
    <div className={styles.formatQuestion}>
      <Question
        question={question}
        setQuestion={setQuestion}
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        dataset={dataset}
      />
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          className={styles.sendQuestionBtn}
          onClick={sendQuestion}
          disabled={isOpenEdit}
        >
          Gửi câu hỏi
        </Button>
        <IconButton
          className={styles.starBtn}
          onClick={hopeStar}
          disabled={isOpenEdit}
        >
          <Star />
        </IconButton>
        <Button
          className={styles.countDownButton}
          onClick={countdown}
          disabled={isOpenEdit}
        >
          Bấm giờ {locateTimeQuestion(question)} s
        </Button>
        <IconButton
          className={styles.trueBtn}
          onClick={() => {
            resultQuestion(true);
          }}
          disabled={isOpenEdit}
        >
          <Check />
        </IconButton>
        <IconButton
          className={styles.falseBtn}
          onClick={() => {
            resultQuestion(false);
          }}
          disabled={isOpenEdit}
        >
          <Close />
        </IconButton>
        <IconButton
          className={styles.falseBtn}
          onClick={countdownBell}
          disabled={isOpenEdit}
        >
          5s
        </IconButton>
        {question.data?.solutionURL && (
          <SendSolution
            url={question.data.solutionURL}
            disabled={isOpenEdit}
            roundName="CHST"
          />
        )}
      </div>
    </div>
  );
};

export default FormatQuestion;

const useStylesQuestion = makeStyles((theme) => ({
  formChooseScore: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    border: "1px solid black",
    boxShadow: "1px 1px 1px #000000",
  },
  formatQuestion: {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    marginBottom: "6px",
    alignItems: "center",
  },
  radioButtonSuccess: { margin: 0 },
  RadioBtn: {
    width: "100%",
    color: "green",
    "&:active": {
      backgroundColor: theme.palette.tertiary.main,
    },
  },
}));

const Question = (props) => {
  const styles = useStylesQuestion();
  const { question, setQuestion, isOpenEdit, setIsOpenEdit, dataset } = props;

  const [score, setScore] = useState();

  const onChangeInputQuestion = (e) => {
    setQuestion((prevState) => ({
      ...prevState,
      data: { ...prevState.data, question: e.target.value },
    }));
  };

  const chooseScoreQuestion = (score) => () => {
    const data = dataset.filter(
      (question) => parseInt(question.value) === score
    )[0];

    setQuestion((prevState) => {
      return {
        ...prevState,
        type: data.type,
        score: score,
        time: locateTimeQuestion({ ...data, score }),
        time_practical: locateTimePractical({ ...data, score }),
        data: {
          question: data.question,
          topic: data.topic,
          url: data.url,
          ans: data.ans,
          solution: data.solution,
          solutionURL: data.solutionURL,
        },
      };
    });

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "CHST:chooseValueQuestion",
      data: {
        id: question.id,
        score: parseInt(score, 10),
      },
    });

    setScore(parseInt(score, 10));
  };

  return (
    <div className={styles.formatQuestion}>
      <div className={styles.formChooseScore}>
        <FormControl>
          <RadioGroup
            row
            aria-label="checker"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            value={score}
          >
            {[10, 20, 30].map((_score, idx) => (
              <FormControlLabel
                key={idx}
                className={styles.radioButtonSuccess}
                value={_score}
                control={
                  <Radio
                    className={styles.RadioBtn}
                    onClick={chooseScoreQuestion(_score)}
                    color="primary"
                    inputProps={{ style: { color: "green" } }}
                  />
                }
                checked={score === _score}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "90% 10%",
          marginLeft: "30px",
        }}
      >
        <TextField
          className={styles.inputQuestion}
          value={
            question.score === -1 ? "Chưa chọn câu hỏi" : question.data.question
          }
          variant="outlined"
          inputProps={{
            style: {
              marginLeft: "5px",
            },
          }}
          onChange={onChangeInputQuestion}
          disabled={!isOpenEdit}
        />
        <IconButton
          className={styles.infoIcon}
          onClick={() => {
            setIsOpenEdit(!isOpenEdit);
          }}
        >
          <PermDeviceInformation />
        </IconButton>
      </div>
    </div>
  );
};

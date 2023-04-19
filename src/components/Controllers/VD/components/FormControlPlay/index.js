import {
  ArrowLeft,
  Check,
  Close,
  PermDeviceInformation,
  Star,
  Sync,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { socket } from "service/socket";

import {
  locateTimePractical,
  locateTimeQuestion,
} from "../../utils/formatQuestion";

import SendSolution from "../SendSolutionURL";

const useStyles = makeStyles((theme) => ({
  arrowButtonBack: {
    "&:hover": {
      backgroundColor: "#51AFC3",
    },
  },
  iconBack: {
    fontSize: 100,
    "&:hover": {
      color: "green",
    },
  },
  formControlPlay: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "5% 20% 75%",
  },
  chooseQues: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
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
}));

const FormControlPlay = ({
  formatQuestion,
  setIsFirstRender,
  setFormatQuestion,
  currentQuestion,
  setCurrentQuestion,
  setNextForm,
  isOpenEdit,
  setIsOpenEdit,
}) => {
  const styles = useStyles();

  const reloadAnimation = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "VD:swap_screen",
      data: {
        screen: "question",
      },
    });
  };

  const sendQuestion = () => {
    // const time = locateTimeQuestion(formatQuestion[currentQuestion - 1]);

    // socket.emit("controller:talk", {
    //   receivers: ["viewer", "livestream", "mc", "controller"],
    //   eventName: "ccvq:setTime",
    //   data: {
    //     seconds: time,
    //   },
    // });

    let data = { ...formatQuestion[currentQuestion - 1] };
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
      eventName: "VD:sendQuestion",
      data: {
        questions: data,
      },
    });
  };

  return (
    <div className={styles.formControlPlay}>
      <IconButton
        className={styles.arrowButtonBack}
        onClick={() => {
          setNextForm(false);
          setIsFirstRender(true);
        }}
      >
        <ArrowLeft
          className={styles.iconBack}
          color="primary"
          fontSize="large"
        />
      </IconButton>
      <div className={styles.chooseQues}>
        <Select
          className={styles.formSelect}
          title="Chọn bộ đề"
          id="form_control"
          type="select"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          variant="outlined"
        >
          {formatQuestion.map((element, idx) => (
            <MenuItem key={idx} value={element.id} className={styles.menuItem}>
              <Typography
                variant="h6"
                sx={(theme) => ({ color: theme.palette.danger.main })}
              >
                Câu hỏi số {element.id} ({element.score} điểm)
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <IconButton onClick={reloadAnimation}>
            <Sync className={styles.sync} />
          </IconButton>
          <Button
            className={styles.sendQuestionBtn}
            onClick={sendQuestion}
            disabled={isOpenEdit}
            color="tertiary"
            variant="contained"
          >
            Gửi câu hỏi
          </Button>
        </div>
      </div>
      <OptionsQuestion
        formatQuestion={formatQuestion}
        setFormatQuestion={setFormatQuestion}
        currentQuestion={currentQuestion}
        setNextForm={setNextForm}
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
      />
    </div>
  );
};

export default FormControlPlay;

const useStylesOptionsQuestion = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  optionsTop: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    marginTop: "5px",
  },
  optionsBottom: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-around",
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
  infoIcon: {
    marginLeft: "5px",
    "&:hover": {
      color: theme.palette.tertiary.main,
    },
    "&:active": {
      backgroundColor: theme.palette.tertiary.main,
      color: "green",
    },
  },
}));

const OptionsQuestion = (props) => {
  const {
    formatQuestion,
    setFormatQuestion,
    currentQuestion,
    setNextForm,
    isOpenEdit,
    setIsOpenEdit,
  } = props;

  const styles = useStylesOptionsQuestion();

  const question = formatQuestion[currentQuestion - 1];

  const hopeStar = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "ccvq:hopeStar",
      data: {
        id: formatQuestion[currentQuestion - 1].id,
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

  const countdownNormalQuestion = () => {
    const time = locateTimeQuestion(question);

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: time,
      },
    });

    countdown();
  };

  const countdownPractical = () => {
    const time = locateTimePractical(question);

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "ccvq:setTime",
      data: {
        seconds: time,
      },
    });

    countdown();
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

  const resultQuestion = (res) => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "VD:result_question",
      data: {
        id: question.id,
        status: res,
      },
    });
  };

  const onChangeInputQuestion = (e) => {
    if (currentQuestion === -1) return;
    setFormatQuestion((prevState) =>
      prevState.map((question) => {
        if (question.id === currentQuestion) {
          return {
            ...question,
            data: { ...question.data, question: e.target.value },
          };
        }
        return { ...question };
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.optionsTop}>
        <TextField
          className={styles.inputQuestion}
          value={
            currentQuestion === -1
              ? "Chưa chọn câu hỏi"
              : question.data.question
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
          color="tertiary"
          variant="contained"
          onClick={() => {
            setIsOpenEdit(!isOpenEdit);
          }}
        >
          <PermDeviceInformation />
        </IconButton>
        <Button
          className={styles.endButton}
          onClick={() => {
            setNextForm(false);
          }}
          variant="contained"
          color="tertiary"
        >
          Kết thúc
        </Button>
      </div>
      <div className={styles.optionsBottom}>
        <IconButton
          className={styles.starBtn}
          onClick={hopeStar}
          disabled={isOpenEdit}
          sx={(theme) => ({
            backgroundColor: "rgb(255 185 39)",
          })}
        >
          <Star />
        </IconButton>
        <Button
          className={styles.countDownButton}
          onClick={countdownNormalQuestion}
          variant="contained"
          color="tertiary"
          disabled={isOpenEdit}
        >
          Thời gian {locateTimeQuestion(question)} s
        </Button>
        {question?.type === "lab" && (
          <Button
            className={styles.countDownButton}
            onClick={countdownPractical}
            disabled={isOpenEdit}
            variant="contained"
            color="tertiary"
          >
            Thời gian thực hành {locateTimePractical(question)} s
          </Button>
        )}
        <IconButton
          className={styles.trueBtn}
          onClick={() => {
            resultQuestion(true);
          }}
          disabled={isOpenEdit}
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
          disabled={isOpenEdit}
          sx={(theme) => ({
            backgroundColor: theme.palette.danger.main,
          })}
        >
          <Close />
        </IconButton>
        <IconButton
          className={styles.falseBtn}
          onClick={countdownBell}
          disabled={isOpenEdit}
          sx={(theme) => ({
            backgroundColor: theme.palette.tertiary.main,
          })}
        >
          5s
        </IconButton>
        {question.data?.solutionURL && (
          <SendSolution url={question.data.solutionURL} disabled={isOpenEdit} />
        )}
      </div>
    </div>
  );
};

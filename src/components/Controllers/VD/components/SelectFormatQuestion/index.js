import React, { useState, useEffect } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PermDeviceInformation } from "@mui/icons-material";
import { socket } from "service/socket";
import {
  locateTimeQuestion,
  locateTimePractical,
} from "../../utils/formatQuestion";

const useStyles = makeStyles((theme) => ({
  formChooseScore: {
    width: "100%",
    backgroundColor: theme.palette.info.main,
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
  inputQuestion: {
    backgroundColor: theme.palette.info.main,
    width: "100%",
    height: "50px",
    border: "1px solid black",
    borderRadius: "5px",
    boxShadow: "1px 1px 1px #000000",
  },
  RadioBtn: {
    width: "100%",
    color: "green",
    "&:active": {
      backgroundColor: theme.palette.tertiary.main,
    },
  },
  radioButtonSuccess: { margin: 0 },
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

const Question = (props) => {
  const styles = useStyles();
  const {
    id,
    submitInfo,
    formatQuestion,
    setSubmitInfo,
    setFormatQuestion,
    item,
  } = props;
  // eslint-disable-next-line
  const [formScore, setFormScore] = useState([20, 30]);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (submitInfo) {
      let temp = [...formatQuestion];
      temp[id].score = -1;
      setFormatQuestion(temp);
    }
    // eslint-disable-next-line
  }, [submitInfo]);

  const chooseScoreQuestion = (score) => () => {
    setSubmitInfo(false);
    let temp = [...formatQuestion];
    temp[id].score = score;
    const data = props.data.data[(parseInt(item.score) / 10 - 2) * 3 + id];
    temp[id].type = data.type;
    temp[id].time = locateTimeQuestion({ ...data, score });
    temp[id].time_practical = locateTimePractical({ ...data, score });
    temp[id].data = {
      question: data.question,
      topic: data.topic,
      url: data.url,
      ans: data.ans,
      solution: data.solution,
      solutionURL: data.solutionURL,
    };
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "VD:chooseValueQuestion",
      data: {
        id: id,
        score: score,
      },
    });
    setFormatQuestion(temp);
  };

  const changeQuestion = (e) => {
    let temp = [...formatQuestion];
    if (temp[id].data.question) {
      temp[id].data.question = e.target.value;
    }
    setFormatQuestion(temp);
  };

  const openInfo = () => {
    setEdit((prevState) => !prevState);
  };

  return (
    <div className={styles.formatQuestion}>
      <div className={styles.formChooseScore}>
        <RadioGroup
          row
          aria-label="checker"
          value={item.score}
          color="tertiary"
          variant="contained"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {formScore.map((score, idx) => (
            <FormControlLabel
              key={idx}
              className={styles.radioButtonSuccess}
              value={score}
              control={
                <Radio
                  className={styles.RadioBtn}
                  onClick={chooseScoreQuestion(score)}
                  color="primary"
                  inputProps={{ style: { color: "green" } }}
                />
              }
            />
          ))}
        </RadioGroup>
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
            item.score === -1
              ? "Câu thứ " + (id + 1) + " chưa chọn mốc điểm"
              : props.data.data[(item.score / 10 - 2) * 3 + id].question
          }
          onInput={changeQuestion}
          variant="outlined"
          inputProps={{
            style: {
              marginLeft: "5px",
              width: "100%",
            },
          }}
          disabled={edit}
        />
        <IconButton
          className={styles.infoIcon}
          onClick={openInfo}
          disabled={item.score === -1}
        >
          <PermDeviceInformation />
        </IconButton>
      </div>
    </div>
  );
};

export default Question;

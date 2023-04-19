import React from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  radioButtonSuccess: {
    padding: "5px",
    height: "30px",
    borderRadius: "5px",
    "&:hover ": {
      backgroundColor: "gray",
    },
    "&:active": {
      backgroundColor: "green",
    },
  },
  radioButtonFail: {
    padding: "5px",
    height: "30px",
    borderRadius: "5px",
    "&:hover ": {
      backgroundColor: "gray",
    },
    "&:active": {
      backgroundColor: "red",
    },
  },
}));

const AnswerUser = ({
  name,
  answer,
  id,
  fixAns,
  handleChangeAnswer,
  handleChangeRightness
}) => {
  const styles = useStyles();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        style={{ flexGrow: 5 }}
        disabled={!fixAns}
        label={"Đáp án thí sinh " + name}
        variant="filled"
        value={answer.answer}
        onChange={handleChangeAnswer(id)}
      />
      <TextField
        style={{
          width: "75px",
          marginLeft: "4rem",
          marginRight: "2rem",
          backgroundColor: answer.bell > 0 ? "red" : "transparent",
        }}
        disabled
        label="Chuông"
        variant="filled"
        value={answer.bell}
        inputProps={{
          style: { textAlign: "right" },
        }}
      />
      <RadioGroup
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        row
        aria-label="checker"
        name="row-radio-buttons-group"
        value={answer.status}
        onChange={handleChangeRightness(id)}
      >
        <FormControlLabel
          className={styles.radioButtonSuccess}
          value="correct"
          control={<Radio style={{ color: "green" }} />}
          label="Đúng"
        />
        <FormControlLabel
          className={styles.radioButtonFail}
          value="incorrect"
          control={<Radio style={{ color: "red" }} />}
          label="Sai"
        />
      </RadioGroup>
    </div>
  );
};

export default AnswerUser;

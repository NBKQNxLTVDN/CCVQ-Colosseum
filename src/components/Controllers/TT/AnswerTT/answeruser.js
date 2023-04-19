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
  player,
  id,
  name,
  handleChangeAnswer,
  handleChangeTime,
  handleChangeStatus,
  fixAns
}) => {
  const styles = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        style={{ flexGrow: 5 }}
        disabled={!fixAns}
        label={"Đáp án thí sinh " + name}
        variant="filled"
        value={player.answer}
        onChange={handleChangeAnswer(id)}
      />

      <TextField
        style={{
          width: "100px",
          marginLeft: "4rem",
          marginRight: "2rem",
        }}
        disabled={!fixAns}
        label="Time"
        variant="filled"
        value={player.seconds}
        onChange={handleChangeTime(id)}
        inputProps={{
          style: { textAlign: "right" },
        }}
        fullWidth
        type="number"
        step="0.0001"
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
        value={player.status}
        onChange={handleChangeStatus(id)}
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

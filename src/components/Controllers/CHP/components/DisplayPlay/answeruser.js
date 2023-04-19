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
  handleChangeAnswer,
  handleChangeStatus,
  fixAns,
}) => {
  const styles = useStyles();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        style={{ flexGrow: 5 }}
        disabled={!fixAns}
        label={"Đáp án thí sinh " + player.name}
        variant="filled"
        value={player.answer}
        onChange={handleChangeAnswer(id)}
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

import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  ButtonGroup,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ArrowRight } from "@mui/icons-material";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import Question from "../SelectFormatQuestion";

const useStyles = makeStyles((theme) => ({
  arrowButtonBack: {
    // width: 60,
    // height: 60,
    "&:hover": {
      backgroundColor: "#51AFC3",
    },
    overflow: "hidden",
  },
  iconBack: {
    fontSize: 100,
    "&:hover": {
      color: "green",
    },
  },
  propMenus: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0 30px",
    justifyContent: "center",
    alignItems: "center",
  },
  formSelect: {
    margin: "5px",
    height: "50px",
    width: "100%",
    border: "1px solid black",
  },
  submitButton: {
    fontWeight: "bold",
    marginTop: "10px",
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    boxShadow: "1px 1px 1px #000000",
    "&:hover": {
      backgroundColor: "green",
      color: theme.palette.secondary.contrastText,
    },
    width: "50%",
  },
  setInfo: {
    overflowY: "scroll",
    alignItems: "center",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "24% 64% 7% 5%",
  },
  titleScore: {
    display: "grid",
    gridTemplateColumns: "20%  80%",
  },
  valueScore: {
    fontWeight: "bold",
  },
  formatQuestion: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  startButton: {
    marginTop: "1%",
    fontWeight: "bold",
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    boxShadow: "1px 1px 1px #000000",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.secondary.contrastText,
    },
    overflowY: "hidden",
  },
}));

const FormControlReady = (props) => {
  const styles = useStyles();
  const { players } = useContext(MainContext);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let check = true;
    props.formatQuestion.forEach((question) => {
      if (question.score === -1) {
        check = false;
      }
    });
    setReady(check);
  }, [props.formatQuestion]);

  const submitBtn = () => {
    socket.emit("controller:talk", {
      receivers: ["client", "controller", "mc", "viewer", "livestream"],
      eventName: "VD:init_data",
      data: {
        questions: props.selectedOption,
        player: props.selectedPlayer,
      },
    });
    props.setSubmitInfo(true);
  };

  const onClickSwapScreen = () => {
    socket.emit("controller:talk", {
      receivers: ["client", "controller", "mc", "viewer", "livestream"],
      eventName: "VD:swap_screen",
      data: {
        screen: "value",
      },
    });
  };

  useEffect(() => {
    if (props.selectedOption !== props.selectedPlayer) {
      props.setSelectedOption(props.selectedPlayer);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.setInfo}>
      <div className={styles.propMenus}>
        <Select
          className={styles.formSelect}
          title="Chọn bộ đề"
          id="form_control"
          type="select"
          value={props.selectedOption}
          onChange={(e) => props.setSelectedOption(e.target.value)}
          variant="outlined"
        >
          {props.data.map((element, idx) => (
            <MenuItem key={idx} value={element.id} className={styles.menuItem}>
              <Typography variant="h6" color="primary">
                Bộ đề số {element.id}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <Select
          className={styles.formSelect}
          title="Chọn người chơi"
          id="form_control"
          type="select"
          value={props.selectedPlayer}
          onChange={(e) => {
            props.setSelectedPlayer(e.target.value);
            props.setSelectedOption(e.target.value);
          }}
          variant="outlined"
        >
          {players.map((element, idx) => (
            <MenuItem
              key={idx}
              value={element.order}
              className={styles.menuItem}
            >
              <Typography variant="h6" color="primary">
                {element.name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <ButtonGroup style={{ width: "100%" }}>
          <Button
            className={styles.submitButton}
            onClick={submitBtn}
            variant="contained"
            color="tertiary"
          >
            Chốt
          </Button>
          <Button
            className={styles.submitButton}
            onClick={onClickSwapScreen}
            variant="contained"
            color="tertiary"
          >
            Gói câu hỏi
          </Button>
        </ButtonGroup>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <div className={styles.formatQuestion}>
          <div className={styles.titleScore}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginRight: "20px",
              }}
            >
              {/* <div className={styles.valueScore}>10</div> */}
              <div className={styles.valueScore}>20</div>
              <div className={styles.valueScore}>30</div>
            </div>
            <div></div>
          </div>
        </div>
        <div className={styles.formatQuestion}>
          {props.formatQuestion.map((element, index) => (
            <Question
              key={index}
              id={index}
              item={element}
              data={props.data[props.selectedOption - 1]}
              submitInfo={props.submitInfo}
              setSubmitInfo={props.setSubmitInfo}
              formatQuestion={props.formatQuestion}
              setFormatQuestion={props.setFormatQuestion}
            />
          ))}
        </div>
      </div>

      <Button
        className={styles.startButton}
        onClick={() => {
          props.setNextForm(true);
          props.setCurrentQuestion(1);
        }}
        disabled={!ready}
        color="success"
        variant="contained"
      >
        Bắt đầu
      </Button>
      <IconButton
        className={styles.arrowButtonBack}
        disabled={!ready}
        onClick={() => {
          props.setNextForm(true);
        }}
      >
        <ArrowRight
          className={styles.iconBack}
          color="danger"
          fontSize="large"
        />
      </IconButton>
    </div>
  );
};

export default FormControlReady;

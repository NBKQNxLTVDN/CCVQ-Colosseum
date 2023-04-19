import React, { useContext, useState } from "react";

import { Button, MenuItem, Select, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import FormatQuestion from "./formatQuestion";

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
    alignItems: "center",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "20% 70% 10%",
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

const FormControl = (props) => {
  const {
    data,
    isOpenEdit,
    setIsOpenEdit,
    currentQuestion,
    setCurrentQuestion,
  } = props;
  const styles = useStyles();
  const context = useContext(MainContext);

  const [selectedOption, setSelectedOption] = useState(1); // bo de
  const [selectedPlayer, setSelectedPlayer] = useState(1);

  React.useEffect(() => {
    setCurrentQuestion({
      id: 1,
      score: -1,
      data: {},
    });
    //eslint-disable-next-line
  }, [selectedOption, selectedPlayer]);

  const submitBtn = () => {
    socket.emit("controller:talk", {
      receivers: ["controller", "mc", "viewer", "livestream", "client"],
      eventName: "CHST:init_data",
      data: {
        field: data[selectedOption - 1].topic,
        review: data[selectedOption - 1].review,
        player: selectedPlayer,
      },
    });
  };

  const start = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "CHST:swap_screen",
      data: {
        screen: "question",
      },
    });
  };

  const end = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "CHST:swap_screen",
      data: {
        screen: "waiting",
      },
    });
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "CHST:status",
      data: {
        status: "end",
      },
    });
  };

  return (
    <div className={styles.setInfo}>
      <div className={styles.propMenus}>
        <Select
          className={styles.formSelect}
          title="Chọn bộ đề"
          id="form_control"
          type="select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          variant="outlined"
        >
          {data.map((element, idx) => (
            <MenuItem key={idx} value={element.id} className={styles.menuItem}>
              <Typography variant="h6" color="primary">
                {element.topic}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <Select
          className={styles.formSelect}
          title="Chọn người chơi"
          id="form_control"
          type="select"
          value={selectedPlayer}
          onChange={(e) => {
            setSelectedPlayer(e.target.value);
            setSelectedOption(e.target.value);
          }}
          variant="outlined"
        >
          {context.players.map((element, idx) => (
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
        <Button className={styles.submitButton} onClick={submitBtn}>
          Chốt
        </Button>
      </div>
      <div style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <div className={styles.formatQuestion}>
          <div className={styles.titleScore}>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              <div className={styles.valueScore}>10</div>
              <div className={styles.valueScore}>20</div>
              <div className={styles.valueScore}>30</div>
            </div>
            <div></div>
          </div>
        </div>
        {data[selectedPlayer - 1] && (
          <FormatQuestion
            question={currentQuestion}
            setQuestion={setCurrentQuestion}
            isOpenEdit={isOpenEdit}
            setIsOpenEdit={setIsOpenEdit}
            dataset={data[selectedPlayer - 1].data}
          />
        )}
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Button className={styles.startButton} onClick={start}>
          Bắt đầu
        </Button>
        <Button className={styles.startButton} onClick={end}>
          Kết thúc
        </Button>
      </div>
    </div>
  );
};

export default FormControl;

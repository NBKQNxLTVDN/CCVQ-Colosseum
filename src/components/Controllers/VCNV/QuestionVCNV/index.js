import { CloudUpload, Settings } from "@mui/icons-material";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  questionBox: {
    backgroundColor: theme.palette.secondary.surface,
    color: theme.palette.secondary.contrastText,
    padding: "1rem",
    height: "100%",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
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

const QuestionVCNV = (props) => {
  const styles = useStyles();

  const { data, setData, id, setID } = props;
  const [fixQues, setFixQues] = useState(false);
  const [slide, setSlide] = useState("crossword");
  const [status, setStatus] = useState([true, true, true, true, true]);

  // eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const forceUpdate = () => setSeed(Math.random());

  const handleChangsQues = (event) => {
    let temp = data;
    temp[id].data.question = event.target.value;
    setData(temp);
    forceUpdate();
  };

  const SendCrosswordAgain = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "controller", "mc"],
      eventName: "vcnv:crossword",
      data: {
        crossword: data.map((item) => {
          return { length: item.data.length, word: item.data.ans };
        }),
      },
    });
  };

  const handleClickChangeSlide = () => {
    socket.emit("controller:talk", {
      receivers: ["controller", "viewer", "livestream"],
      eventName: "vcnv:switch_slides",
      data: {
        status: slide,
      },
    });
  };

  const handleClickChooseQues = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "controller"],
      eventName: "vcnv:choose_ques",
      data: {
        length: data[id].data.length,
        ques_num: id + 1,
        status: status[id],
      },
    });

    let temp = [...status];
    temp[id] = !temp[id];
    setStatus(temp);
  };

  const handleClickSendQues = () => {
    socket.emit("controller:talk", {
      receivers: ["client"],
      eventName: "ccvq:sendQues_client",
      data: {
        ques_num: id + 1,
        ques_content: data[id].data.question,
      },
    });

    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "ccvq:sendQues_viewer",
      data: {
        ques_num: id + 1,
        ques_content: data[id].data.question,
        type: data[id].data.type,
        url: data[id].data.url,
      },
    });

    socket.emit("controller:talk", {
      receivers: ["mc"],
      eventName: "ccvq:sendQues_mc",
      data: {
        ques_num: id + 1,
        ques_content: data[id].data.question,
        ques_ans: data[id].data.ans,
      },
    });
  };

  const handleClickShowImage = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "vcnv:playQuesAudio",
      data: {},
    });
  };

  return (
    <div className={styles.questionBox}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Select
          style={{ fontWeight: "bold", marginRight: "2rem" }}
          value={id}
          onChange={(event) => setID(event.target.value)}
          variant="outlined"
        >
          {data.map((item, index) => {
            if (index < 4)
              return (
                <MenuItem value={index} key={index}>
                  {" "}
                  Hàng ngang {index + 1}{" "}
                </MenuItem>
              );
            else
              return (
                <MenuItem value={index} key={index}>
                  {" "}
                  Ô trung tâm{" "}
                </MenuItem>
              );
          })}
        </Select>

        <TextField
          style={{ flexGrow: 1, marginRight: "2rem" }}
          disabled={!fixQues}
          label="Câu hỏi"
          value={data[id].data.question}
          variant="filled"
          onChange={handleChangsQues}
        />

        <IconButton
          className={styles.infoIcon}
          onClick={() => setFixQues(!fixQues)}
        >
          <Settings />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Select
          style={{ fontWeight: "bold", marginRight: "2rem" }}
          value={slide}
          onChange={(event) => setSlide(event.target.value)}
          variant="outlined"
        >
          <MenuItem value={"crossword"}> Hàng ngang </MenuItem>
          <MenuItem value={"question"}> Câu hỏi </MenuItem>
          <MenuItem value={"image"}> Mảnh ghép </MenuItem>
        </Select>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            className={styles.errorButton}
            variant="contained"
            color="danger"
            onClick={handleClickChangeSlide}
          >
            Chuyển Slide
          </Button>

          <Button
            className={styles.similarButton}
            variant="contained"
            color="tertiary"
            onClick={handleClickChooseQues}
          >
            {status[id] === true ? "Chọn" : "Bỏ chọn"} hàng ngang
          </Button>

          <Button
            className={styles.successButton}
            variant="contained"
            color="success"
            onClick={handleClickSendQues}
          >
            Gửi câu hỏi
          </Button>

          {data[id].data.type === "audio" && (
            <Button
              className={styles.errorButton}
              variant="contained"
              color="tertiary"
              onClick={handleClickShowImage}
            >
              Phát nhạc
            </Button>
          )}

          <IconButton className={styles.infoIcon} onClick={SendCrosswordAgain}>
            <CloudUpload />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default QuestionVCNV;

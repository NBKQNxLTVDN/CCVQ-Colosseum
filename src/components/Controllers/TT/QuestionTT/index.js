import React, { useState } from "react";
import { Image, Settings } from "@mui/icons-material";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  questionBox: {
    backgroundColor: theme.palette.secondary.surface,
    color: theme.palette.secondary.contrastText,
    padding: "1rem",
    height: "100%",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
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

const QuestionTT = (props) => {
  const styles = useStyles();

  const { id, setID, data, setData } = props;
  const [fixQues, setFixQues] = useState(false);

  // eslint-disable-next-line
  const [seed, setSeed] = useState(0);
  const forceUpdate = () => setSeed(Math.random());

  const handleChangeID = (event) => {
    setID(event.target.value);
  };

  const handleChangeQues = (event) => {
    let temp = data;
    temp[id].data.question = event.target.value;
    setData(temp);
    forceUpdate();
  };

  const handleClickStart = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "tt:state",
      data: {
        status: "start",
      },
    });
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
        ques_type: data[id].data.type,
        url: `${process.env.PUBLIC_URL}/data/TT/${data[id].data.url}`,
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

  return (
    <div className={styles.questionBox}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Select
          style={{ fontWeight: "bold" }}
          value={id}
          onChange={handleChangeID}
          variant="outlined"
        >
          {data.map((question, idx) => (
            <MenuItem value={idx} key={idx}>
              Câu hỏi số {question.id}
            </MenuItem>
          ))}
        </Select>
        <TextField
          style={{ flexGrow: 1, marginLeft: "2rem", marginRight: "2rem" }}
          label="Câu hỏi"
          value={data[id].data.question}
          variant="filled"
          disabled={!fixQues}
          onChange={handleChangeQues}
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
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          className={styles.errorButton}
          variant="contained"
          color="danger"
          onClick={handleClickStart}
        >
          Bắt đầu lượt thi
        </Button>

        <Button
          className={styles.similarButton}
          variant="contained"
          color="tertiary"
          onClick={handleClickSendQues}
        >
          Gửi câu hỏi
        </Button>

        <a
          href={`${process.env.PUBLIC_URL}/data/TT/${data[id].data.url}`}
          target="_blank"
          rel="noreferrer"
        >
          <IconButton
            className={styles.infoIcon}
            onClick={() => setFixQues(!fixQues)}
          >
            <Image />
          </IconButton>
          public/data/TT/{data[id].data.url}
        </a>
      </div>
    </div>
  );
};

export default QuestionTT;

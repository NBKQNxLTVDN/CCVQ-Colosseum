import React, { useRef } from "react";

import { PermDeviceInformation } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import HTMLStringConvert from "components/HTMLStringConvert";
import { socket } from "service/socket";
import { BigPlayButton, Player } from "video-react";

const useStyles = makeStyles((theme) => ({
  displayPlay: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    position: "relative",
  },
  titleScoreQuestion: {
    paddingTop: "20px",
  },
  dataQuestion: {
    display: "grid",
    gridTemplateColumns: "40% 60%",
    alignItems: "center",
  },
  withoutVideo: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  videoQuestion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  urlTitle: {
    margin: "3% 0",
  },
  video: {
    borderRadius: "5px",
    border: "1px solid black",
  },
  image: {
    width: "100%",
  },
  optionsVideo: {
    margin: "3% 0",
  },
  questionDetails: {
    width: "90%",
  },
  detail: {
    backgroundColor: theme.palette.info.main,
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    border: "1px solid black",
    boxShadow: "1px 1px 2px black",
    display: "grid",
    gridTemplateColumns: "5% 80% 5%",
    alignItems: "center",
    gridColumnGap: "5%",
    padding: "10px 20px",
    margin: "10px 0",
  },
  attribute: {
    backgroundColor: theme.palette.tertiary.main,
    width: "30px",
    padding: "10px",
    textJustify: "center",
    borderRadius: "10px",
    border: "1px solid black",
    boxShadow: "1px 1px 2px black",
  },
}));

let delay_playVideo = null;

const DisplayPlay = (props) => {
  const {
    formatQuestion,
    setFormatQuestion,
    currentQuestion,
    isOpenEdit,
    setIsOpenEdit,
    questionCHST,
    setQuestion,
    roundName,
  } = props;
  const styles = useStyles();

  const player = useRef(null);

  const question = questionCHST || formatQuestion[currentQuestion - 1];

  const play = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "scoreboard"],
      eventName: "ccvq:sendVideo",
      data: {
        autoPlay: true,
        url: `data/${roundName}/${question.data.url}`,
        type: question.type === "lab" ? "image" : question.type,
      },
    });

    delay_playVideo = setTimeout(() => {
      player.current.actions.play();
    }, 2500);
    return () => {
      clearTimeout(delay_playVideo);
    };
  };

  const pause = () => {
    player.current.actions.pause();
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "scoreboard"],
      eventName: "ccvq:playVideo",
      data: { status: "pause" },
    });
  };

  const reset = () => {
    player.current.actions.seek(0);
    player.current.actions.pause();
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "scoreboard"],
      eventName: "ccvq:playVideo",
      data: { status: "reset" },
    });
  };

  const close = () => {
    if (question.type === "video" || question.type === "audio") {
      player.current.actions.seek(0);
      player.current.actions.pause();
    }
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc", "scoreboard"],
      eventName: "ccvq:playVideo",
      data: { status: "close" },
    });
  };

  const onChangeInputQuestion = (e) => {
    if (formatQuestion) {
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
    } else if (questionCHST) {
      setQuestion((prevState) => ({
        ...prevState,
        data: { ...prevState.data, question: e.target.value },
      }));
    }
  };

  const onChangeInputAns = (e) => {
    if (formatQuestion) {
      setFormatQuestion((prevState) =>
        prevState.map((question) => {
          if (question.id === currentQuestion) {
            return {
              ...question,
              data: { ...question.data, ans: e.target.value },
            };
          }
          return { ...question };
        })
      );
    } else if (questionCHST) {
      setQuestion((prevState) => ({
        ...prevState,
        data: { ...prevState.data, ans: e.target.value },
      }));
    }
  };

  const onChangeInputUrl = (e) => {
    if (formatQuestion) {
      setFormatQuestion((prevState) =>
        prevState.map((question) => {
          if (question.id === currentQuestion) {
            return {
              ...question,
              data: { ...question.data, url: e.target.value },
            };
          }
          return { ...question };
        })
      );
    } else if (questionCHST) {
      setQuestion((prevState) => ({
        ...prevState,
        data: { ...prevState.data, url: e.target.value },
      }));
    }
  };

  const onChangeInputTopic = (e) => {
    if (formatQuestion) {
      setFormatQuestion((prevState) =>
        prevState.map((question) => {
          if (question.id === currentQuestion) {
            return {
              ...question,
              data: { ...question.data, topic: e.target.value },
            };
          }
          return { ...question };
        })
      );
    } else if (questionCHST) {
      setQuestion((prevState) => ({
        ...prevState,
        data: { ...prevState.data, topic: e.target.value },
      }));
    }
  };

  return (
    <div className={styles.displayPlay}>
      <ShowExtraQuestionSets />
      <div
        className={
          question.data.url ? styles.dataQuestion : styles.withoutVideo
        }
      >
        <div className={styles.questionDetails}>
          <div className={styles.detail}>
            <div className={styles.attribute}>Q</div>
            {isOpenEdit ? (
              <TextField
                className={styles.inputEdit}
                value={question.data.question}
                label="Question"
                inputProps={{
                  style: {
                    marginLeft: "5px",
                  },
                }}
                onChange={onChangeInputQuestion}
                variant="outlined"
              />
            ) : (
              <Typography variant="h6">
                <HTMLStringConvert string={question.data.question} />
              </Typography>
            )}
            <IconButton
              className={styles.infoIcon}
              onClick={() => {
                setIsOpenEdit(!isOpenEdit);
              }}
            >
              <PermDeviceInformation />
            </IconButton>
          </div>
          <div className={styles.detail}>
            <div className={styles.attribute}>T</div>
            {isOpenEdit ? (
              <TextField
                className={styles.inputEdit}
                value={question.data.topic}
                label="Topic"
                inputProps={{
                  style: {
                    marginLeft: "5px",
                  },
                }}
                onChange={onChangeInputTopic}
                variant="outlined"
              />
            ) : (
              <Typography variant="h6">{question.data.topic}</Typography>
            )}
            <IconButton
              className={styles.infoIcon}
              onClick={() => {
                setIsOpenEdit(!isOpenEdit);
              }}
            >
              <PermDeviceInformation />
            </IconButton>
          </div>
          <div className={styles.detail}>
            <div className={styles.attribute}>A</div>
            {isOpenEdit ? (
              <TextField
                className={styles.inputEdit}
                value={question.data.ans}
                label="Answer"
                inputProps={{
                  style: {
                    marginLeft: "5px",
                  },
                }}
                onChange={onChangeInputAns}
                variant="outlined"
              />
            ) : (
              <Typography variant="h6">
                <HTMLStringConvert string={question.data.ans} />
              </Typography>
            )}
            <IconButton
              className={styles.infoIcon}
              onClick={() => {
                setIsOpenEdit(!isOpenEdit);
              }}
            >
              <PermDeviceInformation />
            </IconButton>
          </div>
          {question.data.url && (
            <div className={styles.detail}>
              <div className={styles.attribute}>U</div>
              {isOpenEdit ? (
                <TextField
                  className={styles.inputEdit}
                  value={question.data.url}
                  label="Url"
                  inputProps={{
                    style: {
                      marginLeft: "5px",
                    },
                  }}
                  onChange={onChangeInputUrl}
                  variant="outlined"
                />
              ) : (
                <Typography
                  variant="h6"
                  color="primary"
                  className={styles.urlTitle}
                >
                  {question.data.url}
                </Typography>
              )}
              <IconButton
                className={styles.infoIcon}
                onClick={() => {
                  setIsOpenEdit(!isOpenEdit);
                }}
              >
                <PermDeviceInformation />
              </IconButton>
            </div>
          )}
        </div>
        {question.data.url && (
          <div className={styles.videoQuestion}>
            {question.type === "image" || question.type === "lab" ? (
              <img
                src={`${process.env.PUBLIC_URL}/data/${roundName}/${question.data.url}`}
                alt="question"
                className={styles.image}
              />
            ) : (
              <Player
                ref={player}
                // poster={`${process.env.PUBLIC_URL}/images/logo.png`}
                src={`${process.env.PUBLIC_URL}/data/${roundName}/${question.data.url}`}
                className={styles.video}
              >
                <BigPlayButton position="center" />
              </Player>
            )}

            <ButtonGroup className={styles.optionsVideo}>
              <Button onClick={play} variant="contained" color="info">
                {question.type !== "image" ? "Play Video" : "Show image"}
              </Button>
              <Button onClick={pause} variant="contained" color="info">
                Pause
              </Button>
              <Button onClick={close} variant="contained" color="info">
                Close {question.type}
              </Button>
              <Button onClick={reset} variant="contained" color="info">
                Reset
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayPlay;

const ShowExtraQuestionSets = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleIncreaseFontSize = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer"],
      eventName: "VD:changeFontSize",
      data: {
        action: "increase",
      },
    });
  };

  const handleDecreaseFontSize = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer"],
      eventName: "VD:changeFontSize",
      data: {
        action: "decrease",
      },
    });
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "50%" }}>
      {!isOpen ? (
        <div style={{ display: "flex", gap: "5%" }}>
          <Button
            style={{ backgroundColor: "#FFB927" }}
            variant="outlined"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Đề dự phòng
          </Button>
          <IconButton
            onClick={handleIncreaseFontSize}
            style={{ backgroundColor: "#FFB927" }}
            variant="outlined"
          >
            +
          </IconButton>
          <IconButton
            onClick={handleDecreaseFontSize}
            style={{ backgroundColor: "#FFB927" }}
            variant="outlined"
          >
            -
          </IconButton>
        </div>
      ) : (
        <div>oke</div>
      )}
    </div>
  );
};

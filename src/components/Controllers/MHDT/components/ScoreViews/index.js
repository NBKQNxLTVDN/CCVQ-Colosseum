import React, { useContext, useEffect, useState, useRef } from "react";

import { Button, ButtonGroup, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { socket } from "service/socket";
import { MainContext } from "contexts/MainContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  playerBoard: {
    height: "100%",
    display: "flex",
    gap: 20,
    flexDirection: "column",
  },
  button: {
    backgroundColor: theme.palette.tertiary.main,
    fontWeight: "bold",
    "&:hover": {
      color: "white",
    },
    borderRadius: "5px",
    boxShadow: "2px 2px 2px #000000",
  },
  avatar: {
    height: "100%",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    backgroundColor: "#C4C4C4",
    borderRadius: "10px",
    boxShadow: "inset 2px 2px 2px #000",
    "&:hover": {
      cursor: "pointer",
    },
  },
  avatarImg: {
    width: "100%",
    maxHeight: "90%",
    position: "relative",
  },
  info: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: "12vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    textShadow: "2px 2px 2px #000",
    width: "100%",
    height: "100%",
    backgroundColor: "#C4C4C4",
    borderRadius: "10px",
    boxShadow: "inset 2px 2px 2px #000",
  },
  header: {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "2% 3%",
    boxShadow: "2px 2px 2px #000000",
  },
  body: {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "2% 3%",
    boxShadow: "2px 2px 2px #000000",
    height: "fit-content",
  },
  dot: {
    borderRadius: "50%",
    boxShadow: "2px 2px 2px #000",
    maxHeight: "50px",
    maxWidth: "50px",
    width: "70%",
    height: "60%",
  },
  centerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const API_URL = `http://${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`;

const ScoreView = ({ player }) => {
  const styles = useStyles();

  const { action, players } = useContext(MainContext);
  const [name, setName] = useState(player.name);
  const [image, setImage] = useState(null);

  const inputRef = useRef(null);

  const handleSetShowScore = (data) => () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "mc"],
      eventName: "mhdt:showPlayer",
      data: {
        id: data,
      },
    });
  };

  const play = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "scoreboard"],
      eventName: "ccvq:videoStatus",
      data: {
        url: player.urlVideo,
        status: "play",
      },
    });
  };

  const pause = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "scoreboard"],
      eventName: "ccvq:videoStatus",
      data: {
        status: "pause",
      },
    });
  };

  const close = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "scoreboard"],
      eventName: "ccvq:videoStatus",
      data: {
        status: "close",
      },
    });
  };

  const reset = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "scoreboard"],
      eventName: "ccvq:videoStatus",
      data: {
        status: "reset",
      },
    });
  };

  const changeNamePlayer = (e) => {
    if (e.keyCode === 13) {
      action.setPlayerName(player.order, name);
      socket.emit("ccvq:updateInfo", {
        order: player.order,
        name: name,
      });
    }
  };

  const handleUploadImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmitImage = async (e) => {
    if (e.target.files[0]) {
      var bodyFormData = new FormData();
      bodyFormData.append("image", e.target.files[0]);
      const res = await axios.post(
        `${process.env.REACT_APP_ADMIN_ENDPOINT}/candidate/image/${player.order}`,
        bodyFormData
      );
      if (res.status === 200) {
        console.log(res.data);
        await getImage();
      }
    }
  };

  const getImage = async () => {
    const res = await axios.get(
      process.env.REACT_APP_ADMIN_ENDPOINT + "/get-data/scores"
    );
    console.log(
      res.data.filter((_player) => _player.order === player.order)[0].image
    );
    setImage(
      res.data.filter((_player) => _player.order === player.order)[0].image
    );
  };

  useEffect(() => {
    getImage();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.playerBoard}>
      <div className={styles.header}>
        <TextField
          size="small"
          variant="outlined"
          value={name}
          onKeyDown={changeNamePlayer}
          onChange={(e) => {
            setName(e.target.value.toUpperCase());
          }}
          inputProps={{
            style: {
              textAlign: "center",
              fontWeight: "bold",
              padding: "10px",
            },
          }}
          fullWidth
        />
      </div>
      <div className={styles.body}>
        <div className={styles.info}>
          <div className={styles.avatar} onClick={handleUploadImage}>
            <img
              alt="avatar"
              src={
                image
                  ? `${API_URL}/image/${image}`
                  : `${process.env.PUBLIC_URL}/images/logo.png`
              }
              className={styles.avatarImg}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleSubmitImage}
              style={{ display: "none" }}
              ref={inputRef}
            />
          </div>
          <div className={styles.score}>{player.score}</div>
        </div>
      </div>
      <div className={styles.centerContainer}>
        <Button onClick={play} color="info" variant="contained">
          Play
        </Button>
        <Button onClick={pause} color="info" variant="contained">
          Pause
        </Button>
        <Button
          onClick={close}
          color="info"
          variant="contained"
          sx={{ whiteSpace: "nowrap" }}
        >
          Close Video
        </Button>
        <Button onClick={reset} color="info" variant="contained">
          Reset
        </Button>
      </div>
      <Button
        className={styles.button}
        variant="contained"
        color="danger"
        onClick={handleSetShowScore(player.order)}
      >
        Hiện
      </Button>
    </div>
  );
};

export default ScoreView;

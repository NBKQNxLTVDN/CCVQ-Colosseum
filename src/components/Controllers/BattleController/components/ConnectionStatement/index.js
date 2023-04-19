import React, { useContext, useEffect, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, MenuItem, Select, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Carousel from "react-material-ui-carousel";

import ModalCustom from "components/Modal";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import { menu } from "utils/const";

const useStyles = makeStyles((theme) => ({
  connectionStatement: {
    backgroundColor: theme.palette.secondary.main,
    padding: 10,
    borderRadius: "50%",
    width: 100,
    height: 100,
    marginRight: "2rem",
    border: "1px solid black",
    boxShadow: "5px 5px 5px black",
  },
  disconnection: {
    width: 80,
    height: 80,
    backgroundColor: theme.palette.info.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    backgroundColor: theme.palette.danger.main,
    color: "white",
    borderRadius: "50%",
    width: 70,
    height: 70,
    position: "absolute",
    top: 5,
    left: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid black",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.6)",
  },
  foo: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const ConnectionStatement = ({ roundName, openController }) => {
  const styles = useStyles();
  const [show, setShow] = useState(false);
  const [disconnection, setDisconnection] = useState([]);

  const { state } = useContext(MainContext);

  const { connections } = state;

  useEffect(() => {
    /* Checking if the connection is connected or not. */
    const regex = new RegExp("^client.$");
    [
      "client1",
      "client2",
      "client3",
      "client4",
      "mc",
      "livestream",
      "viewer",
    ].forEach((connection) => {
      let symName = connection.toUpperCase();
      if (regex.test(connection)) {
        symName = connection.replace("client", "P");
      } else if (connection === "livestream") {
        symName = "L1";
      } else if (connection === "viewer") {
        symName = "V1";
      }
      if (!connections[connection] && !disconnection[symName]) {
        setDisconnection((prevState) => [...prevState, symName]);
      } else if (connections[connection] && disconnection[symName]) {
        setDisconnection((prevState) =>
          prevState.filter((disconnection) => disconnection === symName)
        );
      }
    });
    //eslint-disable-next-line
  }, [connections]);

  return (
    <div className={styles.connectionStatement}>
      <Playground
        roundName={roundName}
        show={show}
        setShow={setShow}
        openController={openController}
      />
      {disconnection.length > 0 ? (
        <div onClick={() => setShow(true)} className={styles.foo}>
          <Carousel
            NextIcon={<div />}
            PrevIcon={<div />}
            autoPlay={true}
            indicatorIconButtonProps={{
              style: {
                display: "none",
              },
            }}
            className={styles.disconnection}
            animation="slide"
          >
            {disconnection.map((client) => (
              <div key={client} className={styles.name}>
                {client}
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <IconButton
          style={{
            fontSize: 60,
          }}
          sx={(theme) => ({
            color: "black",
            backgroundColor: theme.palette.info.main,
            "&:hover": {
              backgroundColor: theme.palette.success.main,
              border: 0,
              color: theme.palette.info.main,
            },
          })}
          onClick={() => setShow(true)}
        >
          <CheckCircleIcon fontSize="inherit" htmlColor="inherit" />
        </IconButton>
      )}
    </div>
  );
};

const useStylesPlayground = makeStyles((theme) => ({
  playerConnection: {
    display: "flex",
    marginTop: 30,
  },
  othersConnection: {
    display: "flex",
    width: "100%",
    flexDirection: "row-reverse",
  },
  connected: {
    backgroundColor: theme.palette.success.main,
  },
  disconnected: {
    backgroundColor: theme.palette.danger.main,
  },
  box: {
    border: "1px solid black",
    borderRadius: 20,
    width: 100,
    height: 30,
    marginRight: 10,
  },
}));

const Playground = ({ roundName, show, setShow, openController }) => {
  const styles = useStylesPlayground();
  const { players, state } = useContext(MainContext);
  const { connections } = state;
  const [selectedOption, setSelectedOption] = useState(roundName);

  const formSubmit = () => {
    if (!selectedOption) return;
    openController(selectedOption);
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream", "client", "mc"],
      eventName: "ccvq:changeRound",
      data: {
        roundName: selectedOption,
      },
    });

    socket.emit("controller:talk", {
      receivers: ["mc"],
      eventName: "ccvq:choosePlayer",
      data: { order: -1 },
    });
    setShow(false);
  };

  return (
    <ModalCustom
      show={show}
      onClose={() => setShow(false)}
      onSubmit={formSubmit}
    >
      <h1>PLAYGROUND</h1>
      <div className={styles.playerConnection}>
        {players.map((player) => (
          <div key={player.order}>
            {connections[`client${player.order}`] ? (
              <div className={`${styles.connected} ${styles.box}`} />
            ) : (
              <div className={`${styles.disconnected} ${styles.box}`} />
            )}
          </div>
        ))}
      </div>
      <Select
        title="Menu điều khiển"
        id="form_control"
        type="select"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        variant="outlined"
        style={{
          width: "100%",
          backgroundColor: "#c4c4c4",
          marginTop: 30,
          marginBottom: 30,
        }}
        sx={{
          height: 80,
          borderRadius: 5,
          textShadow: "none",
        }}
      >
        {menu.map((element, idx) => (
          <MenuItem
            key={idx}
            value={element.id}
            className={styles.menuItem}
            inputProps={{ style: { textAlign: "center" } }}
          >
            <Typography variant="h6" color="initial">
              {element.name}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      <div className={styles.othersConnection}>
        {connections["mc"] ? (
          <div className={`${styles.connected} ${styles.box}`} />
        ) : (
          <div className={`${styles.disconnected} ${styles.box}`} />
        )}
        {connections.viewer && Object.keys(connections.viewer).length > 0 ? (
          <>
            {Object.keys(connections.viewer).map((viewer) => (
              <div
                key={viewer.name}
                className={`${styles.connected} ${styles.box}`}
              />
            ))}
          </>
        ) : (
          <div className={`${styles.disconnected} ${styles.box}`} />
        )}
      </div>
    </ModalCustom>
  );
};

export default ConnectionStatement;

import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { MainContext } from "contexts/MainContext";
import { IconButton } from "@mui/material";

import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRight: `5px solid ${theme.palette.info.main}`,
    borderLeft: `5px solid ${theme.palette.info.main}`,
  },
  icon: {
    width: 80,
    height: 80,
    backgroundColor: theme.palette.info.main,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    border: "1px solid black",
    boxShadow: "inset 1px 1px 1px black",
    "&:hover": {
      cursor: "pointer",
    },
  },
  amount: {
    width: 25,
    height: 25,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.info.main,
    border: "1px solid black",
    paddingRight: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    "&::before": {
      height: 23,
      content: '""',
      width: 10,
      position: "absolute",
      backgroundColor: theme.palette.info.main,
      top: 0,
      left: -10,
    },
  },
}));

const ScoreController = () => {
  const styles = useStyles();

  const { players, action } = useContext(MainContext);
  const [amount, setAmount] = useState(10);
  const [operator, setOperator] = useState(1);
  const [activeOrder, setActiveOrder] = useState(null);

  const onChangeScore = (order) => () => {
    action.setEachPlayerScore(order, operator * amount);
    setActiveOrder(order);
    socket.emit("ccvq:updateScore", { order, score: operator * amount });
  };

  const onChangeOperator = () => {
    setOperator((prev) => -1 * prev);
  };

  return (
    <div className={styles.container}>
      {players.map((player) => (
        <div
          className={styles.icon}
          key={player.order}
          onClick={onChangeScore(player.order)}
          style={{
            fontWeight: player.order === activeOrder ? "bold" : "normal",
            fontSize: player.order === activeOrder ? 32 : 24,
          }}
        >
          {player.score}
        </div>
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: "fit-content",
        }}
      >
        <IconButton
          className={styles.icon}
          style={{
            fontSize: 45,
          }}
          sx={(theme) => ({
            color: "black",
            backgroundColor: theme.palette.info.main,
            border: "1px solid black",
            "&:hover": {
              backgroundColor: theme.palette.info.main,
              border: 0,
              color:
                operator > 0
                  ? theme.palette.success.main
                  : theme.palette.danger.main,
            },
          })}
          onClick={onChangeOperator}
          onWheel={(e) => {
            if (e.deltaY < 0) {
              setAmount((prev) => prev + 5);
            } else {
              setAmount((prev) => (prev === 0 ? 0 : prev - 5));
            }
          }}
        >
          {operator > 0 ? (
            <AddCircleRoundedIcon fontSize="inherit" htmlColor="inherit" />
          ) : (
            <RemoveCircleIcon fontSize="inherit" htmlColor="inherit" />
          )}
        </IconButton>
        <div
          className={styles.amount}
          onWheel={(e) => {
            if (e.deltaY < 0) {
              setAmount((prev) => prev + 5);
            } else {
              setAmount((prev) => (prev === 0 ? 0 : prev - 5));
            }
          }}
        >
          {amount}
        </div>
      </div>
    </div>
  );
};

export default ScoreController;

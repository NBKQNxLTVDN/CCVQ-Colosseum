import React from "react";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    filter:
      "drop-shadow(1px 0px 0px black) drop-shadow(-1px 0px 0px black) drop-shadow(0px 1px 0px black) drop-shadow(0px -1px 0px black) drop-shadow(1px 1px 0px black) drop-shadow(-1px -1px 0px black) drop-shadow(-1px 1px 0px black) drop-shadow(1px -1px 0px black)",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  triangle: {
    clipPath: "polygon(0 0, 50% 50%, 0 100%)",
  },
  blueBtn: {
    width: 0,
    height: 0,
    borderTop: "40px solid transparent",
    borderBottom: "40px solid transparent",

    borderRight: "calc(40px*2*0.866) solid #2E7D32",
    "&:hover": {
      cursor: "pointer",
      borderRight: "calc(40px*2*0.866) solid #1b5e20",
    },
  },
  redBtn: {
    width: 0,
    height: 0,
    borderTop: "40px solid transparent",
    borderBottom: "40px solid transparent",

    borderLeft: "calc(40px*2*0.866) solid #D32F2F",
    "&:hover": {
      cursor: "pointer",
      borderLeft: "calc(40px*2*0.866) solid #c62828",
    },
  },
}));

const Action = ({ setItems }) => {
  const styles = useStyles();

  const handleClickMovBtn = () => {
    setItems((prev) => ({
      stack: [...prev.stack, ...prev.list],
      list: [],
      current: prev.current,
    }));
  };

  const handleClickCancelStack = () => {
    setItems((prev) => ({
      list: [...prev.list, ...prev.stack],
      stack: [],
      current: prev.current,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.blueBtn} onClick={handleClickMovBtn} />
      <div className={styles.redBtn} onClick={handleClickCancelStack} />
    </div>
  );
};

export default Action;

import React from "react";

import { makeStyles } from "@mui/styles";
import Row from "./row";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    animation: "1s ease 0s 1 normal none running fadeInUp",
  },
  column: {
    background: "-webkit-linear-gradient(#3B2344,#120218)",
    width: "10vw",
    height: "80vh",
  },
  row: {
    position: "absolute",
    top: "6%",
    left: "34%",
    height: "40%",
    display: "grid",
    gridTemplateRows: "1fr 1fr 1fr",
    rowGap: "20%",
  },
}));

const scoreSetValue = [1, 2, 3];

const ColumnScore = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.column} />
      <div className={styles.row}>
        {scoreSetValue.map((score) => (
          <Row id={score} key={score} />
        ))}
      </div>
    </div>
  );
};

export default ColumnScore;

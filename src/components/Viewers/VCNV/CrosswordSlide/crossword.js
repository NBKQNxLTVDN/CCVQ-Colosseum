import React from "react";
import { makeStyles } from "@mui/styles";
import Circle from "./circle.js";

const useStyles = makeStyles(() => ({
  crossword: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "repeat(4,1fr)",
    animation: "1.5s ease -0.5s 1 normal none running fadeInRightBig",
  },
  line: {
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "repeat(16,1fr)",
  },
}));

const Crossword = ({ crossword, status, size, length }) => {
  const styles = useStyles();

  return (
    <div className={styles.crossword}>
      {crossword && crossword.map((line, index) => (
        <div
          key={index}
          className={styles.line}
          style={{
            animation: `1s ease 0s 1 normal none running ${status[index] === "chosen"
              ? "pulse"
              : status[index] === "showed"
                ? "flipInX"
                : ""
              }`,
          }}
        >
          {line && line.map((item, id) => (
            <Circle key={id} word={item} status={status[index]} size={size} />
          ))}
          {length && length[index]}
        </div>
      ))}
    </div>
  );
};

export default Crossword;

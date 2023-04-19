import React from "react";
import { makeStyles } from "@mui/styles";
import Background from "../assets/HorizantalQuizScreen/circle.png";
import Chosen from "../assets/HorizantalQuizScreen/chosen.png";
import Hidden from "../assets/HorizantalQuizScreen/hidden.png";

const useStyles = makeStyles(() => ({
  background: {
    display: "flex",
    alignItems: "center",
    width: "95%",
  },
  word: {
    position: "absolute",
    width: "90%",
    height: "90%",
    top: "0%",
    left: "0%",
    display: "flex",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Circle = ({ word, status, size }) => {
  const styles = useStyles();

  return (
    <div style={{ position: "relative" }}>
      {word !== "" &&
        ((status === "none" && (
          <img
            alt="background"
            src={Background}
            className={styles.background}
          />
        )) ||
          (status === "chosen" && (
            <img alt="background" src={Chosen} className={styles.background} />
          )) ||
          (status === "hidden" && (
            <img alt="background" src={Hidden} className={styles.background} />
          )) ||
          (status === "showed" && (
            <div>
              <img
                alt="background"
                src={Background}
                className={styles.background}
              />
              <div
                className={styles.word}
                style={{
                  fontSize: `${size === "large" ? 4 : size === "medium" ? 2 : 1.5
                    }vh`,
                }}
              >
                {word}
              </div>
            </div>
          )))}
    </div>
  );
};

export default Circle;

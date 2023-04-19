import React from "react";
import { makeStyles } from "@mui/styles";
import Background from "../assets/HorizantalQuizScreen/choose_horizontal_question_TTTL.png";
import Bell from "../Bell";
import Crossword from "./crossword.js";

const useStyles = makeStyles(() => ({
  background: {
    height: "100vh",
    width: "100vw",
    zIndex: 1,
  },
  crossword: {
    position: "absolute",
    zIndex: 2,
    transform: "translate(-50%, -50%)",
    top: "53.5%",
    left: "54%",
    height: "59.5%",
    width: "73%",
  },
}));

const CrosswordSlide = ({ crossword, status }) => {
  const styles = useStyles();

  return (
    <div>
      <img alt="background" src={Background} className={styles.background} />
      <Bell direction="column" />
      <div className={styles.crossword}>
        <Crossword
          crossword={crossword}
          status={status}
          size="large"
          length={null}
        />
      </div>
    </div>
  );
};

export default CrosswordSlide;

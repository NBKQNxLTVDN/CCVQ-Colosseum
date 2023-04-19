import React from "react";

import { makeStyles } from "@mui/styles";
import Question from "../../components/Question";
import Timer from "../../components/Timer";
import Background from "../../assets/QuestionScreen/VD-bg.png";
import Player from "../../components/Player";

const useStyles = makeStyles((theme) => ({
  QuestionContainer: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",  
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    border: "1px solid black",
    padding: "3%",
    zIndex: 2,
    display: "grid",
    gridTemplateColumns: "11fr 4fr",
    gridGap: "2%",
  },
  box: {
    border: "1px solid black",
    height: "100%",
    width: "100%",
    borderRadius: "30px",
    backgroundColor: "orange",
  },
  rightContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridGap: "3%",
  },
}));

const QuestionContainer = ({ playerOrder }) => {
  const styles = useStyles();

  return (
    <div className={styles.QuestionContainer}>
      <img alt="background" src={Background} className={styles.background} />
      <div className={styles.content}>
        <Question player={playerOrder} />
        <div className={styles.rightContainer}>
          <Timer />
          <Player playerOrder={playerOrder} />
        </div>
      </div>
    </div>
  );
};

export default QuestionContainer;
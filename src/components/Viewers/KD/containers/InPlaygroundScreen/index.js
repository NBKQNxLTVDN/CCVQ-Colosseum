import React from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//images
import Background from "../../assets/images/background_testing.png";

//components
import ScoreBoard from "../../components/ScoreBoard";
import TimerBar from "../../components/TimeProcessingBar";
import Question from "../../components/Question";

//styles
const useStyles = makeStyles((theme) => ({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    width: "100vw",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const InPlaygroundScreen = (props) => {
  const { handleEndRound } = props;
  const styles = useStyles();
  return (
    <div>
      <img className={styles.background} alt="background" src={Background} />
      <Question handleEndRound={handleEndRound} />
      <TimerBar />
      <ScoreBoard />
    </div>
  );
};

export default InPlaygroundScreen;

import React from "react";

import { makeStyles } from "@mui/styles";
import background from "../../assets/WaitingScreen/background.png";

const useStyles = makeStyles((theme) => ({
  WaitingScreen: {
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
}));

const WaitingScreen = () => {
  const styles = useStyles();
  return (
    <div className={styles.WaitingScreen}>
      <img alt="background" src={background} className={styles.background} />
    </div>
  );
};

export default WaitingScreen;

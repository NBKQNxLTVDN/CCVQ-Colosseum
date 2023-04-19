import React from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//images
import Background from "../../assets/images/WaitingScreen/background.png";

//styles
const useStyles = makeStyles((theme) => ({
  screen: {
    width: "100vw",
    height: "100vh",
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
    <div className={styles.screen}>
      <img alt="background" src={Background} className={styles.background} />
    </div>
  );
};

export default WaitingScreen;

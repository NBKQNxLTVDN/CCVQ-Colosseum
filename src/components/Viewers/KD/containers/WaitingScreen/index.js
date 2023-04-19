import React from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//images
import Background from "../../assets/images/background_waiting_screen.png";
import Bell from "../../components/Bell";

//styles
const useStyles = makeStyles((theme) => ({
  background: {
    width: "100vw",
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const WaitingScreen = () => {
  const styles = useStyles();
  return (
    <div>
      <img className={styles.background} alt="background" src={Background} />
      <Bell direction={"column"} />
    </div>
  );
};

export default WaitingScreen;

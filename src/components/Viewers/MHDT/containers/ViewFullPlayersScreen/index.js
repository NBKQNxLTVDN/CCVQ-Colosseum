import React, { useContext } from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//context
import { MainContext } from "contexts/MainContext";

//components
import PlayerInfo from "../../components/PlayerInfo";

//images
import Background from "../../assets/images/ViewFullPlayersScreen/background.png";

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
  players: {
    position: "absolute",
    top: "14%",
    left: "9%",
    width: "84%",
    height: "67%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    columnGap: "12%",
    rowGap: "13%",
  },
}));

const ViewFullPlayersScreen = () => {
  const { players } = useContext(MainContext);
  const styles = useStyles();
  return (
    <div className={styles.screen}>
      <img alt="background" src={Background} className={styles.background} />
      <div className={styles.players}>
        {players.map((player) => (
          <PlayerInfo player={player} />
        ))}
      </div>
    </div>
  );
};

export default ViewFullPlayersScreen;

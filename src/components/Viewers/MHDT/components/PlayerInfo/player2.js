import React from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//images
import NameContainer from "../../assets/images/ViewFullPlayersScreen/name_container.png";

//styles
const useStyles = makeStyles((theme) => ({
  player2: {
    display: "grid",
    gridTemplateColumns: "74% 30%",
    columnGap: "2%",
    alignItems: "end",
    position: "relative",
  },
  score: {
    height: "60%",
    marginBottom: "-13%",
    marginRight: "18%",
    marginLeft: "5%",
    backgroundColor: "#1B3C63",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FBF6F5",
    fontWeight: 900,
    fontSize: "4.5vw",
    animation: "2s ease 0s 1 normal none running fadeInLeft",
  },
  nameContainer: {
    position: "relative",
    width: "150%",
    height: "150%",
    display: "flex",
    justifyContent: "top",
    alignItems: "end",
    animation: "1s ease 0s 1 normal none running fadeInLeft",
  },
  background: {
    width: "63%",
    height: "15.5%",
    marginBottom: "-7.2%",
    marginLeft: "-6.1%",
    transform: "scalex(-1)",
  },
  name: {
    position: "absolute",
    bottom: "-9%",
    left: "10%",
    color: "#fbf6f5",
    fontWeight: 600,
    fontSize: "2vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  avatar: {
    position: "absolute",
    width: "32%",
    bottom: "5%",
    left: "15%",
    zIndex: 0,
    animation: "1s ease 0s 1 normal none running zoomIn",
  },
}));

let time2 = null;

const PLAYER2 = (props) => {
  const { player } = props;
  const styles = useStyles();
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    time2 = setTimeout(() => {
      setDisplay(true);
    }, 1000);
    return () => {
      clearTimeout(time2);
    };
  }, []);

  return (
    <div className={styles.player2}>
      <img
        alt="avatar"
        src={`${process.env.PUBLIC_URL}/images/TS2.png` || `${process.env.PUBLIC_URL}/images/logo.png`}
        className={styles.avatar}
      />
      <div className={styles.nameContainer}>
        <img alt="name" src={NameContainer} className={styles.background} />
        <div className={styles.name}>{player.name}</div>
      </div>
      {display && <div className={styles.score}>{player.score}</div>}
    </div>
  );
};

export default PLAYER2;

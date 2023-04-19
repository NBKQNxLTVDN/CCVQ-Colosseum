import React from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//images
import NameContainer from "../../assets/images/ViewFullPlayersScreen/name_container.png";

//styles
const useStyles = makeStyles((theme) => ({
  player1: {
    display: "grid",
    gridTemplateColumns: "30% 74%",
    columnGap: "2%",
    alignItems: "end",
    justifyContent: "end",
    position: "relative",
  },
  score: {
    height: "60%",
    marginBottom: "-13%",
    marginRight: "20%",
    backgroundColor: "#1B3C63",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FBF6F5",
    fontWeight: 900,
    fontSize: "4.5vw",
    animation: "2s ease 0s 1 normal none running fadeInRight",
  },
  nameContainer: {
    position: "relative",
    width: "150%",
    height: "150%",
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    animation: "1s ease 0s 1 normal none running fadeInRight",
  },
  background: {
    position: "relative",
    //border: "3px solid #000000",
    width: "60%",
    height: "16%",
    marginBottom: "-7.1%",
    marginRight: "31.6%",
  },
  name: {
    position: "absolute",
    bottom: "-9%",
    right: "49%",
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
    width: "34%",
    bottom: "5%",
    right: "15%",
    zIndex: 0,
    animation: "1s ease 0s 1 normal none running zoomIn",
  },
}));

let time1 = null;

const PLAYER1 = (props) => {
  const { player } = props;
  const styles = useStyles();
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    time1 = setTimeout(() => {
      setDisplay(true);
    }, 1000);
    return () => {
      clearTimeout(time1);
    };
  }, []);

  return (
    <div className={styles.player1}>
      {display ? (
        <div className={styles.score}>{player.score}</div>
      ) : (
        <div></div>
      )}
      <img
        alt="avatar"
        src={`${process.env.PUBLIC_URL}/images/TS1.png` || `${process.env.PUBLIC_URL}/images/logo.png`}
        className={styles.avatar}
      />
      <div className={styles.nameContainer}>
        <img alt="name" src={NameContainer} className={styles.background} />
        <div className={styles.name}>{player.name}</div>
      </div>
    </div>
  );
};

export default PLAYER1;

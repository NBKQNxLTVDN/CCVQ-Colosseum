import React from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//images
import NameContainer from "../../assets/images/ViewFullPlayersScreen/name_container.png";

//styles
const useStyles = makeStyles((theme) => ({
  player3: {
    display: "grid",
    gridTemplateColumns: "30% 74%",
    columnGap: "2%",
    alignItems: "top",
    position: "relative",
  },
  score: {
    height: "60%",
    marginTop: "17%",
    marginRight: "41%",
    marginLeft: "-20%",
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
    //transform: "scalex(-1)",
    animation: "1s ease 0s 1 normal none running fadeInLeft",
  },
  background: {
    width: "93%",
    height: "15%",
    marginBottom: "-8.7%",
    marginRight: "18%",
    transform: "scalex(-1)",
  },
  name: {
    position: "absolute",
    bottom: "-7%",
    right: "40%",
    color: "#fbf6f5",
    fontWeight: 600,
    fontSize: "2vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    //transform: "scalex(-1)",
  },
  avatar: {
    position: "absolute",
    width: "33%",
    right: "20%",
    bottom: "5%",
    zIndex: 0,
    animation: "1s ease 0s 1 normal none running zoomIn",
  },
}));

let time3 = null;

const PLAYER3 = (props) => {
  const { player } = props;
  const styles = useStyles();
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    time3 = setTimeout(() => {
      setDisplay(true);
    }, 1000);
    return () => {
      clearTimeout(time3);
    };
  }, []);

  return (
    <div className={styles.player3}>
      {display ? (
        <div className={styles.score}>{player.score}</div>
      ) : (
        <div></div>
      )}
      <div style={{ display: "flex", alignItems: "end" }}>
        <img
          alt="avatar"
          src={`${process.env.PUBLIC_URL}/images/TS3.png` || `${process.env.PUBLIC_URL}/images/logo.png`}
          className={styles.avatar}
        />
        <div className={styles.nameContainer}>
          <img alt="name" src={NameContainer} className={styles.background} />
          <div className={styles.name}>{player.name}</div>
        </div>
      </div>
    </div>
  );
};

export default PLAYER3;

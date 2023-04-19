import React, { useState, useEffect } from "react";

//material-ui
import { makeStyles } from "@mui/styles";

//images
import NameContainer from "../../assets/images/ViewFullPlayersScreen/name_container.png";

import "./styles.css";

//styles
const useStyles = makeStyles((theme) => ({
  player4: {
    display: "grid",
    gridTemplateColumns: "74% 30%",
    columnGap: "2%",
    alignItems: "top",
    position: "relative",
  },
  score: {
    height: "60%",
    marginTop: "17%",
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
    justifyContent: "end",
    alignItems: "end",
    animation: "1s ease 0s 1 normal none running fadeInRight",
  },
  background: {
    width: "95%",
    height: "15.5%",
    marginBottom: "-9%",
    marginRight: "4%",
  },
  name: {
    position: "absolute",
    bottom: "-7%",
    right: "30%",
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
    left: "15%",
    zIndex: 0,
    animation: "1s ease 0s 1 normal none running zoomIn",
  },
}));

let time4 = null;

const PLAYER4 = (props) => {
  const { player } = props;
  const styles = useStyles();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    time4 = setTimeout(() => {
      setDisplay(true);
    }, 1000);
    return () => {
      clearTimeout(time4);
    };
  }, []);

  return (
    <div className={styles.player4}>
      <div
        style={{ display: "flex", alignItems: "end", justifyContent: "right" }}
      >
        <img
          alt="avatar"
          src={`${process.env.PUBLIC_URL}/images/TS4.png` || `${process.env.PUBLIC_URL}/images/logo.png`}
          className={styles.avatar}
        />
        <div className={styles.nameContainer}>
          <img alt="name" src={NameContainer} className={styles.background} />
          <div className={styles.name}>{player.name}</div>
        </div>
      </div>
      {display && <div className={styles.score}>{player.score}</div>}
    </div>
  );
};

export default PLAYER4;

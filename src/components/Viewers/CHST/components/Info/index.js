import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

import { makeStyles } from "@mui/styles";

import FieldBoard from "../../assets/images/question_container.png";
import NameBar from "../../assets/images/name_bar.png";
import PlayerScoreBar from "../../assets/images/player_score_bar.png";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateRows: "3fr 1fr",
    rowGap: "5%",
    maxHeight: "100%",
    width: "100%",
  },
  playerContainer: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    columnGap: "4%",
  },
  nameContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "7vh",
    boxShadow: "5px 5px 5px #000",
    borderRadius: "3vh",
    fontWeight: "bold",
    textShadow: "2px 2px 2px white",
    animation: "2s ease 0s 1 normal none running flipInX",
  },
  scoreContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "7vh",
    fontWeight: "bold",
    boxShadow: "5px 5px 5px #000",
    borderRadius: "4vh",
    textShadow: "2px 2px 2px white",
    animation: "2s ease 0s 1 normal none running flipInX",
  },
  reviewContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "9vh",
    color: "white",
    fontWeight: 900,
    textShadow: "5px 5px 5px #000",
    boxShadow: "inset 5px 5px 5px #000",
    borderRadius: "5.5vh",
  },
  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: -1,
  },
}));

let timeOut,
  timeOut2 = null;

const Info = (props) => {
  const styles = useStyles();
  const { review } = props;
  const [reviewType, setReviewType] = useState(review?.type);
  const [src, setSrc] = useState(null);
  const [display, setDisplay] = useState(false);
  const [displayReview, setDisplayReview] = useState(false);
  const { playerId, field } = props;

  const { players } = useContext(MainContext);

  useEffect(() => {
    socket.on("CHST:reviewField", (data) => {
      setSrc(data.src);
      setReviewType(data.type);
    });
    return () => {
      socket.off("CHST:reviewField");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    timeOut = setTimeout(() => {
      setDisplay(true);
    }, 4000);

    timeOut2 = setTimeout(() => {
      setDisplayReview(true);
    }, 2000);

    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOut2);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.reviewContainer}>
        <img alt="container" src={FieldBoard} className={styles.img} />
        {displayReview && (
          <div
            style={{
              animation: "3s ease 0s 1 normal none running fadeInUp",
            }}
          >
            {reviewType === "image" && <ReviewImg srcImg={review.url} />}
            {reviewType === "video" && <ReviewVideo srcVideo={src} />}
            {reviewType === "text" && field}
          </div>
        )}
      </div>
      {display && (
        <div className={styles.playerContainer}>
          <div className={styles.nameContainer}>
            <img alt="name_bar" src={NameBar} className={styles.img} />
            {players[playerId - 1].name}
          </div>
          <div className={styles.scoreContainer}>
            {players[playerId - 1].score}
            <img
              alt="player_score_bar"
              src={PlayerScoreBar}
              className={styles.img}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;

const ReviewImg = (props) => {
  const { srcImg } = props;
  return (
    <img
      src={`${process.env.PUBLIC_URL}/data/CHST/Review CHST/${srcImg}`}
      alt="CHST"
      style={{ width: "75%", margin: "auto" }}
    />
  );
};

const ReviewVideo = (props) => {
  const { srcVideo } = props;
  return <>{srcVideo}</>;
};

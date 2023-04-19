import React from "react";
import { makeStyles } from "@mui/styles";
import { Check, Close, Sync } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2.5% 2%",
    display: "grid",
    columnGap: "2%",
    backgroundColor: "#C4C4C4",
    border: "5px solid #C54D4D",
    borderRadius: "10px",
    boxShadow: "inset 5px 5px 5px #000000",
  },
  nameBox: {
    fontSize: "2.5vh",
    fontWeight: "bold",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFB927",
    borderRadius: "10px",
    border: "3px solid #000000",
  },
  answerBox: {
    fontSize: "2.5vh",
    color: "black",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    borderRadius: "10px",
    border: "3px solid #000000",
    paddingLeft: "10px",
  },
  timeBox: {
    fontSize: "2.5vh",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    border: "3px solid #000000",
  },
  result: {
    border: "2px solid #000000",
    boxShadow: "2px 2px 2px black",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Answers = (props) => {
  const { display, Candidate } = props;
  const styles = useStyles();
  return (
    <>
      {display &&
        Candidate &&
        Candidate.map((player) => (
          <div
            className={styles.container}
            style={
              player.seconds
                ? {
                    gridTemplateColumns: "3fr 5fr 2fr 1fr",
                  }
                : {
                    gridTemplateColumns: "3fr 7fr 1fr",
                  }
            }
          >
            <div className={styles.nameBox}>{player.name}</div>
            <div className={styles.answerBox}>
              {player.answer || player.ans}
            </div>
            {player.seconds ? (
              <div className={styles.timeBox}>{player.seconds} s</div>
            ) : null}
            <div className={styles.result}>
              {player.status === "incorrect" ? (
                <Close
                  style={{
                    backgroundColor: "#C54D4D",
                    color: "white",
                    animation: "2s ease 0s 1 normal none running flipInX",
                  }}
                />
              ) : player.status === "null" || player.status === "" ? (
                <Sync
                  style={{
                    animation:
                      "1s ease 0s infinite normal none running rotateIn",
                  }}
                />
              ) : (
                <Check
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    animation: "2s ease 0s 1 normal none running flipInX",
                  }}
                />
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default Answers;

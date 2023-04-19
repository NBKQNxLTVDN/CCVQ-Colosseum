import React from "react";
import { makeStyles } from "@mui/styles";
import QuestionCard from "../QuestionCard";

const useStyles = makeStyles((theme) => ({
  displayQuestions: {
    justifyContent: "space-around",
    alignItems: "center",
    background: "#51AFC3",
    padding: "1%",
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
    borderRadius: "5px",
    marginBottom: 0,
  },
  displayFullQuestions: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    columnGap: "1%",
    overflowY: "hidden",
    overflowX: "scroll",
  },
  columnQuestion: {
    border: "1px solid black",
    overflowX: "hidden",
    overflowY: "scroll",
    width: "100%",
    padding: "10px",
    margin: "3px 5px",
    borderRadius: "10px",
    boxShadow: "1px 1px 1px #000000",
  },
  header: {
    color: theme.palette.tertiary.contrastText,
    backgroundColor: theme.palette.tertiary.main,
    padding: "5px",
    width: "fit-content",
    borderRadius: "5px",
    border: "1px solid black",
    boxShadow: "1px 1px 1px #000000",
  },
}));

const DisplayReady = (props) => {
  const { data } = props;

  const styles = useStyles();
  return (
    <div className={styles.displayFullQuestions}>
      {data.map((player, idx) => {
        return (
          <div className={styles.columnQuestion} key={idx}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px 0",
                overflow: "visible",
              }}
            >
              <h2 className={styles.header}>Bộ đề số {idx + 1}</h2>
            </div>
            {player.data.map((ques) => (
              <div
                key={ques.id}
                style={{ marginBottom: "10px", textAlign: "left" }}
              >
                <QuestionCard data={ques} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayReady;

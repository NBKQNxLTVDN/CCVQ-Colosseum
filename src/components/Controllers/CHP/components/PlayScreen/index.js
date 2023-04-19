import React from "react";

import { makeStyles } from "@mui/styles";

import DisplayPlay from "../DisplayPlay";
import FormControlPlay from "../FormControlPlay";

const useStyles = makeStyles((theme) => ({
  round: {
    height: "100%",
    display: "grid",
    gridTemplateRows: "70% 30%",
  },
  roundDisplay: {
    justifyContent: "space-around",
    alignItems: "center",
    background: "#51AFC3",
    padding: "1%",
    margin: "1%",
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
    borderRadius: "5px",
    marginBottom: 0,
    boxShadow: "2px 2px 2px #000",
  },
  roundController: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#51AFC3",
    margin: "1%",
    border: "1px solid black",
    borderRadius: "5px",
    boxShadow: "2px 2px 2px #000",
  },
}));

const PlayScreen = ({ data }) => {
  const styles = useStyles();

  const [question, setQuestion] = React.useState(null);

  return (
    <div className={styles.round}>
      <div className={styles.roundDisplay}>
        <DisplayPlay data={data} question={question} />
      </div>
      <div className={styles.roundController}>
        <FormControlPlay data={data} setQuestion={setQuestion} />
      </div>
    </div>
  );
};

export default PlayScreen;

import React, { useState } from "react";

import { makeStyles } from "@mui/styles";

import DisplayReady from "../../components/DisplayReady";
import FormControlReady from "../../components/FormControlReady";

const useStyles = makeStyles((theme) => ({
  round: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateRows: "70% 30%",
    overflowY: "scroll",
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
    overflowY: "scroll",
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
    overflowY: "scroll",
    boxShadow: "2px 2px 2px #000",
  },
}));

const ReadyScreen = (props) => {
  const styles = useStyles();

  const {
    nextForm,
    setNextForm,
    data,
    selectedPlayer,
    setSelectedPlayer,
    formatQuestion,
    setFormatQuestion,
    setCurrentQuestion,
  } = props;

  const [submitInfo, setSubmitInfo] = useState(false); //
  const [selectedOption, setSelectedOption] = useState(1); // bo de

  return (
    <div className={styles.round}>
      <div className={styles.roundDisplay}>
        <DisplayReady data={data} />
      </div>
      <div className={styles.roundController}>
        <FormControlReady
          data={data}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          formatQuestion={formatQuestion}
          setFormatQuestion={setFormatQuestion}
          nextForm={nextForm}
          setNextForm={setNextForm}
          submitInfo={submitInfo}
          setSubmitInfo={setSubmitInfo}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>
    </div>
  );
};

export default ReadyScreen;

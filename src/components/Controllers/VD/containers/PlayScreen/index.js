import React, { useState } from "react";

import { makeStyles } from "@mui/styles";

import DisplayPlay from "../../components/DisplayPlay";
import FormControlPlay from "../../components/FormControlPlay";

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

const PlayScreen = (props) => {
  const styles = useStyles();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const {
    nextForm,
    setIsFirstRender,
    formatQuestion,
    setFormatQuestion,
    currentQuestion,
    setNextForm,
    selectedPlayer,
    setCurrentQuestion,
  } = props;

  return (
    <div className={styles.round}>
      <div className={styles.roundDisplay}>
        <DisplayPlay
          formatQuestion={formatQuestion}
          setFormatQuestion={setFormatQuestion}
          currentQuestion={currentQuestion}
          isOpenEdit={isOpenEdit}
          setIsOpenEdit={setIsOpenEdit}
          roundName="VD"
        />
      </div>
      <div className={styles.roundController}>
        <FormControlPlay
          nextForm={nextForm}
          setIsFirstRender={setIsFirstRender}
          setNextForm={setNextForm}
          selectedPlayer={selectedPlayer}
          formatQuestion={formatQuestion}
          setFormatQuestion={setFormatQuestion}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          isOpenEdit={isOpenEdit}
          setIsOpenEdit={setIsOpenEdit}
        />
      </div>
    </div>
  );
};

export default PlayScreen;

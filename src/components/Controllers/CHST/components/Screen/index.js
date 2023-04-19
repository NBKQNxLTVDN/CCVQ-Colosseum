import React, { useState } from "react";

import { makeStyles } from "@mui/styles";

import FormControl from "../FormControl";
import DisplayPlay from "components/Controllers/VD/components/DisplayPlay";

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

const Screen = (props) => {
  const styles = useStyles();

  const { data } = props;

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 1,
    score: -1,
    data: {},
  });

  return (
    <div className={styles.round}>
      <div className={styles.roundDisplay}>
        {currentQuestion.score !== -1 && (
          <DisplayPlay
            questionCHST={currentQuestion}
            setQuestion={setCurrentQuestion}
            isOpenEdit={isOpenEdit}
            setIsOpenEdit={setIsOpenEdit}
            roundName="CHST"
          />
        )}
      </div>
      <div className={styles.roundController}>
        <FormControl
          data={data}
          isOpenEdit={isOpenEdit}
          setIsOpenEdit={setIsOpenEdit}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />
      </div>
    </div>
  );
};

export default Screen;

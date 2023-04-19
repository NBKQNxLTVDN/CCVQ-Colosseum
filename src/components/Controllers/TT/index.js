import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import AnswerTT from "./AnswerTT";
import QuestionTT from "./QuestionTT";

const useStyles = makeStyles((theme) => ({
  round: {
    border: "1px solid black",
    borderRadius: "5px",
    background: "#C4C4C4",
    display: "grid",
    gridTemplateRows: "70% 30%",
    boxShadow: "inset 5px 5px 5px #000",
    height: "calc(100vh - 150px)",
  },
  roundDisplay: {
    justifyContent: "space-around",
    alignItems: "center",
    background: "#51AFC3",
    padding: "1%",
    margin: "1%",
    border: "1px solid black",
    borderRadius: "5px",
    marginBottom: 0,
    boxShadow: "2px 2px 2px #000",
  },
  roundController: {
    background: "#51AFC3",
    padding: "1%",
    margin: "1%",
    border: "1px solid black",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    boxShadow: "2px 2px 2px #000",
  },
}));

const API_URL = process.env.REACT_APP_ADMIN_ENDPOINT;

const ControllerTT = ({ refSync }) => {
  const styles = useStyles();
  const [data, setData] = useState();
  const [id, setID] = useState(0);

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(API_URL + "/game-content/TT");
      console.log("[DATA] ", res.data);
      setData(res.data);
    };
    fetchQuestion();
    refSync.current = fetchQuestion;
    //eslint-disable-next-line
  }, []);
  return (
    <div className={styles.round}>
      <div className={styles.roundDisplay}>
        {data && <AnswerTT id={id} data={data} setData={setData} />}
      </div>
      <div className={styles.roundController}>
        {data && (
          <QuestionTT id={id} setID={setID} data={data} setData={setData} />
        )}
      </div>
    </div>
  );
};

export default ControllerTT;

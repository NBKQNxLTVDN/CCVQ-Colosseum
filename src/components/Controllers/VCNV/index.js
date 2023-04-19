import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { socket } from "service/socket";
import AnswerVCNV from "./AnswerVCNV";
import QuestionVCNV from "./QuestionVCNV";

const useStyles = makeStyles((theme) => ({
  round: {
    border: "1px solid black",
    borderRadius: "5px",
    background: "#C4C4C4",
    display: "grid",
    gridTemplateRows: "70% 30%",
    overflow: "scroll",
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
    overflow: "scroll",
    boxShadow: "2px 2px 2px #000",
  },
}));

const API_URL = process.env.REACT_APP_ADMIN_ENDPOINT;

const ControllerVCNV = ({ refSync }) => {
  const styles = useStyles();
  const [data, setData] = useState(null);
  const [cnv, setCNV] = useState(null);
  const [id, setID] = useState(0);

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(API_URL + "/game-content/VCNV");
      console.log("[DATA] ", res.data);
      setData(res.data.data);
      setCNV(res.data.CNV);

      socket.emit("controller:talk", {
        receivers: ["viewer", "livestream", "controller", "mc"],
        eventName: "vcnv:crossword",
        data: {
          crossword: res.data.data.map((item) => {
            return { length: item.data.length, word: item.data.ans };
          }),
          cnv: res.data.CNV.answer,
        },
      });
    };

    fetchQuestion();
    refSync.current = fetchQuestion;
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.round}>
      <div className={styles.roundDisplay}>
        {data && <AnswerVCNV id={id} data={data} setData={setData} CNV={cnv} />}
      </div>
      <div className={styles.roundController}>
        {data && (
          <QuestionVCNV id={id} setID={setID} data={data} setData={setData} />
        )}
      </div>
    </div>
  );
};

export default ControllerVCNV;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import PlayScreen from "./components/PlayScreen";
import axios from "axios";

const API_URL = process.env.REACT_APP_ADMIN_ENDPOINT;

const useStyles = makeStyles((theme) => ({
  round: {
    border: "1px solid black",
    borderRadius: "5px",
    height: "calc(100vh - 150px)",
    background: "#C4C4C4",
    overflowY: "scroll",
    boxShadow: "inset 5px 5px 5px #000",
  },
}));

const ControllerCHP = ({ refSync }) => {
  const styles = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("CHP IS RENDER");
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(API_URL + "/game-content/CHP");
      setData(res.data);
    };
    fetchQuestion();
    refSync.current = fetchQuestion;
    //eslint-disable-next-line
  }, []);
  return (
    <div className={styles.round}>{data && <PlayScreen data={data} />}</div>
  );
};
export default ControllerCHP;

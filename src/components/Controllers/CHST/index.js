import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";

import axios from "axios";

import Screen from "./components/Screen";

const API_URL = process.env.REACT_APP_ADMIN_ENDPOINT;

const useStyles = makeStyles((theme) => ({
  round: {
    border: "1px solid black",
    borderRadius: "5px",
    height: "calc(100vh - 2rem)",
    background: "#C4C4C4",
    overflowY: "scroll",
    boxShadow: "inset 5px 5px 5px #000",
  },
}));

const ControllerCHST = ({ refSync }) => {
  const styles = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("CHST IS RENDER");
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(API_URL + "/game-content/CHST");
      setData(res.data);
    };
    fetchQuestion();
    refSync.current = fetchQuestion;
    //eslint-disable-next-line
  }, []);

  return <div className={styles.round}>{data && <Screen data={data} />}</div>;
};
export default ControllerCHST;

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import HTMLStringConvert from "components/HTMLStringConvert";

import { ExpandMore } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  header: {},
  details: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "10px",
  },
  detail: {
    padding: "10px",
    border: "1px solid black",
  },
  value: {
    borderRadius: "50%",
    border: "3px solid black",
    boxShadow: "1px 1px 1px black",
    padding: "5px",
    overflow: "visible",
    backgroundColor: "green",
    color: "white",
  },
  topic: {
    borderRadius: "10px",
    border: "3px solid black",
    boxShadow: "1px 1px 1px black",
    padding: "5px",
    textAlign: "center",
    overflow: "visible",
    backgroundColor: theme.palette.tertiary.main,
    fontWeight: "bold",
  },
  id: {
    borderRadius: "10px",
    border: "3px solid black",
    boxShadow: "1px 1px 1px black",
    padding: "5px",
    textAlign: "center",
    overflow: "visible",
    backgroundColor: "red",
    color: "white",
  },
  summaryPanel: {
    display: "grid",
    gridTemplateColumns: "33% 50% 10%",
    width: "100%",
    columnGap: "3%",
  },
}));

const QuestionCard = (props) => {
  const { data } = props;
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickAccordion = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Accordion expanded={open} onClick={handleClickAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={styles.summaryPanel}>
          <div className={styles.id}>{`Câu hỏi số ${data.id}`}</div>
          <div className={styles.topic}>{data.topic}</div>
          <div className={styles.value}>{data.value}</div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.details}>
          <div className={styles.detail}>
            <HTMLStringConvert string={data.question} />
          </div>
          <Typography className={styles.detail} style={{ fontWeight: "bold" }}>
            ĐÁP ÁN: <HTMLStringConvert string={data.ans} />
          </Typography>
          {data.url && (
            <Typography className={styles.detail} color="primary">
              URL: <HTMLStringConvert string={data.url} />
            </Typography>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionCard;

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { ExpandMore } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  header: {},
  details: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "10px",
    width: "100%",
  },
  detail: {
    padding: "10px",
  },
  type: {
    width: "fit-content",
    marginRight: "5px",
    borderRadius: "10px",
    border: "3px solid black",
    boxShadow: "1px 1px 1px black",
    padding: "10px 5px",
    backgroundColor: "green",
    color: "white",
  },
  topic: {
    width: "100%",
    marginRight: "10px",
    borderRadius: "10px",
    border: "3px solid black",
    boxShadow: "1px 1px 1px black",
    padding: "10px 5px",
    textAlign: "center",
    overflow: "visible",
    backgroundColor: theme.palette.tertiary.main,
    fontWeight: "bold",
  },
  id: {
    minWidth: "fit-content",
    marginRight: "10px",
    borderRadius: "10px",
    border: "3px solid black",
    boxShadow: "1px 1px 1px black",
    padding: "10px 5px",
    textAlign: "center",
    overflow: "visible",
    backgroundColor: "red",
    color: "white",
  },
  summaryPanel: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
}));

const QuestionCard = (props) => {
  const { data, id } = props;
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickAccordion = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Accordion
      xpanded=  {open}
      onClick={handleClickAccordion}
      style={{ height: "fit-content", borderRadius: "10px", margin: "0 25% 4% 5%", width: "90%"}}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={styles.summaryPanel}>
          <div className={styles.id}>{`Câu hỏi số ${id}`}</div>
          <div className={styles.topic}>{data.topic}</div>
          <div className={styles.type}>{data.type}</div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.details}>
          <Typography className={styles.detail}>{data.question}</Typography>
          <Typography
            className={styles.detail}
            style={{ fontWeight: "bold", borderTop: "1px solid black" }}
          >
            ĐÁP ÁN: {data.ans}
          </Typography>
          {data.url && (
            <Typography className={styles.detail} color="primary">
              URL: {data.url}
            </Typography>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionCard;

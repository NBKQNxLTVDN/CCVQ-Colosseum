import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import HTMLStringConvert from "components/HTMLStringConvert";
import { socket } from "service/socket";

const useStyles = makeStyles((theme) => ({
  contentQuestion: {
    animation: "6s ease 0s 1 normal none running flipInX",
  },
}));

const ContentQuestion = (props) => {
  const { question } = props;
  const [fontSize, setFontSize] = useState(40);

  useEffect(() => {
    socket.on("VD:changeFontSize", (data) => {
      if (data.action === "increase") {
        setFontSize((prevState) => prevState + 1);
      } else if (data.action === "decrease") {
        setFontSize((prevState) => prevState - 1);
      }
    });
    return () => {
      socket.off("VD:changeFontSize");
    };
    //eslint-disable-next-line
  }, []);

  const styles = useStyles();
  return (
    <div
      className={styles.contentQuestion}
      style={{ fontSize: `${fontSize}px` }}
    >
      <HTMLStringConvert string={question.question} />
    </div>
  );
};

export default ContentQuestion;

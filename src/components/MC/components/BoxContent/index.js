import React, { useState } from "react";
import HTMLStringConvert from "components/HTMLStringConvert";
import { makeStyles } from "@mui/styles";

const useStylesBoxContent = makeStyles((theme) => ({
  box: {
    padding: "5%",
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "#C4C4C4",
    boxShadow: "inset 5px 5px 5px #000000",
    textAlign: "start",
  },
  header: {
    backgroundColor: "#51AFC3",
    padding: "10px",
    margin: "0 10px 10px 0",
    border: "2px solid black",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px black",
    fontWeight: "bold",
    color: "white",
    width: "fit-content",
    display: "inline-block",
  },
}));

const BoxContent = ({
  header,
  content,
  defaultFontSize,
  padding,
  children,
}) => {
  const [fontSize, setFontSize] = useState(defaultFontSize || 17);

  const handleChangeSettings = (e) => {
    switch (e.keyCode) {
      case 38: {
        // arrowUp
        setFontSize(fontSize + 1);
        break;
      }
      case 40: {
        // arrowDown
        setFontSize(fontSize - 1);
        break;
      }
      default:
        break;
    }
  };

  const styles = useStylesBoxContent();
  return (
    <div
      className={styles.box}
      tabIndex="0"
      onKeyDown={handleChangeSettings}
      style={{ fontSize: `${fontSize}px`, padding: padding || "5%" }}
    >
      <span className={styles.header}>{header}</span>
      <span>{children || <HTMLStringConvert string={content} />}</span>
    </div>
  );
};

export default BoxContent;

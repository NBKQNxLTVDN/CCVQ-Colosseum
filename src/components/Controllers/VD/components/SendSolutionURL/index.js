import React, { useState } from "react";

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { socket } from "service/socket";

const useStylesSendSolution = makeStyles((theme) => ({
  button: {
    fontWeight: "bold",
    border: "1px solid black",
    backgroundColor: theme.palette.tertiary.main,
    boxShadow: "2px 2px 2px #000000",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.secondary.contrastText,
    },
    padding: "0 30px",
  },
}));

const SendSolution = ({ url, disabled, roundName = "VD" }) => {
  const styles = useStylesSendSolution();
  const [isShow, setIsShow] = useState(false);

  const handleSendSolution = () => {
    setIsShow(!isShow);
    if (isShow) {
      socket.emit("controller:talk", {
        receivers: ["viewer", "livestream", "scoreboard"],
        eventName: "ccvq:playVideo",
        data: {
          status: "close",
        },
      });
    } else {
      socket.emit("controller:talk", {
        receivers: ["viewer", "livestream", "scoreboard"],
        eventName: "ccvq:sendVideo",
        data: {
          autoPlay: true,
          type: "image",
          url: `data/${roundName}/${url}`,
        },
      });
    }
  };

  return (
    <Button
      className={styles.button}
      disabled={disabled}
      onClick={handleSendSolution}
    >
      {!isShow ? "Hiện" : "Ẩn"} đáp án
    </Button>
  );
};

export default SendSolution;

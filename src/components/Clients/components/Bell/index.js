import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";

import BellIcon from "../../assets/images/Bell.svg";
import NoBellIcon from "../../assets/images/NoBell.svg";

import { socket } from "service/socket";

const useStyles = makeStyles(() => ({
  container: {
    position: "fixed",
    right: "5%",
    top: "50%",
    transform: "translate(0,-40%)",
    zIndex: 10,
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    height: "40vh",
  },
}));

const Bell = ({ playerOrder }) => {
  const styles = useStyles();
  const [available, setAvailable] = useState(false);
  const [start, setStart] = useState(new Date());

  const ringBell = () => {
    let tmp = start ? new Date() - start : null;
    setAvailable(false);

    socket.emit("client:talk", {
      receivers: ["client", "controller", "mc", "viewer", "livestream"],
      eventName: "client:bell_signal",
      data: {
        order: parseInt(playerOrder),
        time: tmp / 1000,
      },
    });
  };

  useEffect(() => {
    socket.on("ccvq:bellStatus", (data) => {
      if (data.status === "open") {
        setAvailable(true);
        setStart(new Date());
      } else if (data.status === "block") {
        setAvailable(false);
      }
    });

    return () => {
      socket.off("ccvq:bellStatus");
    };
  }, []);

  return (
    <div className={styles.container} tabIndex={0}>
      {available ? (
        <img alt="bell" src={BellIcon} className={styles.icon} onClick={ringBell} />

      ) : (
        <img alt="bell" src={NoBellIcon} className={styles.icon} />
      )}
    </div>
  );
};

export default Bell;

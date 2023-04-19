import React, { useEffect } from "react";

//context
import { socket } from "service/socket";

import ViewerMc from "components/MC";
import { useConnectedSocket } from "hooks/connectedSocket";

const MC = () => {
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("ccvq:setName", {
        role: "mc",
        name: "mc",
        position: "mc",
      });
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  useConnectedSocket();

  return <ViewerMc />;
};

export default MC;

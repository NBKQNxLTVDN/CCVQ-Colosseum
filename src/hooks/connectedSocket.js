import { useContext, useEffect } from "react";
// import { NotificationContext } from "contexts/notification";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";

export const useConnectedSocket = () => {
  // const { showNoti } = useContext(NotificationContext);
  const { state, action } = useContext(MainContext);

  const setPlayerNameContext = (clients) => {
    clients.forEach((client) => {
      action.setPlayerName(client.order, client.name);
    });
  };

  useEffect(() => {
    socket.on("server:connectedData", (data) => {
      action.setConnections(data.users, data.viewer);
      setPlayerNameContext(data.scores);
      if (data.info)
        action.addLog("INFO", data.info.role, `${data.info.name} vừa kết nối`);
    });

    socket.on("server:disconnectedData", (data) => {
      // action.setConnections(data.socketRoom);
      // action.addLog(
      //   "ERROR",
      //   data.role,
      //   `${data.disconnectedSocketName} vừa ngắt kết nối, vui lòng kiểm tra lại!`
      // );
      // showNoti(
      //   "error",
      //   `[${data.role}] ${data.disconnectedSocketName} vừa ngắt kết nối, vui lòng kiểm tra lại!`
      // );
    });

    socket.on("ccvq:controllerReset", (data) => {
      if (data.status === "success") {
        window.location.reload();
      }
    });

    return () => {
      socket.off("server:connectedData");
      socket.off("server:disconnectedData");
      socket.off("ccvq:controllerReset");
    };
    // eslint-disable-next-line
  }, []);
};

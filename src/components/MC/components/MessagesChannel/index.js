import React, { useContext, useEffect } from "react";

import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import { ToastContainer, toast } from "react-toastify";

const containerStyle = {
  zIndex: 1999,
};

const MessagesChannel = () => {
  const context = useContext(MainContext);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      if (data.message === "ready") {
        toast.success(`${data.role} đã sẵn sàng`);
      } else if (data.message === "stop") {
        toast.error(`${data.name} ${data.role} chưa sẵn sàng`);
      } else {
        toast.success(
          `(${data.name}-${data.role} đã gửi 1 tin nhắn) ${data.message}`
        );
      }
    });
    return () => {
      socket.off("sendMessage");
    };
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <textarea
        value={context.state.logContent}
        readOnly
        style={{
          borderRadius: "20px",
          padding: "10px",
          boxShadow: "1px 1px 1px #000000",
          width: "100%",
          height: "100%",
          fontSize: "25px",
        }}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={containerStyle}
      />
    </>
  );
};

export default MessagesChannel;

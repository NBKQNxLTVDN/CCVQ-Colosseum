import React from "react";
const ConnectInput = (props) => {
  return (
    <div>{props.connection?.socket_id?.slice(0, 5) || "Chưa kết nối"}</div>
  );
};
export default ConnectInput;

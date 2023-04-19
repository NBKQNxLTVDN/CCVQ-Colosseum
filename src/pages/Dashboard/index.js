import React from "react";

const Dashboard = () => {
  //   const [mess, setMess] = useState();

  //   useEffect(() => {
  //     socket.on("connect", () => {
  //       socket.emit("ccvq:setName", {
  //         role: "dashboard",
  //         name: "dashboard",
  //         position: "dashboard",
  //       });
  //     });
  //   });

  //   socket.on("ccvq:BACKLOG", (data) => {
  //     // console.log(data);
  //     setMess((prevState) => ({ ...prevState, data: data }));
  //   });
  //   console.log(mess);
  return (
    <div>
      {/* {mess.map((mes, idx) => (
        <div>
          <div>{mes?.state}</div>
          <div>{mes?.receivers}</div>
          <div>{mes?.eventName}</div>
          <div>{mes?.data}</div>
        </div>
      ))} */}
      dashboard
    </div>
  );
};

export default Dashboard;

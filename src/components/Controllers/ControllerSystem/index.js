import React, { useContext } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import FileUploadForm from "./components/fileUploadForm";
import ConnectInputs from "./components/Connects";

const useStyles = makeStyles((theme) => ({
  round: {
    border: "1px solid black",
    borderRadius: 45,
    paddingBottom: "2%",
    boxShadow: "5px 5px 5px #000",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 30,
    height: "calc(100vh - 150px)",
  },
  systemConnection: {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "30px",
    margin: "20px",
    boxShadow: "3px 3px 3px #000000",
  },
  systemInputData: {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px 30px",
    margin: "20px",
    boxShadow: "3px 3px 3px #000000",
  },
  systemLog: {
    padding: "10px 10px",
    borderRadius: "5px",
    border: "1px solid black",
    boxShadow: "3px 3px 3px #000000",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  leftBlock: {
    display: "flex",
    flexDirection: "column",
  },
  exportBtn: {
    fontWeight: "bold",
    color: "white",
    "&:hover": {
      color: theme.palette.success.main,
    },
    boxShadow: "1px 1px 1px #000000",
  },
}));

const ControllerSystem = () => {
  const styles = useStyles();

  const { state, action } = useContext(MainContext);

  const { connections, logContent, nViewers } = state;

  const exportLog = () => {
    const element = document.createElement("a");
    const file = new Blob([logContent], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "log.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handlePlayAward = () => {
    socket.emit("controller:talk", {
      receivers: ["viewer", "livestream"],
      eventName: "controllerSystem:playSound",
      data: {},
    });
  };

  return (
    <div className={styles.round}>
      <div className={styles.leftBlock}>
        <div className={styles.systemConnection}>
          <h3>Kết nối</h3>
          <ConnectInputs connections={connections} />
          <p>
            Đang có{" "}
            {nViewers > 1 ? nViewers + " viewers" : nViewers + " viewer"} kết
            nối
          </p>
        </div>
        <div className={styles.systemInputData}>
          <FileUploadForm addLog={action.addLog} />
        </div>
        <div>
          <Button
            className={styles.exportBtn}
            onClick={exportLog}
            color="danger"
            variant="contained"
          >
            Export Log
          </Button>
          <div style={{ marginTop: "25px" }}>
            <Button
              className={styles.exportBtn}
              onClick={handlePlayAward}
              variant="contained"
              color="tertiary"
            >
              Chào mừng thí sinh
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.systemLog}>
        <h3>Log kiểm tra cài đặt:</h3>
        <textarea
          cols={100}
          rows={40}
          value={logContent}
          readOnly
          style={{
            marginTop: "20px",
            borderRadius: "5px",
            paddingLeft: "10px",
            paddingTop: "10px",
            boxShadow: "1px 1px 1px #000000",
            height: "93%",
          }}
        />
      </div>
    </div>
  );
};
export default ControllerSystem;

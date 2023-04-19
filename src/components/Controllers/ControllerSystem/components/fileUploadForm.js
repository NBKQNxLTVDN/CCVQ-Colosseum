import React, { useState, useContext } from "react";
import {
  useMediaQuery,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { MainContext } from "contexts/MainContext";
// import { menu } from "utils/const";

const SERVER_URL = process.env.REACT_APP_ADMIN_ENDPOINT;

// eslint-disable-next-line
const NUMBER_OF_FILES = 6;

const useStyles = makeStyles((theme) => ({
  round: {
    flexGrow: 12,
    marginRight: "1rem",
    border: "1px solid black",
    borderRadius: "5px",
    minHeight: "100wh",
    background: "#C4C4C4",
    paddingBottom: "2%",
  },
  roundDisplay: {
    justifyContent: "space-around",
    alignItems: "center",
    background: "#51AFC3",
    padding: "1%",
    margin: "1%",
    height: "100%",
  },
}));

const FileUploadForm = () => {
  const props = {
    isMobile: !useMediaQuery("(minwidth:768px)"),
  };
  const styles = useStyles(props);

  const context = useContext(MainContext);

  const [gameContentFiles, setGameContentFiles] = useState([]);

  const uploadFileHandler = (e) => {
    setGameContentFiles(e.target.files);
  };

  const uploadGameContent = async () => {
    let temp = gameContentFiles;
    const formData = new FormData();
    for (let i = 0; i < temp.length; i++) {
      const file = temp[i];
      formData.append(file.name, file);
    }
    let url = SERVER_URL + "/upload-game-content";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    context.action.addLog("INFO", res.log);
  };

  return (
    <div>
      <Typography variant="h5">Nhập dữ liệu đề thi</Typography>
      <div className={styles.inputControl}>
        <label className="input-data-label">
          Nạp đề thi:{" "}
          <input
            className="gamesContentFiles"
            type="file"
            accept=".json"
            onChange={uploadFileHandler}
            multiple
          />
        </label>
      </div>
      <Button onClick={uploadGameContent} className={styles.uploadButton}>
        XÁC NHẬN
      </Button>
    </div>
  );
};
export default FileUploadForm;

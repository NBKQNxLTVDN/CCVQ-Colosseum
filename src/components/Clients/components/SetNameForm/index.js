import React, { useState, useContext } from "react";
import { socket } from "service/socket";
import { NotificationContext } from "contexts/notification";
import { TextField, Button, InputAdornment } from "@mui/material";

import Adornment from "../../assets/images/Asset 10.svg";

const SetNameForm = (props) => {
  const { showForm, setShowForm, updatePlayerOrder } = props;

  const notification = useContext(NotificationContext);
  const [playerName, setPlayerName] = useState("");
  const [playerOrder, setPlayerOrder] = useState("");

  const handleChangeName = (e) => {
    setPlayerName(e.target.value.toUpperCase());
  };

  const handleChangeOrder = (e) => {
    setPlayerOrder(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(true);
    socket.emit("ccvq:setName", {
      role: "client",
      name: playerName,
      position: playerOrder,
    });
    updatePlayerOrder(playerOrder);
    notification.closeNoti({ reload: false });
  };

  return (
    <React.Fragment>
      {showForm && (
        <div className="form-name">
          <form className="form-group" onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <div className="label">
                <TextField
                  type="text"
                  value={playerName}
                  onChange={handleChangeName}
                  title="Player Name"
                  placeholder="Tên người chơi"
                  required
                  variant="outlined"
                  style={{
                    marginBottom: "50px",
                    width: "75%",
                    borderRadius: 15,
                  }}
                  fullWidth
                  inputProps={{
                    style: {
                      textAlign: "center",
                    },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: 15,
                      border: "3px solid #001328",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          alt="adornment"
                          src={Adornment}
                          style={{ height: 40, width: 30 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="label">
                <TextField
                  type="number"
                  min="1"
                  max="4"
                  value={playerOrder}
                  onChange={handleChangeOrder}
                  title="Player Order"
                  placeholder="Thứ tự người chơi"
                  required
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    style: {
                      textAlign: "center",
                    },
                  }}
                  InputProps={{
                    style: {
                      border: "3px solid #001328",
                      backgroundColor: "white",
                      borderRadius: 15,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          alt="adornment"
                          src={Adornment}
                          style={{ height: 40, width: 30 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  style={{
                    width: "75%",
                    marginBottom: 20,
                  }}
                />
              </div>
            </div>
            <Button
              type="submit"
              value="Submit"
              style={{
                backgroundColor: "#001328",
                border: "3px solid white",
                height: "fit-content",
              }}
              sx={{
                fontFamily: "'Sigmar One', cursive",
                color: "#fff",
                fontWeight: 400,
                fontStretch: "normal",
                fontSize: "30px !important",
                margin: 0,
                padding: "0 10px",
                borderRadius: "15px",
              }}
            >
              ready
            </Button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default SetNameForm;

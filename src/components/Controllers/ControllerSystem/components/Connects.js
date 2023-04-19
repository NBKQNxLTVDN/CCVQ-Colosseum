import React, { Component } from "react";
// import ConnectInput from "./ConnectInput";

class ConnectInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateConnectionData = this.updateConnectionData.bind(this);
  }
  updateConnectionData(e) {
    // TODO - handle update connection data
  }
  render() {
    let { connections } = this.props;
    let clients = [
      "client1",
      "client2",
      "client3",
      "client4",
      "mc",
      "controller",
      "livestream",
    ];
    return (
      <React.Fragment>
        <table
          className="connection-control"
          style={{
            listStyleType: "none",
            textAlign: "start",
            width: "100%",
          }}
        >
          {/* {clients.map((client, idx) => {
            return client.toUpperCase() +
              " :[" +
              connections.filter((c) => c.role === client) ? (
              <div key={idx} className="control-input__element">
                {client.toUpperCase()} :{" "}
                {connections
                  .filter((c) => c.role === client)[0]
                  .socket_id?.slice(0, 5) || "Chưa kết nối"}
              </div>
            ) : (
              (
                <ConnectInput
                  key={idx}
                  connection={null}
                  handleValueChange={this.updateConnectionData}
                />
              ) + "]"
            );
          })} */}
          {connections.length > 0 ? (
            clients.map((client) => (
              <tr key={client}>
                <td>{client.toUpperCase()}</td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  [
                  {Object(connections)
                    .filter((c) => c.role === client)[0]
                    ?.socket_id.slice(0, 6) || "NOT CONNECTED"}
                  ]
                </td>
              </tr>
            ))
          ) : (
            <thead>
              <tr>
                <td>
                  OPEN SERVER{" ["}
                  {`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`}
                  {"] "}
                  PLEASE
                </td>
              </tr>
            </thead>
          )}
        </table>
        {/* TODO - Set up button to edit and update team name*/}
      </React.Fragment>
    );
  }
}

export default ConnectInputs;

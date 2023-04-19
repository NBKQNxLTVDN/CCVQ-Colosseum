import React, { useContext, useEffect } from "react";

import * as Controller from "./controller";
import * as Viewer from "./viewer";
import * as Client from "./client";
import * as MC from "./mc";
import { MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import { Redirect, Route, Switch } from "react-router-dom";

const Routes = () => {
  const { action } = useContext(MainContext);

  useEffect(() => {
    socket.on("ccvq:updateScore", (data) => {
      if (data.order) {
        const { order, score } = data;
        action.setEachPlayerScore(order, score);
      } else action.setPlayersScore(data.players);
    });

    return () => {
      socket.off("ccvq:updateScore");
    };

    //eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route
        path={Controller.ROUTE_CONTROLLER.path}
        element={Controller.ROUTE_CONTROLLER.component}
      >
        <Route
          path={Controller.ROUTE_CONTROLLER_SCOREBOARD.path}
          element={Controller.ROUTE_CONTROLLER_SCOREBOARD.component}
        />
        {Controller.ROUTE_ROUNDS.map((route) => (
          <Route path={`/${route.id}`} element={route.component} />
        ))}
      </Route>
    </Routes>
  );
};

export default Routes;

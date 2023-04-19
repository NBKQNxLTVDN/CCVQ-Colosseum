import React, { useContext, useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@mui/styles";
import vendorPrefixer from "jss-plugin-vendor-prefixer";

import theme from "utils/theme";
import history from "utils/history";
import store from "store";
import { NotificationProvider } from "contexts/notification";
import { MainProvider, MainContext } from "contexts/MainContext";
import { socket } from "service/socket";
import { SoundProvider } from "contexts/sound";

// import NotFound from 'views/not-found';
import Notification from "components/notification";

import Viewer from "pages/Viewer";
import Controller from "pages/Controller";
import MC from "pages/MC";
import Dashboard from "pages/Dashboard";
import Info from "./pages/Info";
import Scoreboard from "./pages/Scoreboard";
import Livestream from "pages/Livestream";

import Clients from "components/Clients";

import Animation from "./animations";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

const jss = create({
  plugins: [...jssPreset().plugins, vendorPrefixer()],
});

const App = () => {
  const maximizableElement = React.useRef(null);
  useEffect(() => {
    if (!document.fullscreenElement && document.fullscreenEnabled) {
      const res = maximizableElement.current
        .requestFullscreen({ navigationUI: "hide" })
        .catch((err) => {
          console.log(err);
        });
      console.log(res);
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <Provider store={store}>
      <NotificationProvider>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <div
              style={{ textAlign: "center", position: "relative" }}
              ref={maximizableElement}
            >
              <Notification />
              <ConnectedRouter history={history}>
                <MainProvider>
                  <SoundProvider>
                    <Pages />
                  </SoundProvider>
                </MainProvider>
              </ConnectedRouter>
            </div>
          </ThemeProvider>
        </StylesProvider>
      </NotificationProvider>
    </Provider>
  );
};

const Pages = () => {
  const { action } = useContext(MainContext);

  useEffect(() => {
    socket.on("ccvq:updateScore", (data) => {
      action.setPlayersScore(data.players);
    });

    return () => {
      socket.off("ccvq:updateScore");
    };

    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/viewer" replace />}></Route>
        <Route path="/controller" element={<Controller />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/client" element={<Clients />} />
        <Route path="/MC" element={<MC />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/animations" element={<Animation />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/livestream" element={<Livestream />} />
        <Route element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React, { useEffect, useState } from "react";

import { socket } from "service/socket";
import PlaygroundScreen from "./containers/PlaygroundScreen";
import SetQuestionsScreen from "./containers/SetQuestionsScreen";
import WaitingScreen from "./containers/WaitingScreen";

let timeout = null;

const ViewerST = () => {
  const [screen, setScreen] = useState("waitingScreen");
  const [player, setPlayer] = useState(null);
  const [field, setField] = useState(null);
  const [review, setReview] = useState(null);
  const [display, setDisplay] = useState(false);

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    socket.on("CHST:init_data", (data) => {
      setDisplay(false);
      setPlayer(parseInt(data.player));
      setField(data.field);
      setReview(data.review);
      setScreen("chooseScore");
      setDisplay(true);
    });

    socket.on("CHST:swap_screen", (data) => {
      setScreen(data.screen);
    });

    socket.on("CHST:status", (data) => {
      if (data.status === "end" && display) {
        setIsEnd(true);
        timeout = setTimeout(() => {
          setScreen("waiting");
        }, 2000);
        return () => {
          clearTimeout(timeout);
        };
      }
    });

    return () => {
      socket.off("CHST:init_data");
      socket.off("CHST:start");
      socket.off("CHST:status");
    };
    //eslint-disable-next-line
  });

  if (display) {
    switch (screen) {
      case "waiting":
        return <WaitingScreen isEnd={isEnd} />;

      case "chooseScore":
        return (
          <SetQuestionsScreen player={player} field={field} review={review} />
        );

      case "question":
        return <PlaygroundScreen playerOrder={player} field={field} />;

      default:
        return null;
    }
  } else return <WaitingScreen isEnd={isEnd} />;
};

export default ViewerST;

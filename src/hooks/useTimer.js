import { useState, useEffect } from "react";

import { socket } from "service/socket";

export const useTimer = ({ step } = { step: 100 }) => {
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(true);
  const [milliseconds, setMilliseconds] = useState(0);
  const [timer, setTimer] = useState(0);

  //test
  const [start, setStart] = useState(new Date().getTime());

  useEffect(() => {
    socket.on("ccvq:setTime", (data) => {
      setMilliseconds(data.seconds * 1000);
      setTime(data.seconds * 1000);
      setTimer(data.seconds * 1000);
    });
    socket.on("ccvq:timeState", (data) => {
      if (data.status === "pause" || data.status === "timeout") {
        setPause(true);
      }
      if (data.status === "start") {
        setPause(false);
        setStart(new Date().getTime());
      }
    });

    return () => {
      socket.off("ccvq:setTime");
      socket.off("ccvq:timeState");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!pause) {
      const timerInterval = setTimeout(() => {
        if (milliseconds > 0) {
          setMilliseconds(milliseconds - step);
        } else {
          clearTimeout(timerInterval);
        }
      }, step);
      return () => {
        clearTimeout(timerInterval);
      };
    }
    //eslint-disable-next-line
  }, [pause, milliseconds]);

  useEffect(() => {
    if (Date.now() - start <= time && time !== milliseconds) {
      const _timer = Date.now() - start;
      setTimer(time - _timer);
    }
    //eslint-disable-next-line
  }, [milliseconds]);

  // useEffect(() => {
  //   if (parseInt((timer / 1000).toString().split(".")[0]) === 0) {
  //     socket.emit("controller:talk", {
  //       receivers: ["controller", "client"],
  //       eventName: "ccvq:timeState",
  //       data: {
  //         status: "timeout",
  //       },
  //     });
  //   }
  //   //eslint-disable-next-line
  // }, [timer]);

  return {
    timer,
    pause,
    time,
  };
};

export const useTimeProcessing = (
  { step, isTimer } = { step: 100, isTimer: false }
) => {
  const [duration, setDuration] = useState(null);
  const [milliseconds, setMilliseconds] = useState(0);

  const [isPause, setIsPause] = useState(true);

  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(new Date());

  const handleReset = () => {
    setTimer(0);
    setMilliseconds(duration);
    setStart(new Date().getTime() - 0);
    if (isTimer) {
      socket.emit("controller:talk", {
        receivers: ["viewer", "livestream", "mc", "client"],
        eventName: "ccvq:timeState",
        data: {
          status: "reset",
        },
      });
    }
  };

  const handleOnStart = (value) => {
    if (value) {
      setIsPause(true);
      setDuration(value * 1000);
      setTimer(0);
      setStart(new Date().getTime() - 0);
      setIsPause(false);
      if (isTimer) {
        socket.emit("controller:talk", {
          receivers: ["viewer", "livestream", "mc", "client"],
          eventName: "ccvq:timeState",
          data: {
            status: "start",
          },
        });
      }
      return;
    }

    if (duration && duration > 0) {
      setIsPause(true);
      setStart(new Date().getTime() - timer);
      setIsPause(false);
    }
  };

  const handleOnPause = () => {
    if (isTimer) {
      socket.emit("controller:talk", {
        receivers: ["viewer", "livestream", "mc", "client"],
        eventName: "ccvq:timeState",
        data: {
          status: "pause",
        },
      });
    }
    setIsPause(true);
  };

  useEffect(() => {
    if (duration > 0) {
      setMilliseconds(duration);
    }
  }, [duration]);

  useEffect(() => {
    if (!isPause) {
      const timerInterval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds(milliseconds - step);
        } else {
          setIsPause(true);
        }
      }, step);
      return () => {
        clearInterval(timerInterval);
      };
    }
    //eslint-disable-next-line
  }, [isPause, milliseconds]);

  useEffect(() => {
    if (Date.now() - start <= duration && duration !== milliseconds) {
      const _timer = Date.now() - start;
      if (Math.round((_timer / duration) * 100) >= 99) {
        setIsPause(true);
      }
      setTimer(_timer);
    }
    //eslint-disable-next-line
  }, [milliseconds]);

  return {
    duration, //milliseconds
    setDuration,
    timer, //milliseconds
    isPause,
    handleReset,
    handleOnPause,
    handleOnStart,
  };
};

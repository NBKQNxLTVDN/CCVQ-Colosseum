import { socket } from "service/socket";

export function createStorage(key) {
  const store = JSON.parse(JSON.localStorage.get(key)) ?? {};

  const save = () => {
    localStorage.setItem(key, JSON.stringify(store));
  };

  const storage = {
    get(key) {
      return store[key];
    },
    set(key, value) {
      store[key] = value;
      save();
    },
    remove(key) {
      delete store[key];
      save();
    },
  };

  return storage;
}

export function createLogger(namespace) {
  function logger(message) {
    if (namespace === "INFO") {
      console.log(`[${namespace}]: ${message}`);
    }
    if (namespace === "WARNING") {
      console.warn(`[${namespace}]: ${message}`);
    }
    if (namespace === "ERROR") {
      console.error(`==>[${namespace}]: ${message}`);
    }
  }
  return logger;
}

export const getTime = (time) => {
  let m = "" + parseInt(time / 60),
    s = "" + Math.round(time % 60);
  while (m.length < 2) m = "0" + m;
  while (s.length < 2) s = "0" + s;
  return m + ":" + s;
};

export const controllerEmitData = (receivers, eventName, data) => {
  socket.emit("controller:talk", { receivers, eventName, data });
};

export const controllerEmitDataToAll = (eventName, data) => {
  socket.emit("controller:talk", {
    receivers: ["controller", "viewer", "livestream", "mc", "client"],
    eventName,
    data,
  });
};

export const clientEmitData = (receivers, eventName, data) => {
  socket.emit("client:talk", { receivers, eventName, data });
};

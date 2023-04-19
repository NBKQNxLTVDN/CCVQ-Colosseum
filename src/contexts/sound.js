import React, { useState } from "react";

const SoundContext = React.createContext();

const SoundProvider = ({ children }) => {
  const [volume, setVolume] = useState(75);

  const action = {
    handleChangeVolume: (volume) => {
      setVolume(volume);
    },
  };

  return (
    <SoundContext.Provider value={{ volume: volume, action: action }}>
      {children}
    </SoundContext.Provider>
  );
};

export { SoundContext, SoundProvider };

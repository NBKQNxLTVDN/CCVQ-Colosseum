import React from "react";

const ViewerWaitingScreen = () => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/cover.png`}
      alt="background"
      style={{
        height: "100%",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
  );
};

export default ViewerWaitingScreen;

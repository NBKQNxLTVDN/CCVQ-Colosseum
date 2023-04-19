import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [data, setData] = useState({
    type: "default",
    isOpen: false,
    props: [],
  });

  /**
   *
   * @param {string} type
   * shows notification
   */
  const showNoti = (type, ...props) => {
    setData({
      type,
      isOpen: true,
      props,
    });
  };

  /**
   * Closes notification
   */
  const closeNoti = ({ reload = true }) => {
    setData({
      ...data,
      type: "",
      isOpen: false,
      props: [],
    });
    if (document.location.pathname === "/client" && reload) {
      window.open("client", "_self", "");
      window.close();
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notification: data, showNoti, closeNoti }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

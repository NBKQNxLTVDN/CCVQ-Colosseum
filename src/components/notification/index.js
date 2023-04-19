import React, { useContext } from "react";

import { NotificationContext } from "contexts/notification";
import Default from "./default";
import Confirm from "./confirm";
import Error from "./error";

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  switch (notification.type) {
    case "default":
      return <Default />;
    case "confirm":
      return <Confirm />;
    case "error":
      return <Error />;
    default:
      return <></>;
  }
};

export default Notification;

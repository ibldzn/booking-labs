import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationProps {
  type?: NotificationType;
  message: string;
  onClose: () => void;
}

export const Notification = ({
  type = "info",
  message,
  onClose,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      closeNotification();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const closeNotification = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const closeIcon = (
    <FontAwesomeIcon
      icon={faTimesCircle}
      onClick={closeNotification}
      className="text-red-500 cursor-pointer"
    />
  );

  const iconText = {
    success: (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
        <span>Success</span>
      </div>
    ),
    info: (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
        <span>Info</span>
      </div>
    ),
    warning: (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-yellow-500"
        />
        <span>Warning</span>
      </div>
    ),
    error: (
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />
        <span>Error</span>
      </div>
    ),
  };

  return (
    <div
      className={`fixed top-0 right-0 mt-8 mr-8 bg-gray-800 text-white rounded-lg transform transition-transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
          {iconText[type]}
          {closeIcon}
        </div>
        <div className="flex items-center justify-between p-4">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;

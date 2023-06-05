import { useParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useDevice } from "./hooks";
import { DeviceDetails } from "../../components";
import type { FC } from "react";

const DeviceDetailsPage: FC = () => {
  const { deviceId } = useParams();
  const { isLoading, device, users } = useDevice(Number(deviceId));

  useSetTitle("Device details");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink device",
        payload: { type: "unlink", deviceId },
      }],
    });
  }, [deviceId]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <DeviceDetails device={device} users={users} />
  );
};

export { DeviceDetailsPage };

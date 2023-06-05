import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner, useDeskproElements } from "@deskpro/app-sdk";
import { useDevices } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";
import type { Device } from "../../services/simple-mdm/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, devices } = useDevices();

  const onNavigateToLink = useCallback(() => navigate("/link"), [navigate]);

  const onNavigateToDevice = useCallback((deviceId: Device["id"]) => {
    navigate(`/device/${deviceId}`);
  }, [navigate]);

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements()
    registerElement("refresh", { type: "refresh_button" });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      devices={devices}
      onNavigateToLink={onNavigateToLink}
      onNavigateToDevice={onNavigateToDevice}
    />
  );
};

export { HomePage };

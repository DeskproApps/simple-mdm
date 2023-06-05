import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useDevices } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, devices } = useDevices();

  const onNavigateToLink = useCallback(() => navigate("/link"), [navigate]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      devices={devices}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { HomePage };

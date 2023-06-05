import { LinkedDevices } from "./LinkedDevices";
import type { FC } from "react";
import type { Device } from "../../services/simple-mdm/types";

type Props = {
  devices: Device[],
  onNavigateToLink: () => void,
  onNavigateToDevice: (deviceId: Device["id"]) => void,
};

const Home: FC<Props> = ({ devices, onNavigateToLink, onNavigateToDevice }) => {
  return (
    <>
      <LinkedDevices
        devices={devices}
        onNavigateToLink={onNavigateToLink}
        onNavigateToDevice={onNavigateToDevice}
      />
    </>
  )
};

export { Home };

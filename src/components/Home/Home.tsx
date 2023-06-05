import { LinkedDevices } from "./LinkedDevices";
import type { FC } from "react";
import type { Device } from "../../services/simple-mdm/types";

type Props = {
  devices: Device[],
  onNavigateToLink: () => void,
};

const Home: FC<Props> = ({ devices, onNavigateToLink }) => {
  return (
    <>
      <LinkedDevices
        devices={devices}
        onNavigateToLink={onNavigateToLink}
      />
    </>
  )
};

export { Home };

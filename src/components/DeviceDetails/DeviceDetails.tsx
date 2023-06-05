import { Info } from "./Info";
import { Enrollment } from "./Enrollment";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Device, DeviceUser } from "../../services/simple-mdm/types";

type Props = {
  device: Maybe<Device>,
  users: DeviceUser[];
};

const DeviceDetails: FC<Props> = ({ device, users }) => {
  return (
    <>
      <Info device={device} users={users} />
      <Enrollment device={device} />
    </>
  );
};

export { DeviceDetails };

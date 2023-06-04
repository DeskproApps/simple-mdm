import size from "lodash/size";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { NoFound, Container } from "../common";
import { DeviceItem } from "../DeviceItem";
import type { FC } from "react";
import type { Device } from "../../services/simple-mdm/types";

type Props = {
  devices: Device[],
  onNavigateToLink: () => void,
};

const LinkedDevices: FC<Props> = ({ devices, onNavigateToLink }) => {
  return (
    <>
      <Container>
        <Title
          title={`Linked devices (${size(devices)})`}
          onClick={onNavigateToLink}
        />

        {!Array.isArray(devices)
          ? <NoFound/>
          : !size(devices)
            ? <NoFound text="No device(s) found"/>
            : devices.map((device) => (
              <DeviceItem key={device.id} device={device}/>
            ))
        }
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { LinkedDevices };

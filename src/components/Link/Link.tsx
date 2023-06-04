import { HorizontalDivider } from "@deskpro/app-sdk";
import { Search, Container } from "../common";
import { DeviceGroups } from "./DeviceGroups";
import { Controls } from "./Controls";
import { Devices } from "./Devices";
import type { FC, Dispatch } from "react";
import type { Props as SearchProps } from "../common/Search";
import type { Device, DeviceGroup } from "../../services/simple-mdm/types";

type Props = {
  search: string,
  onChangeSearch: SearchProps["onChange"],
  onClearSearch: SearchProps["onClear"],
  deviceGroups: DeviceGroup[],
  selectedDeviceGroup: "any"|DeviceGroup["id"],
  onChangeDeviceGroup: Dispatch<"any"|DeviceGroup["id"]>,
  selectedDevices: Device[],
  isSubmitting: boolean,
  onLinkDevices: () => void,
  onCancel: () => void,
  onChangeSelectedDevices: (device: Device) => void,
  devices: Device[],
  isLoading: boolean,
};

const Link: FC<Props> = ({
  search,
  onChangeSearch,
  onClearSearch,
  deviceGroups,
  selectedDeviceGroup,
  onChangeDeviceGroup,
  onLinkDevices,
  selectedDevices,
  isSubmitting,
  onCancel,
  onChangeSelectedDevices,
  devices,
  isLoading,
}) => {
  return (
    <>
      <Container>
        <Search
          value={search}
          onChange={onChangeSearch}
          onClear={onClearSearch}
        />
        <DeviceGroups
          value={selectedDeviceGroup}
          onChange={(o) => onChangeDeviceGroup(o.value)}
          deviceGroups={deviceGroups}
        />
        <Controls
          onCancel={onCancel}
          onLinkDevices={onLinkDevices}
          isSubmitting={isSubmitting}
          selectedDevices={selectedDevices}
        />
      </Container>

      <HorizontalDivider />

      <Container>
        <Devices
          devices={devices}
          isLoading={isLoading}
          selectedDevices={selectedDevices}
          onChangeSelectedDevices={onChangeSelectedDevices}
        />
      </Container>
    </>
  );
};

export { Link };

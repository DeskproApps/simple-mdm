import { HorizontalDivider } from "@deskpro/app-sdk";
import { getOption } from "../../utils";
import { Search, Container } from "../common";
import { DeviceGroup } from "./DeviceGroup";
import { Controls } from "./Controls";
import { Devices } from "./Devices";
import type { FC, Dispatch } from "react";
import type { Props as SearchProps } from "../common/Search";

type Props = {
  search: string,
  onChangeSearch: SearchProps["onChange"],
  onClearSearch: SearchProps["onClear"],
  // eslint-disable-next-line
  deviceGroups: any[],
  // eslint-disable-next-line
  selectedDeviceGroup: any,
  // eslint-disable-next-line
  onChangeDeviceGroup: Dispatch<any>,
  // eslint-disable-next-line
  selectedDevices: any[],
  isSubmitting: boolean,
  onLinkDevices: () => void,
  onCancel: () => void,
  // eslint-disable-next-line
  onChangeSelectedDevices: (device: any) => void,
  // eslint-disable-next-line
  devices: any[],
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
}) => {
  return (
    <>
      <Container>
        <Search
          value={search}
          onChange={onChangeSearch}
          onClear={onClearSearch}
        />
        <DeviceGroup
          value={selectedDeviceGroup}
          onChange={(o) => onChangeDeviceGroup(o.value)}
          options={deviceGroups.map(({ id, name }) => getOption(id, name))}
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
          isLoading={false}
          selectedDevices={selectedDevices}
          onChangeSelectedDevices={onChangeSelectedDevices}
        />
      </Container>
    </>
  );
};

export { Link };

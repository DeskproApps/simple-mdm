import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import {
  getDeviceService,
  getDeviceUsersService,
} from "../../services/simple-mdm";
import type { Maybe } from "../../types";
import type { Device, DeviceUser } from "../../services/simple-mdm/types";

type UseDevice = (deviceId?: Device["id"]) => {
  isLoading: boolean;
  device: Maybe<Device>;
  users: DeviceUser[];
};

const useDevice: UseDevice = (deviceId) => {
  const device = useQueryWithClient(
    [QueryKey.DEVICE, deviceId as unknown as string],
    (client) => getDeviceService(client, deviceId as Device["id"]),
    { enabled: Boolean(deviceId) },
  );

  const users = useQueryWithClient(
    [QueryKey.DEVICE_USERS, deviceId as unknown as string],
    (client) => getDeviceUsersService(client, deviceId as Device["id"]),
    {
      enabled: Boolean(deviceId),
      useErrorBoundary: false,
    },
  );

  return {
    isLoading: [device, users].some(({ isLoading }) => isLoading),
    device: get(device, ["data", "data"], null),
    users: get(users, ["data", "data"], []) || [],
  };
};

export { useDevice };

import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Device, DeviceUser } from "./types";

const getDeviceUsersService = (
  client: IDeskproClient,
  deviceId: Device["id"],
) => {
  return baseRequest<DeviceUser[]>(client, {
    url: `/devices/${deviceId}/users`,
  });
};

export { getDeviceUsersService };

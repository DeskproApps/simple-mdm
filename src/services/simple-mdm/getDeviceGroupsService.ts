import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { DeviceGroup } from "./types";

const getDeviceGroupsService = (client: IDeskproClient) => {
  return baseRequest<DeviceGroup[]>(client, {
    url: `/device_groups`,
  });
};

export { getDeviceGroupsService };

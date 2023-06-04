import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Device } from "./types";

const getDeviceService = (client: IDeskproClient, deviceId: Device["id"]) => {
  return baseRequest<Device>(client, {
    url: `/devices/${deviceId}`,
  });
};

export { getDeviceService };

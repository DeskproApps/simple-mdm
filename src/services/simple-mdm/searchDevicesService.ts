import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Device } from "./types";

const searchDevicesService = (client: IDeskproClient, q: string) => {
  return baseRequest<Device[]>(client, {
    url: `/devices`,
    queryParams: {
      search: q,
    },
  });
};

export { searchDevicesService };

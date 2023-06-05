import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import { searchDevicesService, getDeviceGroupsService } from "../../services/simple-mdm";
import { debouncePromise } from "../../utils";
import type { Device, DeviceGroup } from "../../services/simple-mdm/types";

type UseSearch = (q: string) => {
  isLoading: boolean,
  devices: Device[],
  deviceGroups: DeviceGroup[],
};

const useSearch: UseSearch = (q) => {
  const debounceSearch = debouncePromise(searchDevicesService, 1000);

  const devices = useQueryWithClient(
    [QueryKey.SEARCH_DEVICES, q],
    (client) => debounceSearch(client, q),
    {
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
      enabled: Boolean(q),
    },
  );

  const deviceGroups = useQueryWithClient(
    [QueryKey.DEVICE_GROUPS],
    (client) => getDeviceGroupsService(client),
  );

  return {
    isLoading: [devices].some(({ isFetching }) => isFetching),
    devices: get(devices, ["data", "data"], []) || [],
    deviceGroups: get(deviceGroups, ["data", "data"], []) || [],
  };
};

export { useSearch };

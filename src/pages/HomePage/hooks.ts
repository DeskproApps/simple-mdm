import get from "lodash/get";
import size from "lodash/size";
import { useMemo } from "react";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import { getEntityListService } from "../../services/deskpro";
import { getDeviceService } from "../../services/simple-mdm";
import { useQueriesWithClient } from "../../hooks";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { UserContext } from "../../types";
import type { Device } from "../../services/simple-mdm/types";

type UseDevices = () => {
  isLoading: boolean;
  devices: Device[];
};

const useDevices: UseDevices = () => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_DEVICES],
    (client) => getEntityListService(client, dpUserId),
    { enabled: Boolean(dpUserId) }
  );

  const devices = useQueriesWithClient((get(linkedIds, ["data"], []) || []).map((deviceId) => ({
    queryKey: [QueryKey.DEVICE, deviceId],
    queryFn: (client: IDeskproClient) => getDeviceService(client, Number(deviceId)),
    enabled: Boolean(size(linkedIds)),
    useErrorBoundary: false,
  })));

  return {
    isLoading: false,
    devices: devices.map(({ data }) => get(data, ["data"])).filter(Boolean) as Device[],
  };
};

export { useDevices };

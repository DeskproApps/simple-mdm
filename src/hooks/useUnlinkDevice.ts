import { useState, useCallback, useMemo } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import type { UserContext } from "../types";
import type { Device } from "../services/simple-mdm/types";

type UseUnlinkDevice = () => {
  isLoading: boolean,
  unlinkDevice: (deviceId?: Device["id"]) => void,
};

const useUnlinkDevice: UseUnlinkDevice = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const unlinkDevice = useCallback((deviceId?: Device["id"]) => {
    if (!client || !deviceId) {
      return;
    }

    setIsLoading(true);

    Promise
      .all([
        deleteEntityService(client, dpUserId, deviceId),
      ])
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      });
  }, [client, dpUserId, navigate]);

  return { isLoading, unlinkDevice }
};

export { useUnlinkDevice };

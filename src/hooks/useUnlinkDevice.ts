import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import { useAsyncError } from "../hooks";
import type { UserContext } from "../types";
import type { Device } from "../services/simple-mdm/types";

export type Result = {
  isLoading: boolean,
  unlinkDevice: (deviceId?: Device["id"]) => void,
};

const useUnlinkDevice = (): Result => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dpUserId = context.data?.user.id;

  const unlinkDevice = useCallback((deviceId?: Device["id"]) => {
    if (!client || !deviceId || !dpUserId) {
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
      })
      .catch(asyncErrorHandler);
  }, [client, dpUserId, navigate, asyncErrorHandler]);

  return { isLoading, unlinkDevice }
};

export { useUnlinkDevice };

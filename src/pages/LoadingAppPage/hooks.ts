import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getCurrentAccountService } from "../../services/simple-mdm";
import { useAsyncError } from "../../hooks";
import type { UserContext } from "../../types";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (!dpUserId) {
      return;
    }

    getCurrentAccountService(client)
      .then(() => getEntityListService(client, dpUserId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/link"))
      .catch(asyncErrorHandler)
  }, [navigate, dpUserId, asyncErrorHandler]);
};

export { useCheckIsAuth };

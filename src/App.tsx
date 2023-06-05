import get from "lodash/get";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { isNavigatePayload } from "./utils";
import { useUnlinkDevice } from "./hooks";
import {
  HomePage,
  LinkPage,
  LoadingAppPage,
  DeviceDetailsPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { unlinkDevice, isLoading: isLoadingUnlink } = useUnlinkDevice();

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .with("unlink", () => unlinkDevice(get(payload, ["deviceId"])))
      .run();
  }, 500);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoadingUnlink) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/link" element={<LinkPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/device/:deviceId" element={<DeviceDetailsPage/>} />
        <Route index element={<LoadingAppPage/>} />
      </Routes>
      <br/><br/><br/>
    </>
  );
}

export { App };

import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  // LoadingSpinner,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { isNavigatePayload } from "./utils";
import {
  HomePage,
  LinkPage,
  LoadingAppPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    match(payload.type)
      .with("changePage", () => {
        if (isNavigatePayload(payload)) {
          navigate(payload.path);
        }
      })
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  // if (!client) {
  //   return (
  //     <LoadingSpinner/>
  //   );
  // }

  return (
    <>
      <Routes>
        <Route path="/link" element={<LinkPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route index element={<LoadingAppPage/>} />
      </Routes>
      <br/><br/><br/>
    </>
  );
}

export { App };

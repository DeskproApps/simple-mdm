import type { To, ParamKeyValuePair } from "react-router-dom";
import type {
  Context,
  IDeskproClient,
  DropdownValueType,
} from "@deskpro/app-sdk";
import type { Device } from "./services/simple-mdm/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** The date, in the format "yyyy-mm-dd" */
export type DateType = string;

/** Request types */
export type ApiRequestMethod = "GET";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  headers?: Dict<string>,
  queryParams?: string|Dict<string>|ParamKeyValuePair[],
};

export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Promise<{ data: T, has_more: boolean }>;

/** Deskpro types */
export type DeskproUser = {
  emails: string[],
  firstName: string,
  id: string,
  isAgent: boolean,
  isConfirmed: boolean,
  isDisabled: boolean,
  lastName: string,
  name: string,
  primaryEmail: string,
  titlePrefix: string,
};

export type ContextData = {
  app: never,
  currentAgent: never,
  env: never,
  user: DeskproUser,
};

export type UserContext = Context<ContextData>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
  | { type: "unlink", deviceId: Device["id"] }
;

/** Entities */

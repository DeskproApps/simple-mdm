import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Account } from "./types";
import type { Settings } from "../../types";

const getCurrentAccountService = (
  client: IDeskproClient,
  settings?: Required<Settings>,
) => {
  return baseRequest<Account>(client, {
    url: `/account`,
    settings,
  });
};

export { getCurrentAccountService };

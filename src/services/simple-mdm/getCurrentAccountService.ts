import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Account } from "./types";

const getCurrentAccountService = (client: IDeskproClient) => {
  return baseRequest<Account>(client, {
    url: `/account`,
  });
};

export { getCurrentAccountService };

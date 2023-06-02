import type { SimpleMDMAPIError } from "./types";

export type InitData = {
  status: number,
  data: SimpleMDMAPIError,
};

class SimpleMDMError extends Error {
  status: number;
  data: SimpleMDMAPIError;

  constructor({ status, data }: InitData) {
    const message = "SimpleMDM Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { SimpleMDMError };

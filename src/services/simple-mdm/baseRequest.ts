import has from "lodash/has";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { proxyFetch, adminGenericProxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "../../constants";
import { toBase64, getQueryParams } from "../../utils";
import { SimpleMDMError } from "./SimpleMDMError";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data = {},
  settings = {},
  method = "GET",
  queryParams = {},
  headers: customHeaders,
}) => {
  const dpFetch = await (has(settings, ["api_key"]) ? adminGenericProxyFetch : proxyFetch)(client);

  const baseUrl = rawUrl ? rawUrl : `${BASE_URL}${url}`;
  const params = getQueryParams(queryParams);
  const apiKey = get(settings, ["api_key"]);

  const requestUrl = `${baseUrl}${params}`;
  const options: RequestInit = {
    method,
    headers: {
      "Authorization": `Basic ${apiKey ? toBase64(apiKey) : placeholders.API_KEY}`,
      ...customHeaders,
    },
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (!isEmpty(data)) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    throw new SimpleMDMError({
      status: res.status,
      data: await res.json(),
    });
  }

  try {
    return await res.json();
  } catch (e) {
    return {};
  }
};

export { baseRequest };

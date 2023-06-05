import get from "lodash/get";
import size from "lodash/size";
import type { Maybe } from "../types";
import type { DeviceUser } from "../services/simple-mdm/types";

const getUsersFullName = (users: Maybe<DeviceUser[]>): string => {
  if (!Array.isArray(users) || !size(users)) {
    return "-";
  }

  const fullNames = users
    .map((user) => get(user, ["attributes", "full_name"]))
    .filter((fullName) => Boolean(fullName));

  return size(fullNames) ? fullNames.join(", ") : "-"
};

export { getUsersFullName };

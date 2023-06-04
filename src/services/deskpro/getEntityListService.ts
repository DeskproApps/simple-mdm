import { IDeskproClient } from "@deskpro/app-sdk";
import { ENTITY } from "../../constants";
import type { DeskproUser } from "../../types";

const getEntityListService = (
    client: IDeskproClient,
    userId: DeskproUser["id"],
): Promise<string[]> => {
    return client
        .getEntityAssociation(ENTITY, userId)
        .list();
};

export { getEntityListService };

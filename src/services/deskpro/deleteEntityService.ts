import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Device } from "../simple-mdm/types";
import type { DeskproUser } from "../../types";

const deleteEntityService = (
    client: IDeskproClient,
    userId: DeskproUser["id"],
    entity: Device["id"],
) => {
    return client
        .getEntityAssociation(ENTITY, userId)
        .delete(`${entity}`);
};

export { deleteEntityService };

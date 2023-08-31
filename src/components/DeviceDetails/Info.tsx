import get from "lodash/get";
import { Title, Property } from "@deskpro/app-sdk";
import { getUsersFullName } from "../../utils";
import { Container, SimpleMDMLogo } from "../common";
import { nbsp } from "../../constants";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Device, DeviceUser } from "../../services/simple-mdm/types";

type Props = {
  device: Maybe<Device>,
  users: DeviceUser[];
};

const Info: FC<Props> = ({ device, users }) => {
  return (
    <Container>
      <Title
        marginBottom={10}
        title={get(device, ["attributes", "name"], "-")}
        icon={<SimpleMDMLogo/>}
        link={`https://a.simplemdm.com/admin/devices/${get(device, ["id"])}`}
      />
      <Property
        label="Device name"
        text={get(device, ["attributes", "device_name"], "-")}
      />
      <Property
        label="User name"
        text={getUsersFullName(users)}
      />
      <Property
        label="Model"
        text={get(device, ["attributes", "model_name"], "-")}
      />
      <Property
        label="Unique identifier"
        text={get(device, ["attributes", "unique_identifier"], "-")}
      />
      <Property
        label="Serial Number"
        text={get(device, ["attributes", "serial_number"], "-")}
      />
      <Property
        label="OS Version"
        text={get(device, ["attributes", "os_version"], "-")}
      />
      <Property
        marginBottom={20}
        label="Storage Capacity"
        text={`${
          get(device, ["attributes", "device_capacity"], "-")
        }${nbsp}GB (${
          get(device, ["attributes", "available_device_capacity"], "-")
        }${nbsp}GB${nbsp}free)`}
      />
    </Container>
  );
};

export { Info };

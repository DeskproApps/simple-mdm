import get from "lodash/get";
import capitalize from "lodash/capitalize";
import { Title } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { DATE_FORMAT, TIME_FORMAT } from "../../constants";
import { Container, Property } from "../common";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Device } from "../../services/simple-mdm/types";

type Props = {
  device: Maybe<Device>;
};

const Enrollment: FC<Props> = ({ device }) => {
  return (
    <Container>
      <Title title="Enrollment" marginBottom={10} />
      <Property
        label="Status"
        text={capitalize(get(device, ["attributes", "status"], "-"))}
      />
      <Property
        label="Enrollment Date"
        text={
          format(
            get(device, ["attributes", "enrolled_at"], "-"),
            `${DATE_FORMAT} ${TIME_FORMAT}`,
          )
        }
      />
      <Property
        label="Last Seen"
        text={format(
          get(device, ["attributes", "last_seen_at"], "-"),
          `${DATE_FORMAT} ${TIME_FORMAT}`,
        )}
      />
    </Container>
  );
};

export { Enrollment };

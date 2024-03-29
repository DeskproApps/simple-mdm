import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../common";
import type { FC } from "react";
import type { Device } from "../../services/simple-mdm/types";

type Props = {
  selectedDevices: Device[],
  isSubmitting: boolean,
  onLinkDevices: () => void,
  onCancel: () => void,
};

const Controls: FC<Props> = ({
  onCancel,
  isSubmitting,
  onLinkDevices,
  selectedDevices,
}) => (
  <Stack justify="space-between" style={{ paddingBottom: "4px" }}>
    <Button
      type="button"
      text="Link Device"
      disabled={!size(selectedDevices) || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkDevices}
    />
    <Button
      text="Cancel"
      intent="secondary"
      onClick={onCancel}
    />
  </Stack>
);

export { Controls };

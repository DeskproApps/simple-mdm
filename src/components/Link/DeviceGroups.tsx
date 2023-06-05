import { useMemo } from "react";
import size from "lodash/size";
import { getOption } from "../../utils";
import { Label, Select } from "../common";
import type { FC } from "react";
import type { Option } from "../../types";
import type { DeviceGroup } from "../../services/simple-mdm/types";

type Props = {
  value: "any"|DeviceGroup["id"],
  deviceGroups: DeviceGroup[],
  onChange: (groupId: Option<"any"|DeviceGroup["id"]>) => void,
};

const DeviceGroups: FC<Props> = ({ value, deviceGroups, onChange }) => {
  const options = useMemo(() => {
    if (!size(deviceGroups)) {
      return [];
    }

    return [
      getOption("any", "Any"),
      ...deviceGroups.map(({ id, attributes: { name } }) => getOption(id, name))
    ]
  }, [deviceGroups]);

  return (
    <Label label="Device group">
      <Select<"any"|DeviceGroup["id"]>
        id="deviceGroup"
        value={value}
        showInternalSearch
        onChange={onChange}
        options={options as never}
        noFoundText="No Device Group(s) found"
      />
    </Label>
  );
};

export { DeviceGroups };

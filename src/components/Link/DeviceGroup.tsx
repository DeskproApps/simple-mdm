import { Label, Select } from "../common";
import type { FC } from "react";
import type { Maybe, Option } from "../../types";

type Props = {
  // eslint-disable-next-line
  value: Maybe<any>,
  // eslint-disable-next-line
  options: Array<Option<any>>
  // eslint-disable-next-line
  onChange: (groupId: Option<any>) => void,
};

const DeviceGroup: FC<Props> = ({ value, options, onChange }) => {
  return (
    <Label label="Device group">
      <Select
        id="deviceGroup"
        value={value}
        showInternalSearch
        onChange={onChange}
        options={options}
        noFoundText="No Device Group(s) found"
      />
    </Label>
  );
};

export { DeviceGroup };

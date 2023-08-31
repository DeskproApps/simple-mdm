import { useMemo, useCallback } from "react";
import get from "lodash/get";
import { Title, TwoProperties } from "@deskpro/app-sdk";
import { nbsp } from "../../constants";
import { Link, SimpleMDMLogo } from "../common";
import type { FC } from "react";
import type { Device } from "../../services/simple-mdm/types";

type Props = {
  device: Device,
  onClickTitle?: () => void,
};

const DeviceItem: FC<Props> = ({ device, onClickTitle }) => {
  const deviceName = useMemo(() => {
    return get(device, ["attributes", "name"], "-")
  }, [device]);

  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <div style={{ marginBottom: 10 }}>
      <Title
        title={!onClickTitle
          ? deviceName
          : (<Link href="#" onClick={onClick as never}>{deviceName}</Link>)
        }
        icon={<SimpleMDMLogo/>}
        link={`https://a.simplemdm.com/admin/devices/${device.id}`}
      />
      <TwoProperties
        leftLabel="Model"
        leftText={get(device, ["attributes", "model_name"], "-")}
        rightLabel="OS version"
        rightText={get(device, ["attributes", "os_version"], "-")}
      />
      <TwoProperties
        leftLabel="Serial number"
        leftText={get(device, ["attributes", "serial_number"], "-")}
        rightLabel="Storage capacity"
        rightText={`${get(device, ["attributes", "device_capacity"], "-")}${nbsp}GB`}
      />
    </div>
  );
};

export { DeviceItem };

import { useCallback } from "react";
import get from "lodash/get";
import { Title } from "@deskpro/app-sdk";
import { Link, SimpleMDMLogo, TwoProperties } from "../common";
import type { FC } from "react";

type Props = {
  // eslint-disable-next-line
  device: any,
  onClickTitle: () => void,
};

const DeviceItem: FC<Props> = ({ device, onClickTitle }) => {
  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onClickTitle && onClickTitle(device.id);
  }, [onClickTitle, device]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? get(device, ["name"], "-")
          : (<Link href="#" onClick={onClick as never}>{get(device, ["name"], "-")}</Link>)
        }
        icon={<SimpleMDMLogo/>}
        link="https//:deskpro.com/apps"
      />
      <TwoProperties
        leftLabel="Model"
        leftText={get(device, ["model"], "-")}
        rightLabel="OS version"
        rightText={get(device, ["versionOS"], "-")}
      />
      <TwoProperties
        leftLabel="Serial number"
        leftText={get(device, ["serialNumber"], "-")}
        rightLabel="Storage capacity"
        rightText={get(device, ["storage"], "-")}
      />
    </>
  );
};

export { DeviceItem };

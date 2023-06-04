import { Fragment } from "react";
import size from "lodash/size";
import { Checkbox } from "@deskpro/deskpro-ui";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { NoFound, Card, CardBody, CardMedia } from "../common";
import { DeviceItem } from "../DeviceItem";
import type { FC } from "react";
import type { Device } from "../../services/simple-mdm/types";

type Props = {
  devices: Device[],
  isLoading: boolean,
  selectedDevices: Device[],
  onChangeSelectedDevices: (device: Device) => void,
};

const Devices: FC<Props> = ({
  devices,
  isLoading,
  selectedDevices,
  onChangeSelectedDevices,
}) => {
  return isLoading
    ? (<LoadingSpinner/>)
    : (
      <>
        {!Array.isArray(devices)
          ? <NoFound/>
          : !size(devices)
            ? <NoFound text="No device(s) found"/>
            : devices.map((device) => (
              <Fragment key={device.id}>
                <Card>
                  <CardMedia>
                    <Checkbox
                      size={12}
                      checked={selectedDevices.some(({ id }) => device.id === id)}
                      onChange={() => onChangeSelectedDevices(device)}
                      containerStyle={{ marginTop: 4 }}
                    />
                  </CardMedia>
                  <CardBody>
                    <DeviceItem
                      device={device}
                      onClickTitle={() => onChangeSelectedDevices(device)}
                    />
                  </CardBody>
                </Card>
              </Fragment>
            ))
        }
      </>
    );
};

export { Devices };

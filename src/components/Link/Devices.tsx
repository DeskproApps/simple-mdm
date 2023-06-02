import { Fragment } from "react";
import size from "lodash/size";
import { Checkbox } from "@deskpro/deskpro-ui";
import { HorizontalDivider, LoadingSpinner } from "@deskpro/app-sdk";
import { NoFound, Card, CardBody, CardMedia } from "../common";
import { DeviceItem } from "../DeviceItem";
import type { FC } from "react";

type Props = {
  // eslint-disable-next-line
  devices: any[],
  isLoading: boolean,
  // eslint-disable-next-line
  selectedDevices: any[],
  // eslint-disable-next-line
  onChangeSelectedDevices: (task: any) => void,
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
            ? <NoFound text="No Asana tasks found"/>
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
                <HorizontalDivider style={{ marginBottom: 10 }} />
              </Fragment>
            ))
        }
      </>
    );
};

export { Devices };

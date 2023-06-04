import get from "lodash/get";
import type { Device, DeviceGroup } from "../services/simple-mdm/types";

const getFilteredDevices = (
  devices: Device[],
  selectedDeviceGroupId: "any"|DeviceGroup["id"],
): Device[] => {
  if (!Array.isArray(devices)) {
    return [];
  }

  if (selectedDeviceGroupId === "any") {
    return devices;
  }

  return devices.filter((device) => {
    return get(device, ["relationships", "device_group", "data", "id"]) === selectedDeviceGroupId
  })
};

export { getFilteredDevices };

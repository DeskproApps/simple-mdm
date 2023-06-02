import { useState, useCallback } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useNavigate } from "react-router-dom";
import { Link } from "../../components";
import type { FC, ChangeEvent } from "react";
import type { Maybe } from "../../types";

const LinkPage: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  // eslint-disable-next-line
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useState<Maybe<any>>(null);
  // eslint-disable-next-line
  const [selectedDevices, setSelectedDevices] = useState<any[]>([]);

  const onChangeSearch = useCallback(({ target: { value: q }}: ChangeEvent<HTMLInputElement>) => {
    setSearch(q);
  }, []);

  const onClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const onCancel = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  // eslint-disable-next-line
  const onChangeSelectedDevices = useCallback((device: any) => {
    let newSelectedDevices = cloneDeep(selectedDevices);

    if (selectedDevices.some(({ id }) => device.id === id)) {
      newSelectedDevices = selectedDevices.filter((selectedDevice) => selectedDevice.gid !== device.gid);
    } else {
      newSelectedDevices.push(device);
    }

    setSelectedDevices(newSelectedDevices);
  }, [selectedDevices]);

  const onLinkDevices = useCallback(() => {
    //...
  }, []);

  return (
    <Link
      search={search}
      onChangeSearch={onChangeSearch}
      onClearSearch={onClearSearch}
      deviceGroups={[]}
      selectedDeviceGroup={selectedDeviceGroup}
      onChangeDeviceGroup={setSelectedDeviceGroup}
      selectedDevices={selectedDevices}
      isSubmitting={false}
      onLinkDevices={onLinkDevices}
      onCancel={onCancel}
      onChangeSelectedDevices={onChangeSelectedDevices}
      devices={[
        { id: "01", name: "Device 1", model: "iPad 10.2in 9th Gen", versionOS: "15.1", serialNumber: "CHH6XX0H7W", storage: "64GB" },
        { id: "02", name: "Device 2", model: "iPad 10.2in 9th Gen", versionOS: "15.1", serialNumber: "CHH6XX0H7W", storage: "64GB" },
      ]}
    />
  );
};

export { LinkPage };

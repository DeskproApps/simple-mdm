import { useState, useMemo, useCallback } from "react";
import get from "lodash/get";
import size from "lodash/size";
import cloneDeep from "lodash/cloneDeep";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import { useAsyncError } from "../../hooks";
import { useSearch } from "./hooks";
import { getFilteredDevices } from "../../utils";
import { Link } from "../../components";
import type { FC, ChangeEvent } from "react";
import type { UserContext } from "../../types";
import type { Device, DeviceGroup } from "../../services/simple-mdm/types";

const LinkPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [search, setSearch] = useState<string>("");
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useState<"any"|DeviceGroup["id"]>("any");
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading, devices, deviceGroups } = useSearch(search);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onChangeSearch = useCallback(({ target: { value: q }}: ChangeEvent<HTMLInputElement>) => {
    setSearch(q);
  }, []);

  const onClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const onCancel = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onChangeSelectedDevices = useCallback((device: Device) => {
    let newSelectedDevices = cloneDeep(selectedDevices);

    if (selectedDevices.some(({ id }) => device.id === id)) {
      newSelectedDevices = selectedDevices.filter((selectedDevice) => selectedDevice.id !== device.id);
    } else {
      newSelectedDevices.push(device);
    }

    setSelectedDevices(newSelectedDevices);
  }, [selectedDevices]);

  const onLinkDevices = useCallback(() => {
    if (!client || !dpUserId || !size(selectedDevices)) {
      return;
    }

    setIsSubmitting(true);
    return Promise.all([
      ...selectedDevices.map((device) => {
        return setEntityService(client, dpUserId, device.id);
      })
    ])
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler);
  }, [client, dpUserId, selectedDevices, navigate, asyncErrorHandler]);

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements()
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <Link
      search={search}
      onChangeSearch={onChangeSearch}
      onClearSearch={onClearSearch}
      deviceGroups={deviceGroups}
      selectedDeviceGroup={selectedDeviceGroup}
      onChangeDeviceGroup={setSelectedDeviceGroup}
      selectedDevices={selectedDevices}
      isSubmitting={isSubmitting}
      onLinkDevices={onLinkDevices}
      onCancel={onCancel}
      onChangeSelectedDevices={onChangeSelectedDevices}
      devices={getFilteredDevices(devices, selectedDeviceGroup)}
      isLoading={isLoading}
    />
  );
};

export { LinkPage };

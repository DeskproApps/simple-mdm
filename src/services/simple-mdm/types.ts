import type { DateTime } from "../../types";

export type SimpleMDMAPIError = {
  errors: Array<{ title: string }>,
};

export type Account  = {
  type: "account",
  attributes: {
    name: string,
    apple_store_country_code: string,
  };
};

export type DeviceGroup = {
  type: "device_group",
  id: number,
  attributes: {
    name: string,
  }
};

export type Device = {
  type: "device",
  id: number,
  attributes: {
    name: string,
    last_seen_at: DateTime,
    last_seen_ip: string,
    enrolled_at: DateTime,
    status: "enrolled" | "awaiting enrollment" | string,
    enrollment_channels: string[],
    device_name: string,
    auto_admin_name: null,
    os_version: string,
    build_version: string,
    model_name: string,
    model: string,
    product_name: string,
    unique_identifier: string,
    serial_number: string,
    processor_architecture: string,
    imei: null,
    meid: null,
    device_capacity: number,
    available_device_capacity: number,
    battery_level: null,
    modem_firmware_version: null,
    iccid: null,
    bluetooth_mac: string,
    ethernet_macs: string[],
    wifi_mac: string,
    current_carrier_network: null,
    sim_carrier_network: null,
    subscriber_carrier_network: null,
    carrier_settings_version: null,
    phone_number: null,
    voice_roaming_enabled: null,
    data_roaming_enabled: null,
    is_roaming: null,
    subscriber_mcc: null,
    subscriber_mnc: null,
    simmnc: null,
    current_mcc: null,
    current_mnc: null,
    hardware_encryption_caps: null,
    passcode_present: null,
    passcode_compliant: null,
    passcode_compliant_with_profiles: null,
    is_supervised: boolean,
    is_dep_enrollment: boolean,
    dep_enrolled: boolean,
    dep_assigned: boolean,
    is_user_approved_enrollment: boolean,
    is_device_locator_service_enabled: null,
    is_do_not_disturb_in_effect: null,
    personal_hotspot_enabled: null,
    itunes_store_account_is_active: boolean,
    cellular_technology: null,
    last_cloud_backup_date: null,
    is_activation_lock_enabled: boolean,
    is_cloud_backup_enabled: boolean,
    filevault_enabled: boolean,
    filevault_recovery_key: null,
    lost_mode_enabled: boolean,
    firmware_password_enabled: boolean,
    recovery_lock_password_enabled: boolean,
    remote_desktop_enabled: boolean,
    supplemental_build_version: null,
    supplemental_os_version_extra: null,
    firmware_password: null,
    recovery_lock_password: null,
    firewall: { "enabled": boolean, "block_all_incoming": boolean, "stealth_mode": boolean },
    system_integrity_protection_enabled: true,
    os_update: {
      automatic_os_installation_enabled: boolean,
      automatic_app_installation_enabled: boolean,
      automatic_check_enabled: null,
      automatic_security_updates_enabled: boolean,
      background_download_enabled: boolean,
      catalog_url: string,
      default_catalog: boolean,
      perform_periodic_check: null,
      previous_scan_date: DateTime,
      previous_scan_result: string,
    },
    service_subscriptions: [],
    location_latitude: null,
    location_longitude: null,
    location_accuracy: null,
    location_updated_at: null
  },
  relationships: {
    device_group: { data: { type: "device_group", id: number } },
    custom_attribute_values: { data: [] }
  }
}

export type DeviceUser = {
  type: "device_user",
  id: number,
  attributes: {
    uid: number,
    username: string,
    full_name: string,
    user_guid: string,
    data_quota: null,
    data_used: null,
    data_to_sync: boolean,
    secure_token: boolean,
    logged_in: boolean,
    mobile_account: boolean,
  }
};

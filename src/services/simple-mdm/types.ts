import type { DateTime } from "../../types";

export type SimpleMDMAPIError = {
  errors: Array<{ title: string }>,
};

export type Account  = {
  type: "account",
  attributes: {
    name: "Self employee",
    apple_store_country_code: "US"
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
    name: string, // "Test",
    last_seen_at: DateTime,
    last_seen_ip: string, // "82.132.228.70",
    enrolled_at: DateTime,
    status: "enrolled" | "awaiting enrollment" | string,
    enrollment_channels: string[], //  ["device", "user"],
    device_name: string, // "Thomas’s MacBook Pro",
    auto_admin_name: null,
    os_version: string, // "12.3",
    build_version: string, // "21E230",
    model_name: string, // "MacBook Pro 16\"",
    model: string, // "MacBookPro18,2",
    product_name: string, // "MacBookPro18,2",
    unique_identifier: string, // "B3F85D4B-3756-5256-B231-0B7B11283A72",
    serial_number: string, // "Y47M233K4W",
    processor_architecture: string, // "Apple Silicon",
    imei: null,
    meid: null,
    device_capacity: number, // 994,
    available_device_capacity: number, // 963,
    battery_level: null,
    modem_firmware_version: null,
    iccid: null,
    bluetooth_mac: string, // "BC:D0:74:6D:C1:44",
    ethernet_macs: string[], // ["bc:d0:74:6e:ec:81"],
    wifi_mac: string, // "bc:d0:74:6e:ec:81",
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
    is_supervised: boolean, // true,
    is_dep_enrollment: boolean, // false,
    dep_enrolled: boolean, // false,
    dep_assigned: boolean, // false,
    is_user_approved_enrollment: boolean, // true,
    is_device_locator_service_enabled: null,
    is_do_not_disturb_in_effect: null,
    personal_hotspot_enabled: null,
    itunes_store_account_is_active: boolean, // false,
    cellular_technology: null,
    last_cloud_backup_date: null,
    is_activation_lock_enabled: boolean, // false,
    is_cloud_backup_enabled: boolean, // false,
    filevault_enabled: boolean, // false,
    filevault_recovery_key: null,
    lost_mode_enabled: boolean, // false,
    firmware_password_enabled: boolean, // false,
    recovery_lock_password_enabled: boolean, // false,
    remote_desktop_enabled: boolean, // false,
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
      catalog_url: string, // "https://swscan.apple.com/content/catalogs/others/index-12-10.16-10.15-10.14-10.13-10.12-10.11-10.10-10.9-mountainlion-lion-snowleopard-leopard.merged-1.sucatalog.gz",
      default_catalog: boolean,
      perform_periodic_check: null,
      previous_scan_date: DateTime,
      previous_scan_result: string, // "100"
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

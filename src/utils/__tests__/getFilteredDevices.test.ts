import { getFilteredDevices } from "../getFilteredDevices";

const devices = [
  { id: 1, relationships: { device_group: { data: { id: 1 } } }},
  { id: 2, relationships: { device_group: { data: { id: 2 } } }},
  { id: 3, relationships: { device_group: { data: { id: 1 } } }},
];

describe("getFilteredDevices", () => {

  test("should filter devices", () => {
    expect(getFilteredDevices(devices as never, 2)).toEqual([
      { id: 2, relationships: { device_group: { data: { id: 2 } } }},
    ]);
  });

  test("should return empty array if no groups", () => {
    expect(getFilteredDevices(devices as never, 3)).toEqual([]);
  });

  test("should return all devices if any group", () => {
    expect(getFilteredDevices(devices as never, "any")).toEqual(devices);
  });

  test.each(
    [undefined, null, "", 0, true, false, {}, []]
  )("should return empty devices if wrong value", (value) => {
    expect(getFilteredDevices(value as never, 0)).toEqual([]);
  });
});

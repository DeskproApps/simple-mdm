import { cleanup } from "@testing-library/react";
import { render, mockDevices } from "../../../../testing";
import { Devices } from "../Devices";

describe("Link", () => {
  describe("Devices", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Devices
          devices={mockDevices.data as never[]}
          isLoading={false}
          selectedDevices={[]}
          onChangeSelectedDevices={jest.fn()}
        />
      ), { wrappers: { theme: true} });

      expect(await findByText(/Armen's macbook/i)).toBeInTheDocument();
      expect(await findByText(/Daria's macbook pro '13/i)).toBeInTheDocument();
    });

    test("should show \"No found\" if wrong devices", async () => {
      const { findByText } = render((
        <Devices
          devices={{} as never[]}
          isLoading={false}
          selectedDevices={[]}
          onChangeSelectedDevices={jest.fn()}
        />
      ), { wrappers: { theme: true} });

      expect(await findByText(/No found/i)).toBeInTheDocument();
    });

    test("should show \"No device(s) found\" if have no devices", async () => {
      const { findByText } = render((
        <Devices
          devices={[]}
          isLoading={false}
          selectedDevices={[]}
          onChangeSelectedDevices={jest.fn()}
        />
      ), { wrappers: { theme: true} });

      expect(await findByText(/No device\(s\) found/i)).toBeInTheDocument();
    });

    test("should show loader", async () => {
      const { findByText } = render((
        <Devices
          devices={[]}
          isLoading={true}
          selectedDevices={[]}
          onChangeSelectedDevices={jest.fn()}
        />
      ), { wrappers: { theme: true} });

      expect(await findByText(/Loading.../i)).toBeInTheDocument();
    });
  });
});

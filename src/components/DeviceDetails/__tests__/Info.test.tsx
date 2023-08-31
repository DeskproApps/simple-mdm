import { cleanup } from "@testing-library/react";
import { render, mockDevice, mockDeviceUsers } from "../../../../testing";
import { Info } from "../Info";

describe("DeviceDetails", () => {
  describe("Info", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Info
          device={mockDevice.data as never}
          users={mockDeviceUsers.data as never[]}
        />
      ), { wrappers: { theme: true }});

      expect(await findByText(/Armen's macbook/i)).toBeInTheDocument();
      expect(await findByText(/Tamzarian macbook device name/i)).toBeInTheDocument();
      expect(await findByText(/Armen Tamzarian/i)).toBeInTheDocument();
      expect(await findByText(/MacBook Pro \(16-inch, 2019\)/i)).toBeInTheDocument();
      expect(await findByText(/unique_identifier-5DBEFC944BD8/i)).toBeInTheDocument();
      expect(await findByText(/1234567890/i)).toBeInTheDocument();
      expect(await findByText(/13.4.1/i)).toBeInTheDocument();
      expect(await findByText(/1000 GB \(814 GB free\)/i)).toBeInTheDocument();
    });
  });
});

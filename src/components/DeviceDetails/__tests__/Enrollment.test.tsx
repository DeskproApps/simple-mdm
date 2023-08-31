import { cleanup } from "@testing-library/react";
import { render, mockDevice } from "../../../../testing";
import { Enrollment } from "../Enrollment";

describe("DeviceDetails", () => {
  describe("Enrollment", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Enrollment device={mockDevice.data as never} />
      ), { wrappers: { theme: true } });

      expect(await findByText(/enrolled/i)).toBeInTheDocument();
      expect(await findByText(/29 Aug, 2023 17:13/i)).toBeInTheDocument();
      expect(await findByText(/31 Aug, 2023 19:13/i)).toBeInTheDocument();
    });
  });
});

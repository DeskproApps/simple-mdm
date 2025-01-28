import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockDeviceGroups } from "../../../../testing";
import { DeviceGroups } from "../DeviceGroups";
import { act } from "react";

Object.defineProperty(window, "scrollTo", { value: jest.fn(), writable: true });
Object.defineProperty(global.Element.prototype, "scrollTo", { value: jest.fn() });

describe("Link", () => {
  describe("DeviceGroups", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <DeviceGroups
          deviceGroups={[]}
          onChange={jest.fn()}
          value="any"
        />
      ), { wrappers: { theme: true }});

      expect(await findByText(/Device group/i)).toBeInTheDocument();
    });

    test("should show all dropdown items", async () => {
      const { findByText, findAllByText } = render((
        <DeviceGroups
          deviceGroups={mockDeviceGroups.data as never[]}
          onChange={jest.fn()}
          value="any"
        />
      ), { wrappers: { theme: true }});

      const deviceGroupsSelect = await findByText(/Any/i);

      await act(async () => {
        await userEvent.click(deviceGroupsSelect);
      });

      expect(await findAllByText(/Any/i)).toHaveLength(2);
      expect(await findByText(/Default/i)).toBeInTheDocument();
      expect(await findByText(/Deskpro Group/i)).toBeInTheDocument();
    })
  });
});

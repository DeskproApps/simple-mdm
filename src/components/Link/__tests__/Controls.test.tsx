import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockDevice } from "../../../../testing";
import { Controls } from "../Controls";

describe("Link", () => {
  describe("Controls", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = render((
        <Controls
          selectedDevices={[mockDevice.data as never]}
          isSubmitting={false}
          onLinkDevices={jest.fn()}
          onCancel={jest.fn()}
        />
      ), { wrappers: { theme: true }});

      const linkButton = await findByRole("button", { name: /Link Device/i });
      const cancelButton = await findByRole("button", { name: /Cancel/i });

      expect(linkButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("should click \"Link Device\" button", async () => {
      const onLinkDevices = jest.fn();

      const { findByRole } = render((
        <Controls
          selectedDevices={[mockDevice.data as never]}
          isSubmitting={false}
          onLinkDevices={onLinkDevices}
          onCancel={jest.fn()}
        />
      ), { wrappers: { theme: true }});

      const linkButton = await findByRole("button", { name: /Link Device/i });

      await userEvent.click(linkButton);

      expect(onLinkDevices).toBeCalled();
    });

    test("shouldn't click \"Link Device\" button if have no selected devices", async () => {
      const mockOnLinkDevices = jest.fn()
      const { findByRole } = render((
        <Controls
          selectedDevices={[]}
          isSubmitting={false}
          onLinkDevices={mockOnLinkDevices}
          onCancel={jest.fn()}
        />
      ), { wrappers: { theme: true }});

      const linkButton = await findByRole("button", { name: /Link Device/i });
      await userEvent.click(linkButton);

      expect(linkButton).toHaveAttribute("disabled");
      expect(mockOnLinkDevices).not.toBeCalled();
    });

    test("shouldn't click \"Link Device\" button if submitting", async () => {
      const mockOnLinkDevices = jest.fn()
      const { findByRole } = render((
        <Controls
          selectedDevices={[mockDevice.data as never]}
          isSubmitting={true}
          onLinkDevices={mockOnLinkDevices}
          onCancel={jest.fn()}
        />
      ), { wrappers: { theme: true }});

      const linkButton = await findByRole("button", { name: /Link Device/i });
      await userEvent.click(linkButton);

      expect(linkButton).toHaveAttribute("disabled");
      expect(mockOnLinkDevices).not.toBeCalled();
    });

    test("should trigger onCancel", async () => {
      const mockOnCancel = jest.fn()
      const { findByRole } = render((
        <Controls
          selectedDevices={[mockDevice.data as never]}
          isSubmitting={true}
          onLinkDevices={jest.fn()}
          onCancel={mockOnCancel}
        />
      ), { wrappers: { theme: true }});

      const cancelButton = await findByRole("button", { name: /Cancel/i });

      await userEvent.click(cancelButton);
      expect(mockOnCancel).toBeCalled();
    });
  });
});

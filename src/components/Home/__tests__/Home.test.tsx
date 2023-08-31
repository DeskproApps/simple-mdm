import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockDevices } from "../../../../testing";
import { Home } from "../Home";

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <Home
        devices={mockDevices.data as never[]}
        onNavigateToLink={jest.fn()}
        onNavigateToDevice={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText(/Linked devices \(2\)/i)).toBeInTheDocument();
    expect(await findByText(/Armen's macbook/i)).toBeInTheDocument();
    expect(await findByText(/Daria's macbook pro '13/i)).toBeInTheDocument();
  });

  test("should show \"No found\" if wrong devices", async () => {
    const { findByText } = render((
      <Home
        devices={null as never}
        onNavigateToLink={jest.fn()}
        onNavigateToDevice={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });

  test("should show \"No device(s) found\" if have no devices", async () => {
    const { findByText } = render((
      <Home
        devices={[]}
        onNavigateToLink={jest.fn()}
        onNavigateToDevice={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByText(/No device\(s\) found/i)).toBeInTheDocument();
  });

  test("should navigate to link page", async () => {
    const mockOnNavigateToLink = jest.fn();

    const { findByRole } = render((
      <Home
        devices={[]}
        onNavigateToLink={mockOnNavigateToLink}
        onNavigateToDevice={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    const navigateToLinkButton = await findByRole("button");

    await act(async () => {
      await userEvent.click(navigateToLinkButton);
    });

    expect(mockOnNavigateToLink).toHaveBeenCalled();
  });

  test("should navigate to device details page", async () => {
    const mockOnNavigateToDevice = jest.fn();

    const { findByText } = render((
      <Home
        devices={mockDevices.data as never[]}
        onNavigateToLink={jest.fn()}
        onNavigateToDevice={mockOnNavigateToDevice}
      />
    ), { wrappers: { theme: true } });

    const deviceName = await findByText(/Armen's macbook/i);

    await act(async () => {
      await userEvent.click(deviceName);
    });

    expect(mockOnNavigateToDevice).toHaveBeenCalledWith(101);
  });
});

import { cleanup } from "@testing-library/react";
import { render, mockDevice } from "../../../../testing";
import { DeviceItem } from "../DeviceItem";

describe("DeviceItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <DeviceItem device={mockDevice.data as never}/>
    ), { wrappers: { theme: true } });

    expect(await findByText(/Armen's macbook/i)).toBeInTheDocument();
    expect(await findByText(/MacBook Pro \(16-inch, 2019\)/i)).toBeInTheDocument();
    expect(await findByText(/13.4.1/i)).toBeInTheDocument();
    expect(await findByText(/1234567890/i)).toBeInTheDocument();
    expect(await findByText(/1000 GB/i)).toBeInTheDocument();
  });
});

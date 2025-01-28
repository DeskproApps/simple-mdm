import { cleanup, renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteEntityService } from "../../services/deskpro";
import { useUnlinkDevice } from "../useUnlinkDevice";
import type { Result } from "../useUnlinkDevice";
import { act } from "react";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../useAsyncError", () => ({
  useAsyncError: jest.fn().mockReturnValue({ asyncErrorHandler: jest.fn() }),
}));
jest.mock("../../services/deskpro/deleteEntityService");

describe("useUnlinkTask", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should unlink task", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook<Result, unknown>(() => useUnlinkDevice());

    await act(async () => {
      await result.current.unlinkDevice(101 as never);
    })

    expect(deleteEntityService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("shouldn't navigate to /home if unlink task failed", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (deleteEntityService as jest.Mock).mockRejectedValueOnce(new Error("unlink failed"));

    const { result } = renderHook<Result, unknown>(() => useUnlinkDevice());

    await act(async () => {
      await result.current.unlinkDevice(101 as never);
    });

    expect(deleteEntityService).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalledWith("/home");
  });
});

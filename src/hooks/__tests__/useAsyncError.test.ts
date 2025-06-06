/* eslint-disable no-console */
import { renderHook } from "@testing-library/react";
import { useAsyncError } from '../useAsyncError';
import { act } from "react";

describe("useUnlinkTask", () => {
  let originalConsoleError: () => void;

  beforeEach(() => {
    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  test("should throw an error", () => {
    const { result } = renderHook(() => useAsyncError());
    const error = new Error("Test Error");

    try {
      act(() => {
        result.current.asyncErrorHandler(error);
      })
    } catch (caughtError) {
      expect(caughtError).toBe(error);
    }
  });
});

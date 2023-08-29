import { toBase64 } from '../toBase64';

describe("toBase64", () => {
  test("should encode a string to base64", () => {
    expect(toBase64("Hello, World!")).toBe("SGVsbG8sIFdvcmxkIQ==");
  });

  test("should throw an error if base64 encoding method is not available", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).btoa;
    expect(() => toBase64("Hello, World!")).toThrowError('no base64 encoding method available');
  });
});

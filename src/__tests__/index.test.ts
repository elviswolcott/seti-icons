import { hello } from "../index";

describe("hello world", () => {
  it('should return "Hello world."', () => {
    expect(hello()).toBe("Hello world.");
  });
});

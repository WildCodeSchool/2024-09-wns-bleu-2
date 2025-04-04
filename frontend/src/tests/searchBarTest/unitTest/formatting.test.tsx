import { describe, it, expect } from "vitest";
import { formatDate, formatTime } from "../../../utils/format.utils";

describe("Format Utils", () => {
  it("should format date to YYYY-MM-DD", () => {
    const testDate = new Date("2025-04-09T15:30:00");
    expect(formatDate(testDate)).toBe("2025-04-09");
  });

  it("should format time to HH:MM:SS", () => {
    const testTime = new Date("2025-04-09T08:45:00");
    expect(formatTime(testTime)).toBe("08:45:00");
  });

  it("should return default time if null", () => {
    expect(formatTime(null)).toBe("00:00:00");
  });
});

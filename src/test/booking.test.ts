import { describe, expect, it } from "vitest";
import { buildBookingMessage, whatsappUrl, villas } from "@/lib/villas";

describe("booking", () => {
  it("sends to 8287840116 on WhatsApp", () => {
    expect(whatsappUrl("hi")).toBe("https://wa.me/918287840116?text=hi");
  });
  it("includes the dates and details in the message", () => {
    const m = buildBookingMessage({ villa: "X", name: "A", phone: "1", checkIn: "2026-11-01", checkOut: "2026-11-05", guests: 3 });
    expect(m).toContain("Check-in: 2026-11-01");
    expect(m).toContain("Check-out: 2026-11-05");
    expect(m).toContain("Guests: 3");
  });
  it("every category shows only its villas", () => {
    expect(villas.filter((v) => v.categories.includes("luxury")).every((v) => v.categories.includes("luxury"))).toBe(true);
  });
});

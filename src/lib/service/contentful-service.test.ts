import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { getFooterContent, getHeaderContent } from "./contentful-service";

describe("contentful-service", () => {
  beforeEach(() => {
    vi.stubEnv("CONTENTFUL_ACCESS_TOKEN", "test-token");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each([
    ["getHeaderContent", getHeaderContent],
    ["getFooterContent", getFooterContent],
  ])("%s returns null when the response is not ok", async (_name, getContent) => {
    await expect(getContent()).resolves.toBeNull();

    // A missing token also returns null, so make sure the request was really sent
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

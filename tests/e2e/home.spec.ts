import { expect, test } from "@playwright/test";
import { PNG } from "pngjs";

test("homepage renders content and the signal canvas", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "David Duong" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View experience" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Resume", exact: true })).toHaveAttribute("href", /David_Duong_Resume\.pdf|blob\.vercel-storage\.com/);
  await expect(page.getByRole("link", { name: "Resume", exact: true })).toHaveAttribute("target", "_blank");
  await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();

  const canvas = page.locator(".signal-canvas canvas");
  await expect(canvas).toBeVisible();

  const box = await canvas.boundingBox();
  expect(box?.width).toBeGreaterThan(300);
  expect(box?.height).toBeGreaterThan(300);

  const image = await canvas.screenshot();
  const png = PNG.sync.read(image);
  let visiblePixels = 0;

  for (let index = 0; index < png.data.length; index += 4) {
    const red = png.data[index];
    const green = png.data[index + 1];
    const blue = png.data[index + 2];
    const alpha = png.data[index + 3];

    if (alpha > 0 && red + green + blue > 30) {
      visiblePixels += 1;
    }
  }

  expect(visiblePixels).toBeGreaterThan(100);
});


test("background stays mounted and sized while scrolling on mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile scrolling regression");
  await page.goto("/");
  const canvas = page.locator(".signal-canvas canvas");
  await expect(canvas).toBeVisible();
  const original = await canvas.elementHandle();
  const size = await canvas.evaluate((element) => ({ width: (element as HTMLCanvasElement).width, height: (element as HTMLCanvasElement).height }));
  await canvas.evaluate((element) => {
    element.dataset.contextLost = "false";
    element.addEventListener("webglcontextlost", () => { element.dataset.contextLost = "true"; });
    const observer = new MutationObserver(() => { element.dataset.resized = "true"; });
    observer.observe(element, { attributes: true, attributeFilter: ["width", "height"] });
  });
  for (const y of [350, 900, 1800, 300, 0]) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(120);
  }
  expect(await original?.evaluate((element) => element === document.querySelector(".signal-canvas canvas"))).toBe(true);
  expect(await canvas.evaluate((element) => ({ width: (element as HTMLCanvasElement).width, height: (element as HTMLCanvasElement).height }))).toEqual(size);
  await expect(canvas).not.toHaveAttribute("data-resized", "true");
  await expect(canvas).toHaveAttribute("data-context-lost", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

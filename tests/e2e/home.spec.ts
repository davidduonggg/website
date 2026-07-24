import { expect, test } from "@playwright/test";
import { PNG } from "pngjs";

test("homepage renders content and the signal canvas", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "David Duong" })).toBeVisible();
  await expect(page.getByRole("link", { name: "See selected work" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Systems with a pulse" })).toBeVisible();

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

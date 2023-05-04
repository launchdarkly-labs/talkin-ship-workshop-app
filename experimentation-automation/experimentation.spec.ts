import { test, expect } from "@playwright/test";
import { shouldClickAddToCart, shouldClickCheckout } from "./fixture";

const iterationCount = 100;
const iterations = Array(iterationCount).fill(0).map((iteration, index) => index)

for (const iteration of iterations) {
  test(`iteration: ${iteration}`, async ({ page }) => {
    await page.goto("/");

    const labelContainer = await page.waitForSelector(
      "[data-id='label-container']", { state: 'hidden' }
    );

    let labelAccent = "none";
    if (labelContainer) {
      const label = await labelContainer.textContent();
      if (label) labelAccent = label;
    }

    const addToCart = shouldClickAddToCart({
      label: labelAccent,
    });

    const checkout =
      addToCart &&
      shouldClickCheckout({
        label: labelAccent,
      });

    await page.waitForTimeout(Math.floor(Math.random() * 5) * 1000);

    if (addToCart) {
      await page
        .locator("div:nth-child(2) > .absolute > .p-6 > .flex > .inline-flex")
        .click();
      await page.locator(".flex > .inline-flex").first().click();

      if (checkout) {
        await page.hover("#radix-\\:r0\\:-trigger-radix-\\:r1\\: > button");
        await page.getByRole("button", { name: "Checkout" }).click();
        await page.waitForURL("https://checkout.stripe.com/**");
        console.log("successfuly clicked checkout");
      } else {
        // console.log("did not click checkout");
      }
    } else {
      // console.log("did not click add to cart");
      // console.log("did not click checkout");
    }
  });
}

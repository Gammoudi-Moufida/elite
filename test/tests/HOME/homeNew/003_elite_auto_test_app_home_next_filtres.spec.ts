import { test, expect } from "@playwright/test";
test.describe("test elite-auto app-home-filtres", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Continue without agreeing →" })
      .click();
  });
  test("test elite-auto slogan && images", async ({ page }) => {
    await expect(page.locator("p.tw-slogan")).toBeVisible();
    await expect(page.locator("p.tw-slogan")).toContainText(`Votre voiture neuve ou d’occasion moins chère`);
    await expect(page.locator(`(//a[@class='text-gray-300'])[1]`)).toContainText(`Occasion`);
    await expect(page.locator(`(//a[@class='text-gray-300'])[1]`)).toHaveAttribute("href", `https://www.elite-auto.fr/occasion`);
    await expect(page.locator(`(//a[@class='text-gray-300'])[2]`)).toContainText(` 0 Km `);
    await expect(page.locator(`(//a[@class='text-gray-300'])[2]`)).toHaveAttribute("href",`https://www.elite-auto.fr/recherche?prod_ELITE_OFFERS[refinementList][category][0]=4`);
    await expect(page.locator(`(//a[@class='text-gray-300'])[3]`)).toContainText(`Neuf`);
    await expect(page.locator(`(//a[@class='text-gray-300'])[3]`)).toHaveAttribute("href",`https://www.elite-auto.fr/recherche?prod_ELITE_OFFERS[refinementList][category][0]=4&prod_ELITE_OFFERS[refinementList][category][1]=3`);

    const filterImage = page.locator(`(//div[@class='main-container']//section)[1]`);
    let image = await filterImage.evaluate((element) => window.getComputedStyle(element).getPropertyValue("background-image"));
    await expect(image).toBe('url("https://images.elite-auto.fr/home/bg-img-desk.webp")');
    await expect(page.locator("//div/app-home-next/app-home-next-filters/div")).toBeVisible();
   });

  test("test elite-auto input search", async ({ page }) => {
    let searchInput = await page.locator("input#voice-search");
    expect(searchInput).toHaveAttribute("placeholder","Marque, modèle, finition ...");
    await searchInput.click();
    await searchInput.type("renault");
    await page.locator("button.absolute").first().click();
    await expect(page).toHaveURL(/\/recherche/);
    await expect(page).toHaveURL(/renault$/);
  });
});

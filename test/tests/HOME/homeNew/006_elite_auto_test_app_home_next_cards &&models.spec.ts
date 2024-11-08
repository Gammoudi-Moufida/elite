import { test, expect } from '@playwright/test';
let res
test.describe("test elite-auto app-home-cards && models", () => {

 test.beforeEach(async ({ request, page }) => {
    let response = await request.get(`/api/home/infos/vn`)
    expect(response.status()).toBe(200)
    res = await response.json()
    await page.goto("/");
    await page.getByRole("button", { name: "Continue without agreeing →" }).click();
 });
 test("test elite-auto app-home-cards", async ({ page }) => {
    for (let i = 0; i < res.cards.length; i++) {
        await expect(await page.locator(`//*[@id="slider"]/div[${i+1}]/div/a`)).toHaveAttribute('href', `${res.cards[i].lien}`)
        await expect(page.locator(`//*[@id="slider"]/div[${i+1}]/div/a/img`)).toHaveAttribute('src', `https://image.elite-auto.fr/${res.cards[i].urlImgLarge}`)
        await expect(page.locator(`//*[@id="slider"]/div[${i+1}]/div/a/div/h5`)).toContainText(`${res.cards[i].title}`)
        await expect(page.locator(`//*[@id="slider"]/div[${i+1}]/div/a/div/p`)).toContainText(`${res.cards[i].content}`)
    }
 })
 test("test elite-auto app-home-models", async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Nos catégories de modèles' })).toBeVisible()
    for (let i = 0; i < res.categories.length; i++) {
        await expect(await page.locator(`//app-home-next/app-home-next-models/div/div/a[${i+1}]`)).toHaveAttribute('href', `${res.categories[i].url}`)
        await expect(await page.locator(`//app-home-next/app-home-next-models/div/div/a[${i+1}]/img`)).toHaveAttribute('src', `${res.categories[i].urlImg}`)
        await expect(page.locator(`//app-home-next/app-home-next-models/div/div/a[${i+1}]/figcaption`)).toContainText(`${res.categories[i].name}`)
        await expect(page.locator(`//app-home-next/app-home-next-models/div/div/a[${i+1}]/p/span`)).toContainText(`${res.categories[i].bestRent}`)
}
 })
})
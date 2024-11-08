import { test, expect } from '@playwright/test';

test("test elite-auto app-home-slider", async ({ page, request , browserName }) => {
    test.skip()
    let response = await request.get(`/api/home/slider/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()

    await page.goto('/');
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click();

    for (let i = 0; i < res.length; i++) {
        const locatorImage =await page.locator(`//img[@class='block']`)
        await expect(locatorImage).toBeVisible()
        await expect(locatorImage).toHaveAttribute('src', `https://image.elite-auto.fr/home-slider/new/desktop/${res[i].img}`)
        const locatorUrl = await page.locator('app-home-next-slider').getByRole('link').first()
        await expect(locatorUrl).toHaveAttribute('href', `${res[0].url}`)
        if (i > 0) {
            let locatorUrlPlus = await page.locator('app-home-slider').getByRole('link').nth(i)
            await expect(locatorUrlPlus).toHaveAttribute('href', `${res[i].url}`)
        }
    }

})
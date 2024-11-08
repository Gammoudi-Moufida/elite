import { test, expect } from '@playwright/test';

test("test elite-auto app-home-next-brands", async ({ page, request }) => {

    let response = await request.get(`/api/home/brands/v2/www`)
    const res = await response.json()
    await page.goto('/');
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click();

    expect(await page.locator(`(//div[@class='container my-3']//h2)[1]`)).toBeVisible()
    expect(await page.locator(`(//div[@class='container my-3']//h2)[1]`)).toContainText('Nos marques')

    function toTitleCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    }
    expect(res.brands.length).toBe(10)
    for (let i = 0; i < 10; i++) {
        const locatorMark = page.locator(`(//div[contains(@class,'grid grid-cols-3')]//a)[${i + 1}]`)
        await expect(locatorMark).toBeVisible()
        await expect(locatorMark).toHaveAttribute('href', `${res.brands[i].url}`)
        await expect(locatorMark).toContainText(`${toTitleCase(res.brands[i].name)}`)
        const locatorHover = await page.locator(`(//div[contains(@class,'grid grid-cols-3')]//a)[${i + 1}]`)
        await locatorHover.hover()
        let color = await locatorHover.evaluate((element) =>
            window.getComputedStyle(element).getPropertyValue("background-color")
        );
        expect(color).toBeTruthy()
    }
    await expect(page.getByRole('link', { name: 'Voir toutes les marques' })).toHaveAttribute('href', `${res.nosmarques_url}`)
})
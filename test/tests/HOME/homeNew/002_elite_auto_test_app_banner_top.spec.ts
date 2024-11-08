import { test, expect } from '@playwright/test'


test("test elite-auto home app-banner-top", async ({ page, request }) => {

    let response = await request.get(`/api/home/bandeauhaut/www`)
    const res = await response.json()

     if (res.length == 0) { 
        return test.skip() // This will skip the test
      }
     
    await page.goto('/')
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click()
    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div')).toBeVisible()

    const bannerColor = page.locator(`//*[@id="header-banner"]/div/app-banner-top/div`)
    let color = await bannerColor.evaluate((element) =>
        window.getComputedStyle(element).getPropertyValue("background-color")
    )
    await expect(color).toBe('rgb(85, 106, 116)')
    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div/a')).toBeVisible()
    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div/a')).toContainText(`${res.contenu}`)
    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div/a')).toHaveAttribute('href',`${res.lien}`)
     
})
import { test, expect } from '@playwright/test'



test("test elite-auto home occasion app-banner-top", async ({ page, request }) => {

    let response = await request.get(`/api/home/bandeauhaut/www`)
    const res = await response.json()
     if(res.length > 0){
    await page.goto('/leasing')
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click()

    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div')).toBeVisible()

    const bannerColor = page.locator(`//*[@id="header-banner"]/div/app-banner-top/div`)
    let color = await bannerColor.evaluate((element) =>
        window.getComputedStyle(element).getPropertyValue("background-color")
    )
    expect(color).toBe('rgb(0, 120, 146)')
    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div/a')).toBeVisible()
    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div/a')).toContainText(`${res.contenu}`)
    await expect( page.locator('//*[@id="header-banner"]/div/app-banner-top/div/a')).toHaveAttribute('href',`${res.lien}`)
     }
})





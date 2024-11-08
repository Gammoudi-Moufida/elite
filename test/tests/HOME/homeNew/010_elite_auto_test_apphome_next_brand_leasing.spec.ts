import { expect, test } from '@playwright/test';

test("test elite-auto app-home-next-brands-leasing", async ({ page ,request }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click()

    await expect(page.getByRole('heading', { name: 'Nos marques leasing' })).toBeVisible()

    let response = await request.get(`/api/home/brands/v2/leasing`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const brandsLeasing = res.brands.sort((a, b) => { 
        return a.name.localeCompare(b.name)
      });

    for (let i = 0; i < await brandsLeasing.length; i++) {
       await expect(page.locator(`//app-home-next/app-home-next-brands-leasing/div/div[1]/a[${i+1}]`)).toContainText(` Leasing ${brandsLeasing[i].name .charAt(0).toUpperCase() + brandsLeasing[i].name.slice(1).toLowerCase()}`)
       await expect(page.locator(`//app-home-next/app-home-next-brands-leasing/div/div[1]/a[${i+1}]`)).toHaveAttribute('href', `${brandsLeasing[i].url}`)
    }
    await expect(page.getByRole('link', { name: 'Voir toutes nos marques' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Voir toutes nos marques' })).toHaveAttribute('href', `https://www.elite-auto.fr/leasing/nos-marques`)

})

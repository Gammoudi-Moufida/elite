import { test, expect } from '@playwright/test';

test("test elite-auto app-home-occasions", async ({ page, request }) => {
   
    let response = await request.get(`/api/offre-occasion/services`)
    expect(response.status()).toBe(200)
    const res = await response.json()
     const order = ['Audi','Bmw', 'Citroen', 'Dacia', 'Fiat', 'Ford', 'Mercedes', 'Peugeot', 'Renault', 'Volkswagen']
     const orderedBrands = res.list.filter(item => order.includes(item.nom));
     const brandsOccasions = orderedBrands.sort((a, b) => order.indexOf(a.nom) - order.indexOf(b.nom));
    await page.goto('/');
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click()

    await expect(page.getByRole('heading', { name: 'Nos occasions' })).toBeVisible()
    for (let i = 0; i < brandsOccasions.length; i++) {
        await expect(page.locator(`//app-home-next/app-home-next-occasions/div/div[1]/a[${i+1}]`)).toContainText(`Occasions ${brandsOccasions[i].nom}`)
        await expect(page.locator(`//app-home-next/app-home-next-occasions/div/div[1]/a[${i+1}]`)).toHaveAttribute('href', `${brandsOccasions[i].url}`)
    }
    await expect(page.getByRole('link', { name: 'Voir toutes nos occasions' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Voir toutes nos occasions' })).toHaveAttribute('href', `/occasion`)

})
import { test, expect } from '@playwright/test';


test("test elite-auto app-footer", async ({ page, request }) => {

  await page.goto('/');
  await page.getByRole('button', { name: 'Continue without agreeing →' }).click();


  let response = await request.get(`/api/marque/ventevoiturefooter/null/new/home`)

  const res = await response.json()

  for (let i = 0; i < res.dataFooter.length; i++) {
  
      await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[${i + 1}]/p`)).toBeVisible()
      await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[${i + 1}]/p`)).toContainText(` ${res.dataFooter[i].title}`)
  
  }
  for (let i = 0; i < 15; i++) {
    await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[1]/div[${i + 1}]/a`)).toContainText(` ${res.dataFooter[0][i].title}`)
    await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[1]/div[${i + 1}]/a`)).toHaveAttribute('href', `${res.dataFooter[0][i].url}`)
  }
  for (let i = 0; i < 5; i++) {

    await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[2]/div[${i + 1}]/a`)).toContainText(` ${res.dataFooter[1][i].title}`)
    await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[2]/div[${i + 1}]/a`)).toHaveAttribute('href', `${res.dataFooter[1][i].url}`)
  }
  for (let i = 0; i < 12; i++) {
    await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[3]/div[${i + 1}]/a`)).toContainText(` ${res.dataFooter[2][i].title}`)
    await expect(await page.locator(`//*[@id="new_footer"]/div/div/div[1]/div/div[3]/div[${i + 1}]/a`)).toHaveAttribute('href', `${res.dataFooter[2][i].url}`)
  }
  for (let i = 0; i < res.linksBas.length; i++) {
    await expect(await page.locator(`//app-footer/div[2]/div/a[${i + 1}]`)).toContainText(` ${res.linksBas[i].title}`)
    await expect(await page.locator(`//app-footer/div[2]/div/a[${i + 1}]`)).toHaveAttribute('href', `${res.linksBas[i].url}`)
  }

  await expect(page.getByText('Inscrivez-vous à notre newsletter')).toBeVisible()
  await expect(page.getByPlaceholder('Adresse email')).toBeVisible()
  await expect(await page.locator(`span.block`)).toContainText(`© 2023 - Tous droits réservés S.A.S au capital de 1 000 000€ Siège social : 195 Route nationale 10 78310 Coignières `)
  

  await expect(await page.locator(`(//div[@class='flex space-x-2']//a)[1]`)).toHaveAttribute('href', `https://www.linkedin.com/company/elite-auto/`)
  await expect(await page.locator(`(//div[@class='flex space-x-2']//a)[2]`)).toHaveAttribute('href', `https://www.facebook.com/EliteAuto.fr`)
  await expect(await page.locator(`(//div[@class='flex space-x-2']//a)[3]`)).toHaveAttribute('href', `https://instagram.com/eliteauto_fr?igshid=MzRlODBiNWFlZA==`)

  await page.screenshot({path:'home.png', fullPage: true})
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  
})

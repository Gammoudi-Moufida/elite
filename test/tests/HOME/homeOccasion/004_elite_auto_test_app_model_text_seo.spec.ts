import { expect, test } from "@playwright/test"

test("test elite-auto app-model-text-seo", async ({ page, request }) => {
  let response = await request.get (`/api/offre-occasion/textrefs`)
  const res = await response.json()
  let re = /<[^<>]+>/g;
    let textTop = res.textTop.replaceAll(re, "");
  textTop =textTop.split(' ').slice(0,50).join(' ')  

  await page.goto('/occasion')
  await page.getByRole('button', { name: 'Continue without agreeing →' }).click()

  await expect( page.locator('span.textHtml').first()).toContainText(`${textTop}`)
  await expect( page.locator(`span.read-more`)).toBeVisible()
  await expect( page.locator(`span.read-more`)).toContainText(`... Lire la suite`)
  await page.locator(`span.read-more`).click()
  await expect( page.locator('span.textHtml').first()).toContainText(`${textTop}`)
  await expect( page.locator(`span.read-more`)).toContainText(`Refermer`)
  await page.locator(`span.read-more`).click()
})

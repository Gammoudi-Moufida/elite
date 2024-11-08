import { expect, test } from "@playwright/test"

test("test elite-auto app-model-sub-header", async ({ page, request }) => {
  let response = await request.get (`/api/offre-occasion/textrefs`)
  const res = await response.json()

  await page.goto('/occasion')
  await page.getByRole('button', { name: 'Continue without agreeing →' }).click()

  await expect(page.locator('h1.margin0')).toBeVisible()
  await expect(page.locator('h1.margin0')).toContainText(`${res.title}`)
  await page.pause()

})
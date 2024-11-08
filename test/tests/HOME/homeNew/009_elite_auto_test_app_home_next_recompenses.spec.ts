import { test, expect } from '@playwright/test';

test("test elite-auto app-home-next-recompenses", async ({ page, request }) => {
  
   let response = await request.get(`/api/home/recompense/www`)
   const res = await response.json()

    await page.goto('/');
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click();

    await expect(page.locator('//app-home-next/app-home-next-recompenses/div/div/div[1]/a')).toHaveAttribute('href', `https://www.avis-verifies.com/avis-clients/elite-auto.fr`)
    await expect (page.locator('//app-home-next/app-home-next-recompenses/div/div/div[1]/a/img')).toHaveAttribute('src', `https://image.elite-auto.fr/pictos/widget21-13729.png`)
  
    for (let i = 0; i < res.activites.length; i++) {
      let correction = {
        "<strong>": "",
        "</strong>": "",
        "<a href=https://www.elite-auto.fr/reprise-voiture>": "",
        "</a>":"",
        "<a href='https://www.avis-verifies.com/avis-clients/elite-auto.fr' target='_blank' title='Avis de nos clients' alt='avis de nos clients'>":""

      };
      Object.keys(correction).forEach((key) => {
        res.activites[i][0].content = res.activites[i][0].content.replaceAll(key, correction[key]);
      });
      Object.keys(correction).forEach((key) => {
        res.activites[i][1].content = res.activites[i][1].content.replaceAll(key, correction[key]);
      });
      
        await expect(page.locator(`//app-home-next/app-home-next-recompenses/div/div/div[2]/div[${i+i+1}]/h3`)).toContainText(`${res.activites[i][0].title}`)
        await expect(page.locator(`//app-home-next/app-home-next-recompenses/div/div/div[2]/div[${(i+1)*2}]/h3`)).toContainText(`${res.activites[i][1].title}`)
        await expect(page.locator(`//app-home-next/app-home-next-recompenses/div/div/div[2]/div[${i+i+1}]/p`)).toContainText(`${res.activites[i][0].content}`)
        await expect(page.locator(`//app-home-next/app-home-next-recompenses/div/div/div[2]/div[${(i+1)*2}]/p`)).toContainText(`${res.activites[i][1].content}`)
      
    }
  
    let responseTwo = await request.get(`/api/home/confiance`)
    const resTwo = await responseTwo.json()
    
    for (let i = 0; i < resTwo.length; i++) {
        let re = /<[^<>]+>/g;
        let resTwoModified = resTwo[i].content.replaceAll(re, "");
        await expect(page.locator(`//app-home-next/app-home-next-recompenses/div/div/div[2]/div[${i+7}]/h3`)).toContainText(`${resTwo[i].title}`)
        await expect(page.locator(`//app-home-next/app-home-next-recompenses/div/div/div[2]/div[${i+7}]/p`)).toContainText(`${resTwoModified}`)
    } 

})    
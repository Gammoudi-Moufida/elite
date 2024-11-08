import { test, expect } from '@playwright/test';

test('test home hot content', async ({page , request}) => {

   let response = await request.post(`https://2iadkfqcgn-dsn.algolia.net/1/indexes/prod_ELITE_OFFERS/query?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.1)%3B%20Browser`, {
        data:
            {"query":``,"facetFilters":[[`disponibiliteForFO:en stock`,`disponibiliteForFO:en arrivage`]]} ,
        headers:{
            "X-Algolia-Api-Key": `9af86df5de1a1e74d80182a070a78ca8`,
            "X-Algolia-Application-Id": `2IADKFQCGN`,
            }
    })
    function toTitleCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    }
    expect(response.status()).toBe(200)
    const res = await response.json()

    // await page.goto('/');
    // await page.getByRole('button', { name: 'Continue without agreeing →' }).click()

    // for (let i = 0; i < 5; i++) {
    //     const locatorImage =await page.locator(`(//img[@class='lazyload ea-img-not-vo'])[${i+1}]`)
    //     await expect(locatorImage).toBeVisible()
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[2]/p/ais-highlight[1]/span`)).toBeVisible()
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[2]/p/ais-highlight[1]/span`)).toContainText(res.hits[i].marque)
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[2]/p/ais-highlight[2]/span`)).toContainText(res.hits[i].modelNomCompl)
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[3]/div[1]`)).toContainText(res.hits[i].motorisation.toUpperCase().replace(res.hits[i].modelNormalized.toUpperCase(),""), res.hits[i].finition.toUpperCase())
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[3]/div[2]`)).toContainText(`${res.hits[i].anneeMiseEnCirculation} · ${res.hits[i].kilometrage} km · ${toTitleCase(res.hits[i].energieNormalized)} · ${toTitleCase(res.hits[i].transmissionNormalized)} `)
    //     await expect(page.locator(`(//div[text()='0Km '])[${i+1}]`)).toBeVisible()
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[4]/div[2]`)).toContainText(res.hits[i].disponibiliteForFO.replace("en stock","disponible"))
    //     await expect(page.locator(`(//div[contains(@class,'col align-self-center')])[${i+1}]`)).toContainText(`Dès${new Intl.NumberFormat('fr', { 
    //         maximumFractionDigits: 0, 
    //         minimumFractionDigits: 0, }).format(res.hits[i].rent)}€ / mois  i `)
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[6]/div/div[2]/div[1]`)).toContainText(`${new Intl.NumberFormat('fr', { 
    //         maximumFractionDigits: 0, 
    //         minimumFractionDigits: 0, }).format(res.hits[i].prixCatalogueForLease)}€`)
    //     await expect(page.locator(`//*[@id="offerSlider"]/app-algolia-card[${i+1}]/div/div[6]/div/div[2]/div[2]/div`)).toContainText(`${new Intl.NumberFormat('fr', { 
    //         maximumFractionDigits: 0, 
    //         minimumFractionDigits: 0, }).format(res.hits[i].priceForFrontLoa)}€`)
    //       if((i!=0) && (i!= 3) && (i!= 4))
    //     await expect(locatorImage).toHaveAttribute('src', `https://image.elite-auto.fr/visuel/${res.hits[i].frontPicture}`)

    
            //     console.log(res.hits[i].equipments.length)
            //     console.log(res.hits[i].equipments.length,"res.hitss")
            
    // }
   
})
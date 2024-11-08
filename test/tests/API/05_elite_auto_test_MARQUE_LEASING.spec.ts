import { test, expect } from '@playwright/test';

test("api marque leasing referencement work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/referencement/1/renault/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Leasing Renault");
    expect(res.description).toContain("Leasing RENAULT : Découvrez nos formules de leasing pour le financement de votre RENAULT. Achetez votre RENAULT en LOA, LLD, crédit bail avec Elite-Auto.");
})
test("api marque leasing listvoiture work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/listvoiture/1/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)
    expect(res.title.trim()).toEqual("NOS OFFRES RENAULT EN LOCATION LOA / LDD")
    res.dataTableOffre.forEach(offre => {
        const offreObj = Object.keys(offre)
        
        expect(offreObj).toContain("marque")
        expect(offreObj).toContain("modele")
        expect(offreObj).toContain("modeleId")
        expect(offreObj).toContain("photoUrl")
        expect(offreObj).toContain("photoAlt")
        expect(offreObj).toContain("urlMod")
        expect(offreObj).toContain("avis")
        expect(offreObj).toContain("prixAdvantage")
        let marqueParams = offre.marque
        expect(marqueParams).toEqual("RENAULT")
        let photoAltParams = offre.photoAlt
        expect(photoAltParams).toContain(`leasing`)
        let urlModParams = offre.urlMod
        expect(urlModParams).toContain(`/leasing/renault-1/`)
        let avisParams = offre.avis
        expect(avisParams).toBeGreaterThanOrEqual(0)
        let prixAdvantageParams = offre.prixAdvantage
        expect(parseInt(prixAdvantageParams)).toBeGreaterThan(0)
    })


})
test("api marque leasing Sub-Header work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/ventevoituresubheader/1/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.mark).toEqual(`Renault`)
    expect(parseInt(res.remise)).toBeGreaterThan(0)
    expect(parseInt(res.remise)).toBeLessThan(100)
    expect(res.image).toContain('/images/logos/marques/logo_renault_new.png')
    expect(res.imageLink).toContain('/voiture-renault-1.html')
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.title).toContain("Location Renault avec option d'achat - loa / lld")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
})
test("api marque leasing texthaut work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/ventevoituretexthaut/1/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textHaut).toContain('<p>\r\nDepuis de nombreuses années Elite-Auto est parmi les meilleures alternatives économiques à l’achat d’une voiture à <a href=\"\/leasing\/guide-credit-auto\">crédit</a>. Notre service de <a href=\"https:\/\/www.elite-auto.fr\/leasing\">voitures en leasing<\/a> vous propose des modèles de marque Renault, aux taux parmi les plus bas avec des offres de crédit-bail pour les entreprises et leasing pour les particuliers. Avec Elite-Auto, faites le choix de la LOA pour financer votre Renault en leasing. Un grand choix d’automobiles Renault est proposé notamment avec la nouvelle Clio, le Captur, l’Arkana ou encore la Mégane. Découvrez-ci-dessous toutes les gammes proposées en location avec un simulateur pour connaitre immédiatement le montant de votre loyer selon votre usage.\r\n</p>')

})

test("api marque leasing ekomi work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})

test("api marque leasing menugauche work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/menugauche/1/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)
    res.menuTab.forEach(menu => {
        const menuTabObj = Object.keys(menu)
        expect(menuTabObj).toContain("title")
        expect(menuTabObj).toContain("url")
        let titleParams = menu.title
        expect(titleParams).toContain("Renault")
        let urlParams = menu.url
        expect(urlParams).toContain(`renault`)
    })
})

test("api marque leasing tag-schema work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/tag-schema/1/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<")
})
test("api marque leasing tag-google work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/tag-google/1/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script>")
})
test("api marque leasing footer work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/ventevoiturefooter/1/lease/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(6)

})
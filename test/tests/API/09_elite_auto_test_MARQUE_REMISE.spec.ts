import { test, expect } from '@playwright/test';

test("api marque tarif referencement work!", async ({ request }) => {
    let response = await request.get(`/api/marque/referencement/1/renault/marqueRemiseRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain(`Remise Renault neuve : toutes nos promotions | Elite-Auto.fr`)
    expect(res.description).toContain(`Acheter votre RENAULT neuve avec remise. Elite-auto vous fait profiter de remises exceptionnelles sur des renault neuves. Consultez régulièrement toutes nos promotions sur des renault.`)
})
test("api marque remise footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/1/marqueRemiseRewrite/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(8)
})
test("api marque remise listvoiture work!", async ({ request }) => {

    let response = await request.get(`/api/marque/listvoiture/1/marqueRemiseRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)
    expect(res.title).toEqual("NOTRE GAMME DE MODÈLES RENAULT")
    res.dataTableOffre.forEach(offre => {
        const offreObj = Object.keys(offre)
        
        expect(offreObj).toContain("marque")
        expect(offreObj).toContain("photoAlt")
        expect(offreObj).toContain("urlMod")
        expect(offreObj).toContain("remise")
        expect(offreObj).toContain("avis")
        expect(offreObj).toContain("txtRemise")
        let marqueParams = offre.marque
        expect(marqueParams).toEqual("RENAULT")
        let photoAltParams = offre.photoAlt
        expect(photoAltParams).toContain(`Renault`)
        let urlModParams = offre.urlMod
        expect(urlModParams).toContain(`renault`)
        let remiseParams = offre.remise
        expect(parseInt(remiseParams)).toBeGreaterThanOrEqual(0)
        expect(parseInt(remiseParams)).toBeLessThan(100)
        let avisParams = offre.avis
        expect(avisParams).toBeGreaterThanOrEqual(0)
        let txtRemiseParams = offre.txtRemise
        expect(txtRemiseParams).toContain(`Renault`)
    })
})

test("api marque leasing Sub-Header work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituresubheader/1/marqueRemiseRewrite`)
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
    expect(res.title).toContain("Remise Renault neuve en promotion")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
})
test("api marque remise texthaut work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretexthaut/1/marqueRemiseRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textHaut).toContain(`<p>\r\nAvec Elite-Auto, achetez votre nouvelle voiture en toute tranquillité : avec un service de qualité et une remise Renault garantie sur le modèle qui vous intéresse, il n'aura jamais été si simple de faire de bonnes affaires. Grâce à notre réseau de concessions partenaires dans toute la France, nous négocions en effet une promotion Renault imbattable, afin de vous accompagner dans l'acquisition d'un nouveau véhicule.\r\n</p>\r\n<p>\r\nLà où vous pourriez vous rendre chez un revendeur pour discuter tarif, sans forcément avoir gain de cause, nous prenons en charge les négociations et vous assurons une remise Renault qui vous permettra par exemple d'ajouter davantage d'options à votre voiture neuve sans dépasser le budget que vous vous étiez initialement fixé.\r\n</p>\r\n<p>\r\nQue vous recherchiez une petite citadine ou une familiale, n'hésitez pas à parcourir notre choix de modèles neufs pour trouver celui avec la promotion Renault qui vous correspond le plus. Il vous sera alors livré dans notre centre le plus proche de vous, avec les mêmes garanties qu'en concession.\r\n</p>\r\n<br />`)
})
test("api marque remise textbas work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretextbas/1/marqueRemiseRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textBas).toContain("")
})

test("api marque remise ekomi work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})

test("api marque remise menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/marqueRemiseRewrite`)
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

test("api marque remise tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-schema/1/marqueRemiseRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})

test("api marque remise tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-google/1/marqueRemiseRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
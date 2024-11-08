import { test, expect } from '@playwright/test';


test("api marque collaborateur referencement work!", async ({ request }) => {
    let response = await request.get(`/api/marque/referencement/1/renault/new_ref_marques`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain(`Voiture collaborateur Renault : une alternative | Elite-Auto.fr`)
    expect(res.description).toContain(`Des voitures RENAULT neuves pour le prix d'une voiture de collaborateur RENAULT grâce aux remises exceptionnelles de votre mandataire automobile. Consultez les prix de nos véhicules neufs avant d'acheter des RENAULT de collaborateurs.`)
})

test("api marque collaborateur footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/1/new_ref_marques/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(1)
    expect(res.linksBas).toHaveLength(8)

})
test("api marque collaborateur listvoiture work!", async ({ request }) => {

    let response = await request.get(`/api/marque/listvoiture/1/new_ref_marques`)
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
        let marqueParams = offre.marque
        expect(marqueParams).toEqual("RENAULT")
        let photoAltParams = offre.photoAlt
        expect(photoAltParams).toContain(`collaborateur`)
        let urlModParams = offre.urlMod
        expect(urlModParams).toContain(`renault`)
        let remiseParams = offre.remise
        expect(parseInt(remiseParams)).toBeGreaterThanOrEqual(0)
        expect(parseInt(remiseParams)).toBeLessThan(100)
        let avisParams = offre.avis
        expect(avisParams).toBeGreaterThanOrEqual(0)
    })
})
test("api marque collaborateur subheader work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituresubheader/1/new_ref_marques`)
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
    expect(res.title).toContain("Achat d'une voiture collaborateur Renault : l'alternative Elite Auto")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
    expect(res.avgNote).toBeLessThan(5)
})
test("api marque collaborateur texthaut work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretexthaut/1/new_ref_marques`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textHaut).toEqual(`<p>\r\nSi vous recherchez une nouvelle voiture, peut-être êtes-vous tenté par l'achat d'un véhicule d'occasion de collaborateur Renault. Avec un prix attractif et un état quasi neuf, ce type d'offre est en effet intéressant, mais que diriez-vous de profiter d'une voiture vraiment neuve au même prix qu'un modèle de collaborateur Renault ?\r\n</p>\r\n<p>\r\nAvec Elite Auto, rien de plus simple : il vous suffit de choisir dans notre catalogue exhaustif du constructeur le véhicule qui vous plait, et nous nous chargeons de négocier son prix au plus bas auprès de concessionnaires partenaires. En tant que mandataire de référence, nous parvenons toujours à obtenir des remises pour un tarif final aussi compétitif qu'une voiture de collaborateur Renault.\r\n</p>`)
})
test("api marque collaborateur textbas work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretextbas/1/new_ref_marques`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textBas).toEqual(`<p>\r\nCe qui représente pour vous deux grands avantages : d'une part, en préférant notre service à l'achat de votre Renault auprès d'un collaborateur de la marque, vous repartez avec une voiture neuve, directement issue des usines du constructeur au losange (comme si vous l'achetiez en concession) et non une première main. D'autre part, vous êtes libre de personnaliser votre future voiture, du moteur à la couleur extérieure, ce qui sera plus difficile en achetant un véhicule appartenant à un membre du personnel Renault.\r\n</p>\r\n<p>\r\nAu final, via notre service de mandataire auto, vous pouvez acheter du neuf au prix de l'occasion ! Un gage certain de tranquillité et d'économies, et donc plus avantageux pour vous qu'un achat auprès d'un collaborateur Renault.\r\n</p>`)
})
test("api marque collaborateur ekomi work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listObj = Object.keys(res.listeEkomi[0])
    expect(listObj).toContain("rate")
    expect(listObj).toContain("review")
    expect(listObj).toContain("reviewDate")
})
test("api marque collaborateur menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/new_ref_marques`)
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

test("api marque collaborateur tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-schema/1/new_ref_marques`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})

test("api marque collaborateur tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-google/1/new_ref_marques`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
import { test, expect } from '@playwright/test';

test("api marque tarif referencement work!", async ({ request }) => {
    let response = await request.get(`/api/marque/referencement/1/renault/newTarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain(` découvrez le Tarif de votre renault neuve par mandataire`)
    expect(res.description).toContain(`remise sur les prix de la gamme RENAULT chez le mandataire Elite-Auto : Tarif RENAULT neuve pour chaque modèle. Prix catalogue du constructeur renault et prix mandataire avec une remise exceptionnelle sur l'achat d'une renault neuve.`)
})

test("api marque tarif footer work!", async ({ request }) => {
    let response = await request.get(`/api/marque/ventevoiturefooter/1/newTarif/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(8)
})

test("api marque tarif listvoiture work!", async ({ request }) => {
    let response = await request.get(`/api/marque/listvoiture/1/newTarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)
 res.dataTableOffre.forEach(offre => {
    const offreObj = Object.keys(offre)
    
    expect(offreObj).toContain("marque")
    expect(offreObj).toContain("remise")
    expect(offreObj).toContain("prix")
    expect(offreObj).toContain("avis")
    expect(offreObj).toContain("photoAlt")
    expect(offreObj).toContain("urlMod")

    let marqueParams = offre.marque
    expect(marqueParams).toEqual("RENAULT")
    let remiseParams = offre.remise
    expect(parseInt(remiseParams)).toBeGreaterThan(0)
    expect(parseInt(remiseParams)).toBeLessThan(100)
    let prixParams = offre.prix
    expect(parseInt(prixParams)).toBeGreaterThan(0)
    let avisParams = offre.avis
    expect(avisParams).toBeGreaterThanOrEqual(0)
    let photoAltParams = offre.photoAlt
    expect(photoAltParams).toContain(`Renault`)
    let urlModParams = offre.urlMod
    expect(urlModParams).toContain(`/voiture-neuve/renault-1/`)
})
})
test("api marque tarif Sub-Header work!", async ({ request }) => {
    let response = await request.get(`/api/marque/ventevoituresubheader/1/newTarif`)
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
    expect(res.title).toContain("Tarif Renault neuve")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
    expect(res.avgNote).toBeLessThan(5)

})
test("api marque tarif texthaut work!", async ({ request }) => {
    let response = await request.get(`/api/marque/ventevoituretexthaut/1/newTarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textHaut).toContain(`<h2>DÉCOUVREZ TOUS LES PRIX ET TARIFS DE LA GAMME RENAULT</h2>`)
})
test("api marque tarif textbas work!", async ({ request }) => {
    let response = await request.get(`/api/marque/ventevoituretextbas/1/newTarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textBas).toContain(`<p>Elite-Auto vous propose de découvrir tous les prix de la gamme renault en photographie.\n            Différentes photos de la marque renault sont proposées notamment pour les modèles suivant :\n             ...Pour chaque modèle de la gamme, le tarif négocié par le mandataire Elite-Auto\n `)
})
test("api marque tarif menugauche work!", async ({ request }) => {
    let response = await request.get(`/api/marque/menugauche/1/newTarif`)
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
test("api marque tarif ekomi work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})

test("api marque tarif tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-schema/1/newTarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})

test("api marque tarif tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-google/1/newTarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
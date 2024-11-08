import { test, expect } from '@playwright/test';

test("api marque import referencement work!", async ({ request }) => {
    let response = await request.get(`/api/marque/referencement/1/null/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Import Renault moins chère, Importation renault neuve")
    expect(res.description).toContain("Acheter votre voiture neuve avec remise. Elite-auto vous fait profiter de remises exceptionnelles sur des renault neuves.")
})
test("api marque import footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/1/refMarqueSeule/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(3)
    expect(res.linksBas).toHaveLength(8)
})

test("api marque import listvoiture work!", async ({ request }) => {

    let response = await request.get(`/api/marque/listvoiture/1/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)
    expect(res.title).toEqual("")
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

test("api marque import subheader work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituresubheader/1/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
  
    expect(res.mark).toEqual(`Renault`)
    expect(parseInt(res.remise)).toBe(34)
    expect(parseInt(res.remise)).toBeLessThan(60)
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(res.imageLink).toContain("/voiture-renault-1.html")
    expect(res.menu.length).toEqual(2)
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.title).toContain("Importation Renault - Voiture Renault neuve importée")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
    expect(res.avgNote).toBeLessThan(5)
})
test("api marque import texthaut work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretexthaut/1/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textHaut).toContain("<p>Vous souhaitez changer de véhicule et vous cherchez le <b>meilleur prix sur votre voiture neuve</b>. Elite-auto est un mandataire automobile qui vous fait profiter de remises exceptionnelles sur des véhicules neufs.\n            Pour acheter une voiture neuve moins chère, nombreux sont les mandataires qui achètent leurs véhicules à l'étranger. Ils importent les voitures de différents pays européens puis les revendent en France.")
})

test("api marque import textbas work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretextbas/1/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textBas).toContain("")
})
test("api marque import ekomi work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.listeEkomi.length).toBe(2)
    const listObj = Object.keys(res.listeEkomi[0])

    expect(listObj).toContain("rate")
    expect(listObj).toContain("review")
    expect(listObj).toContain("reviewDate")
})
test("api marque import menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.marqueId).toEqual(1)
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
test("api marque import tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-schema/1/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})

test("api marque import tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-google/1/refMarqueSeule`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
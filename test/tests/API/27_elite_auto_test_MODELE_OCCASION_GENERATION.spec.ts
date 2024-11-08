import { test, expect } from '@playwright/test'

test("api modele tarif filter v2 15 work!", async ({ request }) => {

    let response = await request.get(`/api/offre-occasion/filter/renault/clio/clio-iv`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const filterObj = Object.keys(res)
    expect(filterObj).toContain("markId")
    expect(filterObj).toContain("modelId")
    expect(filterObj).toContain("groupeNiveau1")
    expect(filterObj).toContain("ModelNomCompl")

})
test("api modele occasion generation footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/renault/occasion/occasion_generation`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(2)
    expect(res.linksBas.length).toEqual(7)
})
test("api modele occasion generation textrefs work!", async ({ request }) => {
    let response = await request.get(`/api/offre-occasion/textrefs/renault/clio/clio-iv`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("occasion")
    expect(res.mark).toContain("logo Renault")
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(res.metaTitle).toContain("Renault Clio 4 Occasion : nos annonces à partir de 9 785€")
    expect(res.metaDescription).toContain("Découvrez nos voitures d'occasion Renault Clio iv dès 9 785€ sous garantie et livraison dans toute la France avec Elite-Auto ☎ 01.30.49.40.40")
    expect(res.imageLink).toContain("/occasion/renault")
    expect(res.title).toContain("Achetez une citadine Renault Clio IV d'occasion")
    res.menu.forEach(menu=> {
        const menuObj = Object.keys(menu)
        expect(menuObj).toContain("text")
        expect(menuObj).toContain("url")
})
})
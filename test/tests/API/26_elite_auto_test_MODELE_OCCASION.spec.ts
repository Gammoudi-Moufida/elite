import { test, expect } from '@playwright/test'
test("api modele entreprise finition referencement work!", async ({ request }) => {
    let response = await request.get(`/api/offre-occasion/filter/renault/clio`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.markId).toBe(1)
    expect(res.groupeNiveau1).toContain("clio")
})
test("api marque occasion service renault work!", async ({ request }) => {

    let response = await request.get(`/api/offre-occasion/services/renault/clio`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.markEurotaxId).toBe(1)
    expect(res.nomCompl).toEqual('clio')
    res.list.forEach(list => {
        const listObj = Object.keys(list)
        expect(listObj).toContain("nom")
        expect(listObj).toContain("url")
        let nomParams = list.nom
        expect(nomParams).toContain("Clio")
        let urlParams = list.url
        expect(urlParams).toContain("clio")
    })
})
test("api modele occasion footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/renault/occasion/occasion_model`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(2)
    expect(res.linksBas.length).toEqual(7)

})
test("api modele occasion textrefs work!", async ({ request }) => {
    let response = await request.get(`/api/offre-occasion/textrefs/renault/clio`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("occasion")
    expect(res.mark).toContain("logo Renault")
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(res.metaTitle).toContain("Renault Clio Occasion : nos annonces à partir de 6 784,6€")
    expect(res.metaDescription).toContain("Achetez une voiture d'occasion Renault Clio dès 6 784,6€ sous garantie et livraison dans toute la France avec les annonces Elite-Auto")
    expect(res.imageLink).toContain("/occasion/renault")
    expect(res.title).toContain("Renault Clio")
    res.menu.forEach(menu=> {
        const menuObj = Object.keys(menu)
        expect(menuObj).toContain("text")
        expect(menuObj).toContain("url")
})
})
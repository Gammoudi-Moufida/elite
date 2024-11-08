import { test, expect } from '@playwright/test';

test("api modele VN moteur textrefs work!", async ({ request }) => {
    let response = await request.get(`/api/model/textrefs/1/7208/marque_modele_offres_motorisation_vn/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("marque_modele_offres_motorisation_vn")
    expect(res.mark).toContain("Renault")
    expect(res.markId).toBe(1)
    expect(res.model_nom_compl).toContain("CLIO V")
    expect(res.model).toContain("CLIO V")
    expect(res.nomSinguilier).toContain("CITADINE")
    expect(res.modelVnUrl).toContain("/voiture-renault-1/clio-v-7208.html")
    expect(res.modelId).toBe(2576)
    expect(res.img).toContain("/visuel/RENAULT/renault_20clioeditiononehb5b_angularfront.png")
    expect(res.imageLink).toContain("/voiture-renault-1.html")
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(res.title).toContain("Renault Clio v clio tce 130 edc fap")
    expect(res.subtexttop).toContain("Renault Clio v : Notre gamme de véhicules")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.textTop).toContain("<h2>Nos meilleures offres pour la citadine Renault Clio v clio tce 130 edc fap</h2>")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")

})
test("api modele VN moteur referencement work!", async ({ request }) => {

    let response = await request.get(`/api/model/referencement/1/7208/marque_modele_offres_motorisation_vn/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Renault Clio V clio tce 130 edc fap : découvrez la citadine Renault")
    expect(res.description).toContain("Nos meilleures offres pour la Renault CLIO V Clio tce 130 edc fap neuve.")

})
test("api modele VN moteur tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-schema/1/7208/marque_modele_offres_motorisation_vn/null/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script ")

})
test("api modele VN moteur tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-google/1/7208/marque_modele_offres_motorisation_vn/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script>")

})
test("api modele VN moteur footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/7208/marque_modele_offres_motorisation_vn/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(1)
    expect(res.linksBas).toHaveLength(8)
})
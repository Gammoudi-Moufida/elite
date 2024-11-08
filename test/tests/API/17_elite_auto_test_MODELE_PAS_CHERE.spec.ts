import { test, expect } from '@playwright/test'

test("api modele pas chere CLIO_V work!", async ({ request }) => {

    let response = await request.get(`/api/model/redirection/moins-cher/RENAULT_CLIO_V_`)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const res = await response.json()
    expect(typeof (res.toRedirect)).toBe("boolean")

})
test("api modele pas chere marque-modele CLIO_V work!", async ({ request }) => {

    let response = await request.get(`/api/model/marque-model/RENAULT_CLIO_V_`)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const res = await response.json()
    expect(res.modelId).toBe(7208)
    expect(res.eurotaxId).toBe(1)
})

test("api modele pas chere textrefs work!", async ({ request }) => {

    let response = await request.get(`/api/model/textrefs/1/7208/modelMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("modelMoinsCherRewrite")
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
    expect(parseInt(res.remise)).toBeGreaterThan(0)
    expect(parseInt(res.remise)).toBeLessThan(100)
    expect(res.title).toContain("Renault Clio v neuve moins chère")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.subtexttop).toBe("Renault Clio v : Notre gamme de véhicules")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})

test("api modele pas chere 7208 work!", async ({ request }) => {

    let response = await request.get(`/api/model/voiture-pas-cher/7208`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.text).toEqual("<h2>Nos disponibilités pour votre renault clio v pas chère</h2><p>Achetez une renault clio v pas chère parmi nos offres en stock, en arrivage, ou sur commande avec garantie constructeur renault.</p>")
    expect(res.description).toContain("Achetez une Renault Clio v pas chère avec le mandataire Elite Auto et réalisez jusqu'à")
    expect(res.title).toEqual("Renault Clio v neuve pas chère | Elite-Auto.fr")
})

test("api modele pas chere tag-schema work!", async ({ request }) => {
    
    let response = await request.get(`/api/model/tag-schema/RENAULT_CLIO_V_/7208/modelMoinsCherRewrite/20`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script ")
})
test("api modele pas chere tag-google work!", async ({ request }) => {
    
    let response = await request.get(`/api/model/tag-google/RENAULT_CLIO_V_/7208/modelMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script>")
})

test("api modele pas chere footer work!", async ({ request }) => {
    
    let response = await request.get(`/api/marque/ventevoiturefooter/7208/modelMoinsCherRewrite/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(8)

})
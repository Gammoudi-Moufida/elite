import { test, expect } from '@playwright/test';

test("api modele renault arkana textrefs work!", async ({ request }) => {
    let response = await request.get(`/api/model/textrefs/2/5765/marque_modele_offres_finition_lease/finition/active`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("marque_modele_offres_finition_lease")
    expect(res.mark).toContain("Peugeot")
    expect(res.markId).toBe(15)
    expect(res.model_nom_compl).toContain("108")
    expect(res.model).toContain("108")
    expect(res.nomSinguilier).toContain("CITADINE")
    expect(res.modelVnUrl).toContain("/voiture-peugeot-2/108-5765.html")
    expect(res.modelId).toBe(1242)
    expect(res.img).toContain("/visuel/PEUGEOT/peugeot_21108stylehb1fb_angularfront.png")
    expect(res.imageLink).toContain("/voiture-peugeot-2.html")
    expect(res.image).toContain("/images/logos/marques/logo_peugeot_new.png")
    expect(res.title).toContain("Leasing Peugeot 108 Active")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.resume).toContain("<h2>Les équipements de la Peugeot 108 active en leasing</h2>")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
    expect(res.avgNote).toBeLessThan(100)
    res.avis.forEach(avis => {
        const avisObj = Object.keys(avis)
        expect(avisObj).toContain("rate")
        expect(avisObj).toContain("lastName")
        expect(avisObj).toContain("firstName")
        expect(avisObj).toContain("review")
    });

})
test("api modele leasing finition referencement work!", async ({ request }) => {

    let response = await request.get(`/api/model/referencement/2/5765/marque_modele_offres_finition_lease/finition/active`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toEqual("Peugeot 108 active : Simplicité d’un financement en LLD ou LOA")
    expect(res.description).toContain("Nos meilleures offres de leasing pour la Peugeot ")

})
test("api modele leasing finition tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-schema/2/5765/marque_modele_offres_finition_lease/1/finition/active`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})
test("api modele leasing finition tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-google/2/5765/marque_modele_offres_finition_lease/finition/active`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
test("api modele leasing finition filter v2 work!", async ({ request }) => {

    let response = await request.get(`/api/filter/v2/finition?models=%22108%22`)
    expect(response.status()).toBe(200)
})

test("api modele leasing finition filter generation work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/generation?models=%22108%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(resp=>{
      const Obj = Object.keys(resp)
      expect(Obj).toContain("id")
      expect(Obj).toContain("nom")
      let nomParams = resp.nom;
      expect(nomParams).toContain("108");
    })
    
})
test("api home footer work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/ventevoiturefooter/5765/marque_modele_offres_finition_lease/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(6)

})
test("api marque leasing menugauche work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/menugauche/2/utility/5765`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(15)
    expect(res.marqueName).toEqual(`Peugeot`)
    res.menuTab.forEach(menu => {
        const menuTabObj = Object.keys(menu)
        expect(menuTabObj).toContain("title")
        expect(menuTabObj).toContain("url")
        let titleParams = menu.title
        expect(titleParams).toContain("Peugeot")
        let urlParams = menu.url
        expect(urlParams).toContain(`peugeot`)
    })
})

test("api modele leasing finition avis 5765 work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/model/model-avis/5765/marque_modele_offres_finition_lease/1`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const avisObj = Object.keys(res.avisTab[0])
    expect(avisObj).toContain("rate")
    expect(avisObj).toContain("review")
    expect(avisObj).toContain("lastName") 
    expect(avisObj).toContain("firstName") 
    expect(parseInt(res.totalAvis)).toBeGreaterThan(0)
    expect(parseInt(res.totalPages)).toBeGreaterThan(0)

}) 
import { test, expect } from '@playwright/test'

test("api modele leasing renault clio-v work!", async ({ request }) => {
    let response = await request.get(`/api/model/redirection/1/7208/renault/clio-v`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.isUtilitaire)).toBe("boolean")
    expect(typeof (res.toRedirect)).toBe("boolean")
    expect(typeof (res.isEnabled)).toBe("boolean")
    expect(res.marque).toContain("renault")
    expect(res.newSlug).toBe("clio-v")
})
test("api modele leasing textrefs work!", async ({ request }) => {
    let response = await request.get(`/api/model/textrefs/1/7208/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("lease")
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
    expect(res.title).toContain("Location Renault Clio v en LOA / LLD")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.textTop).toContain("<h2>Votre Renault Clio v en leasing</h2>")
    expect(res.subtexttop).toBe("Nos offres Renault Clio v en location loa / ldd")
    expect(res.resume).toContain("<h2>Nos garanties pour une LLD Renault Clio v</h2>")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")

})
test("api modele leasing referencement work!", async ({ request }) => {
    let response = await request.get(`/api/model/referencement/1/7208/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Leasing Renault Clio v dès")
    expect(res.description).toContain("LOA Renault Clio v à partir de")
})
test("api modele leasing filter groupe work!", async ({ request }) => {
    let response = await request.get(`/api/filter/groupe-of-model/7208`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.groupe).toContain("CLIO")

})
test("api modele leasing tag-schema work!", async ({ request }) => {
    let response = await request.get(`/api/model/tag-schema/1/7208/lease/20`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script ")

})
test("api modele leasing tag-google work!", async ({ request }) => {
    let response = await request.get(`/api/model/tag-google/1/7208/lease`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script>")

})
test("api modele leasing filter generation work!", async ({ request }) => {

    let response = await request.get(`/api/filter/generation?models=%22CLIO%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(resp => {
    const Obj = Object.keys(resp)
        expect(Obj).toContain("id")
        expect(Obj).toContain("nom")
        let nomParams = resp.nom
        expect(nomParams).toContain("CLIO")
    })
})
test("api modele leasing footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/7208/lease/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(2)
    expect(res.linksBas.length).toEqual(6)
    
})

test("api modele leasing menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/utility/7208`)
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
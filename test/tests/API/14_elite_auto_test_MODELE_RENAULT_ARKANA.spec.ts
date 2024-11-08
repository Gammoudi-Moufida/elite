import { test, expect } from '@playwright/test';



test("api modele renault arkana work!", async ({ request }) => {
    let response = await request.get(`/api/model/redirection/1/7857/renault/arkana`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.isUtilitaire)).toBe("boolean")
    expect(typeof (res.toRedirect)).toBe("boolean")
    expect(res.marque).toContain("renault")
    expect(res.newSlug).toContain("arkana")
})

test("api modele renault arkana textrefs work!", async ({ request }) => {
    let response = await request.get(`/api/model/textrefs/1/7857/modelVn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("modelVn")
    expect(res.mark).toContain("Renault")
    expect(res.markId).toBe(1)
    expect(res.model_nom_compl).toContain("ARKANA")
    expect(res.model).toContain("ARKANA")
    expect(res.nomSinguilier).toContain("SUV")
    expect(res.modelVnUrl).toContain("/voiture-renault-1/arkana-7857.html")
    expect(res.modelId).toBe(3156)
    expect(res.img).toContain("/visuel/RENAULT/renault_22arkanarslinesu1bfr_angularfront.png")
    expect(res.imageLink).toContain("/voiture-renault-1.html")
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(parseInt(res.remise)).toBeGreaterThan(0)
    expect(parseInt(res.remise)).toBeLessThan(100)
    expect(res.textTop).toContain("<h2>Votre Renault Arkana neuve au meilleur prix avec Elite Auto</h2><p>\r\nLe premier SUV coupé de la marque au Losange est arrivé chez votre")
    expect(res.title).toContain("Renault Arkana chez votre mandataire")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.subtexttop).toBe("Renault Arkana : Notre gamme de véhicules")
    expect(res.resume).toContain("<p><h2>Achat - Vente de Renault Arkana</h2><p>\r\nElite Auto,")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")

})
test("api modele renault arkana ekomi work!", async ({ request }) => {

    let response = await request.get(`/api/model/modele-ekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})

test("api modele renault arkana referencement work!", async ({ request }) => {

    let response = await request.get(`/api/model/referencement/1/7857/modelVn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Renault Arkana ")
    expect(res.description).toContain("Mandataire automobile pour RENAULT ARKANA, Elite-auto vous permet d'acheter votre renault arkana neuve avec une remise importante. Mandataire spécialiste de la vente de voitures neuves renault arkana")

})
test("api modele renault arkana filter groupe 7857 work!", async ({ request }) => {

    let response = await request.get(`/api/filter/groupe-of-model/7857`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.groupe).toContain("ARKANA")

})

test("api modele renault arkana filter energy work!", async ({ request }) => {

    let response = await request.get(`/api/filter/energy`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(Obj => {
        const ObjectRes = Object.keys(Obj)
        expect(ObjectRes).toContain("id")
        expect(ObjectRes).toContain("libelle")
    })
})

test("api modele renault arkana Vn 21 tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-schema/1/7857/modelVn/21`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})

test("api modele renault arkana Vn tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-google/1/7857/modelVn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
test("api modele renault arkana filter v2 work!", async ({ request }) => {

    let response = await request.get(`/api/filter/v2/model/1`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(filter => {
       const filterObj = Object.keys(filter)
       expect(filterObj).toContain("id")
       expect(filterObj).toContain("nom_compl")

    })
})
test("api modele renault arkana filter generation work!", async ({ request }) => {

    let response = await request.get(`/api/filter/generation?models=%22ARKANA%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(resp => {
       const Obj = Object.keys(resp)
       expect(Obj).toContain("id")
       expect(Obj).toContain("nom")
       let nomParams = resp.nom
       expect(nomParams).toContain("ARKANA")

    })
})
test("api modele renault arkana footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/7857/modelVn/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(1)
    expect(res.linksBas.length).toEqual(8)
})

test("api modele renault arkana menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/new/7857`)
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
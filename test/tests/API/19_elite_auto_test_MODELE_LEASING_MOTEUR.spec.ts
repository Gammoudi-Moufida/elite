import { test, expect } from '@playwright/test';

test("api modele leasing moteur textrefs work!", async ({ request }) => {
    let response = await request.get(`https://leasing.elite-auto.fr/api/model/textrefs/1/7208/marque_modele_offres_motorisation_lease/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("marque_modele_offres_motorisation_lease")
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
    expect(res.title).toContain("Leasing Renault Clio v Clio tce 130 edc fap")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")

})
test("api modele leasing moteur ekomi work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/model/modele-ekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})
test("api entreprise referencement work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/model/referencement/1/7208/marque_modele_offres_motorisation_lease/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toEqual("Renault Clio V clio tce 130 edc fap : Simplicité d’un financement en LLD ou LOA")
    expect(res.description).toContain("Nos meilleures offres de leasing pour la Renault CLIO V Clio tce 130 edc fap avec un loyer à partir de")

})
test("api modele leasing moteur filter 7208 work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/groupe-of-model/7208`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.groupe).toEqual("CLIO") 

})

test("api modele leasing moteur filter type work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/type`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(OB => {
        const Obj = Object.keys(OB)
        expect(Obj).toContain("id")
        expect(Obj).toContain("libelle")
            let idParams = OB.id;
            expect(typeof idParams).toBe ("boolean") 
    })

})

test("api modele leasing moteur filter utilitaire work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/utilitaire`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(OB => {
        const Obj = Object.keys(OB)
        expect(Obj).toContain("id")
        expect(Obj).toContain("libelle")
            let idParams = OB.id;
            expect(typeof idParams).toBe ("boolean") 
    })

})
test("api modele leasing moteur filter marque work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(res => {
        let filterObj =Object.keys(res)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("nom")
    })    
})
test("api modele leasing moteur filter disponibility work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/disponibility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(OB => {
        const Obj = Object.keys(OB)
        expect(Obj).toContain("id")
        expect(Obj).toContain("libelle")
        expect(Obj).toContain("class")
    })

})

test("api modele leasing moteur filter energy work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/energy`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(Obj => {
        const ObjectRes = Object.keys(Obj)
        expect(ObjectRes).toContain("id")
        expect(ObjectRes).toContain("libelle")
    })
})
test("api modele leasing moteur filter sort work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/sort`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(filter => {
        const filterObj = Object.keys(filter)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("libelle")

    })
})
test("api modele leasing moteur tag-schema work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/model/tag-schema/1/7208/marque_modele_offres_motorisation_lease/null/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script ")
})
test("api modele leasing moteur tag-google work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/model/tag-schema/1/7208/marque_modele_offres_motorisation_lease/null/motorisation/clio-tce-130-edc-fap`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script ")
})
test("api modele leasing moteur filter motorisation work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/filter/v2/motorisation?models=%22CLIO%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const motorisationObj = Object.keys(res[0])
    expect(motorisationObj).toContain("motorisation")
})
test("aapi modele leasing moteur footer work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/ventevoiturefooter/7208/marque_modele_offres_motorisation_lease/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(6)
})
test("api modele leasing moteur menugauche work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/menugauche/1/utility/7208`)
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
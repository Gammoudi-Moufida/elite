import { test, expect } from '@playwright/test'

test("api modele occasion CLIO V devis 152805 work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/offreEliteVo/152805`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.isEliteVo)).toBe("boolean")
})
test("api modele occasion CLIO V tags-google work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/google-tag/152805/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain("<script>")
})
test("api modele occasion CLIO V carousel work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/carousel/152805/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.images.forEach(images => {
        const imagesObj = Object.keys(images)
        expect(imagesObj ).toContain("url")
    })
    res.liens.forEach(liens => {
        const liensObj = Object.keys(liens)
        expect(liensObj).toContain("libelle")
        expect(liensObj).toContain("url")
    })
        expect(res.type).toContain("occasion")
        expect(typeof(res.starterreImg)).toBe("boolean")

})

test("api modele tarif peugeot 208 work!", async ({ request }) => {
    let response = await request.get(`/api/v2/devis/init/152805/-1/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.is404)).toBe("boolean")
    expect(typeof (res.isStock)).toBe("boolean")
    expect(typeof (res.activeState)).toBe("boolean")
    expect(res.type).toContain("occasion")
    expect(res.urlToModel).toBe("/vente-voiture/renault-1/clio-iv-6359.html")
})
test("api modele occasion CLIO V devis couleurs work!", async ({ request }) => {
    let response = await request.get(`/api/v2/devis/couleurs/152805/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("occasion")
})
test("api modele occasion CLIO V devis options work!", async ({ request }) => {
    let response = await request.get(`/api/v2/devis/options/152805/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.requestType).toContain("occasion")
    res.guarantees.forEach(guarantee => {
        const guaranteesObj = Object.keys(guarantee)
        expect(guaranteesObj).toContain("puissanceHP")
        expect(guaranteesObj).toContain("prix")
        expect(guaranteesObj).toContain("id")
        expect(guaranteesObj).toContain("duree")
        expect(guaranteesObj).toContain("selected")
        expect(guaranteesObj).toContain("typePayment")
        expect(guaranteesObj).toContain("categoryPrice")
        expect(guaranteesObj).toContain("garantieConstructeur")
    })
    const optionsObj = Object.keys(res.options[0])
    expect(optionsObj).toContain("categ")
    expect(optionsObj).toContain("libelle")
    expect(optionsObj).toContain("id")
    expect(optionsObj).toContain("referencePrixVente")
    expect(optionsObj).toContain("referencePrixCatalogue")
    expect(optionsObj).toContain("packagedEquipements")
    expect(res.societe).toContain("Elite-Auto")
    expect(res.fraisGravage).toBeGreaterThan(0)
    expect(res.newTypeWarantie).toBeGreaterThan(0)
    expect(res.newTypeWarantie).toBe(1)
    expect(res.urlWarantie).toEqual("https://images.elite-auto.fr/garanties/garantieM/garantie.M.Cool.Drive.-8.ans.150.000km.pdf")
})
test("api modele occasion CLIO V devis recap work!", async ({ request }) => {
    let response = await request.get(`/api/v2/devis/recap/152805/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.moteur).toContain("Clio")
    const eqIconesObj = Object.keys(res.eqIcones[0])
    expect(eqIconesObj).toContain("url")
    expect(eqIconesObj).toContain("title")
    expect(res.garantie).toBeGreaterThan(0)
    expect(typeof (res.isOccasion)).toBe("boolean")
    expect(typeof (res.selleries)).toBe("boolean")
    expect(typeof (res.primeCasse)).toBe("boolean")
    expect(typeof (res.reimbursement)).toBe("boolean")
    expect(typeof (res.isExclusiveLOA)).toBe("boolean")
    expect(res.marque).toContain("Renault")
    expect(res.model).toContain("Clio iv")
    expect(res.title).toContain("Renault clio")
    expect(res.documentTitle).toContain("renault clio")
    expect(res.documentDescription).toContain("Renault Clio")
    expect(res.eurotaxId).toBe(1)
    expect(res.titleH1).toContain("Clio")
})
test("api modele occasion CLIO V devis reprise work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/reprise/152805/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.reprises.forEach(reprise => {
        let createEstimationActionParams = reprise.createEstimationAction
        expect(typeof (createEstimationActionParams)).toBe("boolean")
        let selectedParams = reprise.selected
        expect(typeof (selectedParams)).toBe("boolean")
        let repriseNonVisibleParams = reprise.repriseNonVisible
        expect(typeof (repriseNonVisibleParams)).toBe("boolean")
        let primeDeduiteParams = reprise.primeDeduite
        expect(parseInt(primeDeduiteParams)).toBeGreaterThanOrEqual(0)
        let labelParams = reprise.label
        expect(labelParams).toContain("Reprise")
        let titleParams = reprise.title
        expect(titleParams).toContain("La reprise Elite-Occasion")
        let montantParams = reprise.montant
        expect(parseInt(montantParams)).toBeGreaterThan(0)
    })
})
test("api modele occasion CLIO V devis equipements-serie work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/equipements-serie/152805/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const equipementsSerieObj = Object.keys(res.equipementsSerie[0])
    expect(equipementsSerieObj).toContain("id")
    expect(equipementsSerieObj).toContain("name")
    expect(equipementsSerieObj).toContain("equipements")
    expect(res.requestType).toContain("occasion")
})
test("api modele occasion CLIO V devis financement work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/financement/estimation/152805/0/8989/48/2248/20000/0/0/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.financements.forEach(financement=> {
        let mensualiteParams = financement.mensualite
        expect(parseInt(mensualiteParams)).toBeGreaterThan(0)
        let errorParams = financement.error
        expect(errorParams).toBeNull()
    })
})
test("api modele occasion CLIO V devis essais-video work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/essais-video/152805`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.marque).toContain("Renault")
    expect(res.model).toContain("Clio iv")
    expect(res.video).toContain("4iWI1aZm0h8")
})
test("api modele occasion footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/undefined/occasion/occasion_tunnel`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(1)
    expect(res.linksBas.length).toEqual(7)
})
test("api modele occasion CLIO V devis null work!", async ({ request }) => {

    let response = await request.get(`/api/v2/devis/getDeliveryPartners/152805/null`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.error).toEqual(1)
})
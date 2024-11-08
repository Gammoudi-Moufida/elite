import { test, expect } from '@playwright/test';

test("api marque utilitaire referencement work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/referencement/1/renault/utility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Utilitaire Renault neuf : mandataire véhicule utilitaire renault pas cher");
    expect(res.description).toContain("Vente d'utilitaire RENAULT neuf moins cher que chez le concessionnaire avec votre mandataire de véhicule RENAULT. Des remises importantes sur tous les modèles d'utilitaires renault.")
})

test("api marque utilitaire footer work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoiturefooter/1/utility/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(8) 
})

test("api marque utilitaire listvoiture work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/listvoiture/1/utility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)

    res.dataTableOffre.forEach(offre => {
        const offreObj = Object.keys(offre)
        
        expect(offreObj).toContain("marque")
        expect(offreObj).toContain("remise")
        
        let marqueParams = offre.marque
        expect(marqueParams).toEqual("RENAULT")
        let remiseParams = offre.remise
        expect(remiseParams).toBeGreaterThan(0)
        expect(remiseParams).toBeLessThan(100)
    })
})


test("api marque utilitaire Sub-Header work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoituresubheader/1/utility`)
    expect(response.status()).toBe(200)
    const res = await response.json()

    expect(res.mark).toEqual(`Renault`)
    expect(parseInt(res.remise)).toBeGreaterThan(0)
    expect(parseInt(res.remise)).toBeLessThan(100)
    expect(res.image).toContain('/images/logos/marques/logo_renault_new.png')
    expect(res.imageLink).toContain('/voiture-renault-1.html')
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.title).toContain("Mandataire utilitaire Renault neuve")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
    expect(res.avgNote).toBeLessThan(5)
})

test("api marque utilitaire texthaut work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoituretexthaut/1/utility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.itextHaut).toContain("")
})

test("api marque utilitaire textbas work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoituretextbas/1/utility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textBas).toContain("")
})

test("api marque utilitaire ekomi work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})

test("api marque utilitaire menugauche work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/menugauche/1/utility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)

    res.menuTab.forEach(MenuTab => {
        const MenuTabObj = Object.keys(MenuTab)  
        expect(MenuTabObj).toContain("title")
        expect(MenuTabObj).toContain("remise")
        
        let titleParams = MenuTab.title;
        expect(titleParams).toEqual("Reanult")
        let urlParams = MenuTab.url
        expect(urlParams).toContain('renault')
    })
})

test("api marque utilitaire tag-schema work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/tag-schema/1/utility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain(`<script`)

}) 

test("api marque utilitaire tag-google work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoitureavis/1/utility/1`)
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
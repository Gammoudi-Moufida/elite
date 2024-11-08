import { test, expect } from '@playwright/test'

test("api modele tarif peugeot 208 work!", async ({ request }) => {
    let response = await request.get(`/api/model/redirection/2/7265/peugeot/208`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.isUtilitaire)).toBe("boolean")
    expect(typeof (res.toRedirect)).toBe("boolean")
    expect(typeof (res.isEnabled)).toBe("boolean")
    expect(res.marque).toContain("peugeot")
    expect(res.newSlug).toBe("208")
})
test("api modele tarif referencement work!", async ({ request }) => {

    let response = await request.get(`/api/model/referencement-tarif/7265/neuve`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Prix Peugeot 208")
    expect(res.description).toContain("Tous les prix de la PEUGEOT 208 dans les différentes versions neuve : tarif peugeot 208 en concession et prix mandataire avec une remise importante. Comparez le prix neuf de peugeot 208 neuve entre concessionnaire et mandataire.")
})
test("api modele tarif filter groupe work!", async ({ request }) => {

    let response = await request.get(`/api/filter/groupe-of-model/7265`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.groupe).toContain('208')
})
test("api modele tarif 7265 neuve work!", async ({ request }) => {

    let response = await request.get(`/api/model/voitureneuve-tarif/2/7265/neuve`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.mark).toEqual(`Peugeot`)
    expect(res.markId).toEqual(15)
    expect(res.model).toEqual(`208`)
    expect(res.nomSinguilier).toContain(`CITADINE`)
    expect(res.modelId).toEqual(2627)
    expect(res.image).toContain('/images/logos/marques/logo_peugeot_new.png')
    expect(res.imageLink).toContain('/voiture-peugeot-2.html')
    expect(res.modelVnUrl).toContain('/vente-voiture/peugeot-2/208-7265.html')
    expect(res.bigImageLink).toContain('/voiture-peugeot-2/208-7265.html')
    expect(parseInt(res.remise)).toBeGreaterThan(0)
    expect(parseInt(res.remise)).toBeLessThan(100)
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(parseInt(res.pireprixremise)).toBeGreaterThan(0)
    expect(parseInt(res.meilleurprixremise)).toBeLessThan(100)
    expect(res.title).toEqual(`Tarif citadine Peugeot 208 neuve`)
    // expect(res.textTop).toContain(/La Peugeot 208 à un prix compétitif avec Elite-Auto/)
    expect(parseInt(res.meilleur_loyer)).toBeGreaterThan(0)
    const couleursObj = Object.keys(res.couleurs[0])
    expect(couleursObj).toContain("libelle")
    expect(couleursObj).toContain("imgColorSrc")
    expect(couleursObj).toContain("imgPhotoUrl")

    expect(res.titre).toContain("Information")
    expect(res.texte).toContain("Exemple à titre indicatif et sans valeur contractuelle pour une Location longue durée ")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
    expect(res.img).toContain("https://images.elite-auto.fr/visuel/PEUGEOT/peugeot_20e208gthb2b_angularfront.png")
})

test("api modele tarif footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/7265/tarif/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(8)

})

test("api modele tarif menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/2/new/7265`)
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
test("api marque import tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-schema/2/7265/tarif/94`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})
test("api modele tarif tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-google/2/7265/tarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
test("api modele tarif filter generation work!", async ({ request }) => {

    let response = await request.get(`/api/filter/generation?models=%22208%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(resp => {
        const Obj = Object.keys(resp)
        expect(Obj).toContain("id")
        expect(Obj).toContain("nom")
        let nomParams = resp.nom;
        expect(nomParams).toContain("208")
    })
})

test("api modele tarif filter v2 15 work!", async ({ request }) => {

    let response = await request.get(`/api/filter/v2/model/15`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(filter => {
        const filterObj = Object.keys(filter)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("nom_compl")

    })
})
import { test, expect } from '@playwright/test';


test("api marque renault Vn referencement work!", async ({ request }) => {
    let response = await request.get(`/api/marque/referencement/1/renault/marqueVn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Mandataire Renault")
    expect(res.description).toContain("Elite-Auto, mandataire automobile RENAULT, vous permet d'acheter votre RENAULT moins chère grâce à de remises exceptionnelles. Acheter une RENAULT neuve en stock ou sur commande avec un mandataire automobile.")
})
test("api marque renault Vn footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/1/marqueVn/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(3)
    expect(res.linksBas.length).toEqual(8)
})
test("api marque renault Vn listvoiture work!", async ({ request }) => {

    let response = await request.get(`/api/marque/listvoiture/1/marqueVn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.marqueId).toEqual(1)
    expect(res.marqueName).toEqual("Renault")
    expect(res.title).toEqual("NOTRE GAMME DE MODÈLES RENAULT")
    res.dataTableOffre.forEach(offre => {
        const offreObj = Object.keys(offre)
        
        expect(offreObj).toContain("marque")
        expect(offreObj).toContain("photoAlt")
        expect(offreObj).toContain("urlMod")
        expect(offreObj).toContain("avis")
        expect(offreObj).toContain("remise")
        expect(offreObj).toContain("prix")
        let marqueParams = offre.marque
        expect(marqueParams).toEqual("RENAULT")
        let photoAltParams = offre.photoAlt
        expect(photoAltParams).toContain(`Renault`)
        let urlModParams = offre.urlMod
        expect(urlModParams).toContain(`/voiture-renault-1/`)
        let avisParams = offre.avis
        expect(avisParams).toBeGreaterThanOrEqual(0)
        let remiseParams = offre.remise
        expect(parseInt(remiseParams)).toBeGreaterThanOrEqual(0)
        expect(parseInt(remiseParams)).toBeLessThan(100)
        let prixParams = offre.prix
        expect(prixParams).toBeGreaterThanOrEqual(0)
    })
})

test("api marque renault Vn Sub-Header work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituresubheader/1/marqueVn`)
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
    expect(res.title).toContain("Mandataire Renault neuve")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
    expect(res.avgNote).toBeLessThan(5)
})
test("api marque renault Vn texthaut work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretexthaut/1/marqueVn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textHaut).toContain(`<h2>Votre voiture neuve avec un mandataire auto Renault</h2>\r\n<p>\r\n Elite Auto, référence sur le marché automobile du neuf et de l'occasion en France, vous permet d'acheter votre nouvelle voiture au prix le plus intéressant. Grâce à un réseau professionnel de confiance et une expertise de mandataire Renault reconnue, nous vous proposons le meilleur du constructeur automobile au losange avec une sélection des modèles phares et des gammes les plus récentes y compris les modèles Renault sport. En choisissant Elite Auto comme mandataire auto Renault, vous profitez à la fois de la qualité de la production française et de réductions exclusives pour l'<a href=\"/\">achat de voiture</a>, afin de vous faire plaisir au meilleur prix dans un véhicule de marque renault. \r\n</p>`)
    
})

test("api marque renault Vn textbas work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretextbas/1/marqueVn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textBas).toContain(`<h2>Les avantages de votre mandataire Renault</h2>\r\n<p>\r\nPour l'achat d'une voiture neuve, les concessions de la marque ne sont pas les seuls interlocuteurs possibles. En effet, d'autres circuits peuvent vous permettre de profiter de nombreux avantages. Avec un mandataire auto Renault, qui interviendra pour vous auprès des concessionnaires, vous cumulez les plus-values, à commencer par celle de l'investissement. En effet, en partageant avec nous votre projet d'acheter une nouvelle voiture, nous pourrons vous proposer le modèle qui vous plait à prix négocié: vous pourrez ainsi bénéficier d'une`)
    
})

test("api marque renault ekomi work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")    
})

test("api marque renault Vn menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/marqueVn`)
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

test("api marque renault Vn tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-schema/1/new_ref_marques`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})

test("api marque renault Vn tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-google/1/new_ref_marques`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
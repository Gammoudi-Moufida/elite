import { test, expect } from '@playwright/test';
test("api marque pas chere referencement work!", async ({ request }) => {
    let response = await request.get(`/api/marque/referencement/1/renault/marqueMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain(`Renault neuve et pas chère : nos prix discount | Elite-Auto.fr`)
    expect(res.description).toContain(`Une RENAULT neuve et pas chère à prix discount c'est possible avec votre mandataire auto. Elite-auto.fr vous propose de nombreux véhicules neufs moins chers de marque renault.`)
})

test("api marque pas chere footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/1/marqueMoinsCherRewrite/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(8)

})

test("api marque pas chere listvoiture work!", async ({ request }) => {
    let response = await request.get(`/api/marque/listvoiture/1/marqueMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(1)
    expect(res.marqueName).toEqual(`Renault`)
    expect(res.title).toEqual(`NOTRE GAMME DE MODÈLES RENAULT`)
 res.dataTableOffre.forEach(offre => {
    const offreObj = Object.keys(offre)
    
    expect(offreObj).toContain("marque")
    expect(offreObj).toContain("remise")
    expect(offreObj).toContain("avis")
    expect(offreObj).toContain("photoAlt")
    expect(offreObj).toContain("urlMod")

    let marqueParams = offre.marque
    expect(marqueParams).toEqual("RENAULT")
    let photoAltParams = offre.photoAlt
    expect(photoAltParams).toContain(`Renault`)
    let urlModParams = offre.urlMod
    expect(urlModParams).toContain(`RENAULT`)
    let remiseParams = offre.remise
    expect(parseInt(remiseParams)).toBeGreaterThan(0)
    expect(parseInt(remiseParams)).toBeLessThan(100)
    let prixParams = offre.prix
    expect(parseInt(prixParams)).toBeGreaterThan(0)
    let avisParams = offre.avis
    expect(avisParams).toBeGreaterThanOrEqual(0)
   
})
})
test("api leasing marque subheader work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituresubheader/1/marqueMoinsCherRewrite`)
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
    expect(res.title).toContain("Renault pas chère : votre voiture neuve avec Elite-Auto")
    expect(res.nbAvis).toBeGreaterThan(0)
    expect(res.avgNote).toBeGreaterThan(0)
})
test("api marque pas chere texthaut work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretexthaut/1/marqueMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textHaut).toEqual(`<p>\r\nPour l'achat de votre prochaine voiture, la concession de la marque au losange n'est pas votre seule option : si vous recherchez un modèle Renault moins cher tout en restant dans le neuf, Elite-Auto met à votre disposition son expertise de mandataire. Vous pourrez ainsi trouver votre voiture préférée à un tarif Renault discount, négocié pour vous par nos experts.\r\n</p>`)
})
test("api marque pas chere textbas work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoituretextbas/1/marqueMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.textBas).toContain(`<h2>Prenez le volant d'une Renault neuve pas chère</h2>\r\n<p>\r\nSe faire plaisir avec une Renault pas chère et pourtant achetée neuve n'a rien d'impossible avec nos services de mandataire réputés dans toute la France. En effet, lorsque vous prévoyez d'acheter un nouveau véhicule, quelle qu'en soit la raison (l'ancien est à la casse, votre famille s'agrandit ou vous avez simplement envie de changement), vous trouverez dans notre catalogue de nombreux modèles du constructeur français proposés à des prix discount. Ces réductions exceptionnelles, nous les obtenons grâce à un réseau de partenaires de confiance, avec lesquels nous pouvons vous négocier un modèle Renault pas cher tout en prenant en compte vos exigences.`)
})

test("api marque pas chere ekomi work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoitureekomi`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const avisObj = Object.keys(res.listeEkomi[0])
    expect(avisObj).toContain("rate")
    expect(avisObj).toContain("review")
    expect(avisObj).toContain("reviewDate")
})

test("api marque pas chere menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/marqueMoinsCherRewrite`)
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

test("api marque pas chere tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-schema/1/marqueMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})

test("api marque pas chere tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/marque/tag-google/1/marqueMoinsCherRewrite`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
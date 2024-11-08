import { test, expect } from '@playwright/test';

test("api modele VN moteur referencement work!", async ({ request }) => {

    let response = await request.get(`/api/model/referencement-tarif/7208/diesel`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain(" : consultez le Tarif de la renault clio v diesel neuve par mandataire")
    expect(res.description).toContain("Tous les prix de la RENAULT CLIO V dans les différentes versions diesel : tarif renault clio v en concession et prix mandataire avec une remise importante. Comparez le prix neuf de renault clio v diesel entre concessionnaire et mandataire.")

})
test("api modele tarif carburant diesel work!", async ({ request }) => {
    let response = await request.get(`/api/model/voitureneuve-tarif/1/7208/diesel`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.mark).toContain("Renault")
    expect(res.markId).toBe(1)
    expect(res.model).toContain("Clio v")
    expect(res.nomSinguilier).toContain("CITADINE")
    expect(res.modelId).toBe(2576)
    expect(res.modelVnUrl).toContain("/vente-voiture/renault-1/clio-v-7208.html")
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(res.imageLink).toContain("/voiture-renault-1.html")
    expect(res.bigImageLink).toContain("/voiture-renault-1/clio-v-7208.html")
    expect(res.title).toContain("Tarif Renault Clio v Diesel neuve")
    expect(res.remise).toBeNull()
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(parseInt(res.pireprixremise)).toBe(24295)
    expect(parseInt(res.meilleurprixremise)).toBe(24)
    expect(res.textTop).toContain("<h2 class='upper'>PRIX ET TARIF RENAULT CLIO V DIESEL PAR MANDATAIRE</h2><p>Découvrez le <strong>prix de la RENAULT Clio v diesel neuve</strong")
    expect(res.textBas).toContain("");
    expect(res.aFuel).toContain("diesel")
    expect(parseInt(res.meilleur_loyer)).toBeGreaterThan(0)
    
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")

    const couleursObj = Object.keys(res.couleurs[0])
    expect(couleursObj).toContain("libelle")
    expect(couleursObj).toContain("imgColorSrc")
    expect(couleursObj).toContain("imgPhotoUrl")
    expect(res.titre).toContain("Information")
    expect(res.texte).toContain("Exemple à titre indicatif et sans valeur contractuelle pour une Location longue durée")
    expect(res.img).toContain("https://images.elite-auto.fr/visuel/RENAULT/renault_20clioeditiononehb5b_angularfront.png")

})
test("api modele tarif carburant diesel footer work!", async ({ request }) => {
    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoiturefooter/7208/tarifCarburant/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(2)
    expect(res.linksBas.length).toEqual(8)
}) 
test("api modele leasing moteur filter type work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/type`)
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
test("api modele tarif carburant diesel filter utilitaire work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/utilitaire`)
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

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(res => {
        let filterObj =Object.keys(res)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("nom")
    })    
})
test("api modele tarif carburant diesel filter energy work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/energy`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(Obj => {
        const ObjectRes = Object.keys(Obj)
        expect(ObjectRes).toContain("id")
        expect(ObjectRes).toContain("libelle")
    })
})
test("api modele tarif carburant diesel filter disponibility work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/disponibility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(OB => {
        const Obj = Object.keys(OB)
        expect(Obj).toContain("id")
        expect(Obj).toContain("libelle")
        expect(Obj).toContain("class")
    })

})
test("api modele tarif carburant diesel filter sort work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/sort`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(filter => {
        const filterObj = Object.keys(filter)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("libelle")

    })
})

test("api modele tarif carburant diesel menugauche work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/menugauche/1/new/7208`)
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
test("api modele tarif carburant diesel tag-schema work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/tag-schema/1/7208/tarif/1`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})
test("api modele tarif carburant diesel tag-google work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/tag-google/1/7208/tarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})

test("api modele tarif carburant diesel filter model 1 work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/v2/model/1`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(filter => {
       const filterObj = Object.keys(filter)
       expect(filterObj).toContain("id")
       expect(filterObj).toContain("nom_compl")

    })
})
test("api modele tarif carburant diesel filter generation work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/generation?models=%22CLIO%22`)
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
test("api home auto-discount bandeau-haut work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/bandeauhaut/www`)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

})
test("api home AUTO DISCOUNT promo work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/pagepromo/www`)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const res = await response.json()
    expect(typeof (res['status'])).toBe("boolean")

})
test("api modele tarif carburant autre clio-v work!", async ({ request }) => {
    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/redirection/1/7208/renault/clio-v`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.isUtilitaire)).toBe("boolean")
    expect(typeof (res.toRedirect)).toBe("boolean")
    expect(typeof (res.isEnabled)).toBe("boolean")
    expect(res.marque).toContain("renault")
    expect(res.newSlug).toBe("clio-v")
})
test("api modele leasing referencement work!", async ({ request }) => {
    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/referencement-tarif/7208/autre`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain(" : consultez le Tarif de la renault clio v autre neuve par mandataire")
    expect(res.description).toContain("Tous les prix de la RENAULT CLIO V dans les différentes versions autre : tarif renault clio v en concession et prix mandataire avec une remise importante. Comparez le prix neuf de renault clio v autre entre concessionnaire et mandataire.")
})
test("api modele tarif carburant autre filter groupe work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/groupe-of-model/7208`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.groupe).toEqual("CLIO") 

})
test("api modele tarif carburant autre work!", async ({ request }) => {
    let response = await request.get(`/api/model/voitureneuve-tarif/1/7208/autre`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.mark).toContain("Renault")
    expect(res.markId).toBe(1)
    expect(res.model).toContain("Clio v")
    expect(res.nomSinguilier).toContain("CITADINE")
    expect(res.modelId).toBe(2576)
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(res.imageLink).toContain("/voiture-renault-1.html")
    expect(res.modelVnUrl).toContain("/vente-voiture/renault-1/clio-v-7208.html")
    expect(res.bigImageLink).toContain("/voiture-renault-1/clio-v-7208.html")
    expect(res.title).toContain("Tarif Renault Clio v Autre neuve")
    expect(res.textTop).toContain("<h2 class='upper'>PRIX ET TARIF RENAULT CLIO V AUTRE PAR MANDATAIRE</h2><p>Découvrez le <strong>prix de la RENAULT Clio v autre neuve</strong> suivant les différentes finitions. Vous pouvez comparer le tarif proposé par le concessionnaire RENAULT à celui que vous pouvez obtenir en achetant votre renault clio v par votre mandataire RENAULT. La plupart des finitions de la Renault clio v autre sont proposées. Découvrez nos meilleurs tarifs pour une CLIO V autre Evolution.</p>")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(parseInt(res.pireprixremise)).toBeGreaterThan(0)
    expect(parseInt(res.meilleurprixremise)).toBeGreaterThan(0)
    expect(res.aFuel).toContain("gpl / gnv")
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
})
test("api marque leasing menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/new/7367`)
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
test("api modele tarif carburant electrique zoe work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/redirection/1/7367/renault/zoe`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.toRedirect)).toBe("boolean")
    expect(res.marque).toContain("renault")
    expect(res.newSlug).toContain("zoe") 

})
test("api modele tarif carburant electrique filter groupe work!", async ({ request }) => {

    let response = await request.get(`/api/filter/groupe-of-model/7367`)
    expect(response.status()).toBe(200)
   
})
test("api modele tarif carburant electrique work!", async ({ request }) => {
    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/voitureneuve-tarif/1/7367/electrique`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.mark).toContain("Renault")
    expect(res.markId).toBe(1)
    expect(res.model).toContain("Zoe")
    expect(res.nomSinguilier).toContain("CITADINE")
    expect(res.modelId).toBe(2717)
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    expect(res.imageLink).toContain("/voiture-renault-1.html")
    expect(res.modelVnUrl).toContain("/www.elite-auto.fr/vente-voiture/renault-1/zoe-7367.html")
    expect(res.bigImageLink).toContain("/voiture-renault-1/zoe-7367.html")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.aFuel).toContain("electrique")
    expect(res.meilleur_loyer).toContain("nous contacter")
    expect(res.titre).toContain("Information")
    expect(res.texte).toContain("Cliquez pour accéder à l'ensemble des mentions légales.")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
})
test("api modele tarif carburant electrique referencement work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/referencement-tarif/7367/electrique`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain(": consultez le Tarif de la renault zoe electrique neuve par mandataire")
    expect(res.description).toContain("Tous les prix de la RENAULT ZOE dans les différentes versions electrique : tarif renault zoe en concession et prix mandataire avec une remise importante. Comparez le prix neuf de renault zoe electrique entre concessionnaire et mandataire.")

})
test("api modele tarif carburant electrique footer work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoiturefooter/7367/tarifCarburant/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(2)
    expect(res.linksBas.length).toEqual(8)

})
test("api modele tarif carburant electrique tag-schema work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/tag-schema/1/7367/tarif/null`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')

})
test("api modele tarif carburant electrique tag-google work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/model/tag-google/1/7367/tarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')

})
test("api modele tarif carburant electrique filter generation work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/filter/generation?models=%22ZOE%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(resp =>{
        const Obj = Object.keys(resp)
        expect(Obj).toContain("id")
        expect(Obj).toContain("nom")
        let nomParams = resp.nom
        expect(nomParams).toContain("ZOE")
    })
})
test("api modele tarif carburant corolla-hybride work!", async ({ request }) => {
    let response = await request.get(`/api/model/redirection/29/8078/toyota/corolla-hybride-my22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof (res.isUtilitaire)).toBe("boolean")
    expect(typeof (res.toRedirect)).toBe("boolean")
    expect(typeof (res.isEnabled)).toBe("boolean")
    expect(res.marque).toContain("toyota")
    expect(res.newSlug).toBe("corolla-hybride-my22")
})
test("api modele tarif carburant hybride referencement work!", async ({ request }) => {

    let response = await request.get(`/api/model/referencement-tarif/8078/hybride`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Prix Toyota Corolla hybride")
    expect(res.description).toContain("Tous les prix de la TOYOTA COROLLA HYBRIDE ")

})

test("api modele tarif carburant hybride filter groupe work!", async ({ request }) => {

    let response = await request.get(`/api/filter/groupe-of-model/8078`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.groupe).toContain("COROLLA")
})
test("api modele tarif carburant hybride work!", async ({ request }) => {
    let response = await request.get(`/api/model/voitureneuve-tarif/29/8078/hybride`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.mark).toContain("Toyota")
    expect(res.markId).toBe(23)
    expect(res.model).toContain("Corolla hybride")
    expect(res.nomSinguilier).toContain("COMPACTE")
    expect(res.modelId).toBe(3354)
    expect(res.image).toContain("/images/logos/marques/logo_toyota_new.png")
    expect(res.imageLink).toContain("/voiture-toyota-29.html")
    expect(res.bigImageLink).toContain("/voiture-toyota-29/corolla-hybride-my22-8078.html")
    expect(res.modelVnUrl).toContain("/vente-voiture/toyota-29/corolla-hybride-my22-8078.html")
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.pireprixremise).toBeNull()
    expect(parseInt(res.meilleurprixremise)).toBeGreaterThanOrEqual(0)
    expect(res.title).toContain("arif Toyota Corolla hybride ")
    expect(res.textTop).toContain("<h2 class='upper'>PRIX ET TARIF TOYOTA COROLLA HYBRIDE HYBRIDE PAR MANDATAIRE</h2>")
    expect(res.aFuel).toContain("hybride")
    expect(res.meilleur_loyer).toContain("nous contacter")
    expect(res.titre).toContain("Information")
    expect(res.texte).toContain("Cliquez pour accéder à l'ensemble des mentions légales.")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")
    expect(res.img).toContain("https://images.elite-auto.fr/visuel/TOYOTA/toyota_19corollahybpremhb12b_angularfront.png")

})
test("api modele tarif carburant hybride footer work!", async ({ request }) => {
    let response = await request.get(`/api/marque/ventevoiturefooter/8078/tarifCarburant/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(2)
    expect(res.linksBas.length).toEqual(8)
}) 
test("api modele tarif carburant hybride menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/29/new/8078`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.marqueId)).toBe(23)
    expect(res.marqueName).toEqual(`Toyota`)
    res.menuTab.forEach(menu => {
        const menuTabObj = Object.keys(menu)
        expect(menuTabObj).toContain("title")
        expect(menuTabObj).toContain("url")
        let titleParams = menu.title
        expect(titleParams).toContain("Toyota")
        let urlParams = menu.url
        expect(urlParams).toContain(`toyota`)
    })
})
test("api modele tarif carburant hybride tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-schema/29/8078/tarif/8`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')

})
test("api modele tarif carburant hybride tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-google/29/8078/tarif`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')

})
test("api modele tarif carburant hybride filter model 23 work!", async ({ request }) => {

    let response = await request.get(`/api/filter/v2/model/23`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(resp=>{
        const filterObj = Object.keys(resp)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("nom_compl")
    })
})
test("api modele tarif carburant hybride filter generation work!", async ({ request }) => {

    let response = await request.get(`/api/filter/generation?models=%22COROLLA%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(resp => {
    const Obj = Object.keys(resp)
        expect(Obj).toContain("id")
        expect(Obj).toContain("nom")
        let nomParams = resp.nom
        expect(nomParams).toContain("HYBRID")
    })
})
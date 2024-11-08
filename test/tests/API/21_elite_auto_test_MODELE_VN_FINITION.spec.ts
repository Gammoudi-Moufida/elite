import { test, expect } from '@playwright/test';

test("api modele VN finition textrefs work!", async ({ request }) => {
    let response = await request.get(`/api/model/textrefs/1/7208/marque_modele_offres_finition_vn/finition/initiale-paris`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("marque_modele_offres_finition_vn")
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
    expect(res.title).toContain("Renault Clio v initiale paris")
    // expect(res.textTop).toContain(`<h2>Votre Renault Clio v neuve au meilleur prix avec Elite Auto</h2>\r\n<p>\r\nLe constructeur Renault a levé le voile début 2019 sur sa nouvelle citadine : la Renault Clio 5. Elle vient remplacée la Clio 4 après 7 ans de carrière (apparue en 2012). La concurrente de la Peugeot 208 se renouvelle pour tenter de conserver le podium des ventes sur le marché français des citadines. Sous la direction de Laurens van den Acker (directeur du design Renault), la nouvelle Renault Clio évolue peu à l'extérieur. On note l'apparition de la nouvelle signature lumineuse avec les phares LED C-Shape ou encore la disparition de la quatrième vitre latérale au niveau de l'emplacement des poignées de portes arrière. La révolution stylistique de cette Renault Clio neuve se trouve à l'intérieur avec un habitacle totalement revu. On note une réelle progression dans la qualité perçue : plastiques moussés, touches piano, écran multimédia central de 9,3 pouces ou encore compteurs numériques avec écran de 7 à 10 pouces. A noter que l'écran central propose le système d'info-divertissement Smart Cockpit et que la console centrale pourra intégrer un espace de chargement par induction pour téléphone portable. A bord, cette voiture Renault progresse en habitabilité et offre un coffre de 391 litres. La plateforme CMF-B permet à la nouvelle génération de Clio de proposer une version hybride e-Tech. Cette version essence électrique d'environ 130ch sera disponible courant 2020 avec une batterie de 1,2kWh. Le constructeur Renault annonce 80% de temps de trajet en électrique lors d’un parcours urbain. Si vous cherchez une <a href=\"https:\/\/www.elite-auto.fr\/automobile\/hybride\/categorie-citadine\">citadine hybride</a>, cette nouvelle clio pourrait répondre à vos attentes. Les autres motorisations essence Sce ou essence Tce et diesel blue dCi sont proposés avec des puissances entre 65 ch et 130 ch. A noter qu'un moteur GPL sera également disponible et que la boîte de vitesse sera manuelle, à double embrayage ED7 vitesses ou à variation continue X-Tronic selon les motorisations.\r\n</p>`)
    const menuObj = Object.keys(res.menu[0])
    expect(menuObj).toContain("text")
    expect(menuObj).toContain("url")
    expect(res.textTop).toContain("<h2>Nos meilleures offres pour la citadine Renault Clio v initiale paris</h2>")
    expect(res.subtexttop).toContain("Renault Clio v : Notre gamme de véhicules")
    const listeEkomiObj = Object.keys(res.listeEkomi[0])
    expect(listeEkomiObj).toContain("rate")
    expect(listeEkomiObj).toContain("review")
    expect(listeEkomiObj).toContain("reviewDate")

})
test("api modele VN finition referencement work!", async ({ request }) => {

    let response = await request.get(`/api/model/referencement/1/7208/marque_modele_offres_finition_vn/finition/initiale-paris`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.title).toContain("Renault Clio V initiale paris : découvrez la citadine Renault")
    expect(res.description).toContain("Nos meilleures offres pour la Renault CLIO V Initiale paris neuve.")

})
test("api modele VN finition tag-schema work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-schema/1/7208/marque_modele_offres_finition_vn/null/finition/initiale-paris`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script ')
})
test("api modele VN finition tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/model/tag-google/1/7208/marque_modele_offres_finition_vn/finition/initiale-paris`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toContain('<script>')
})
test("api modele VN finition work!", async ({ request }) => {

    let response = await request.get(`/api/filter/v2/finition?models=%22CLIO%22`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const finitionObj = Object.keys(res[0])
    expect(finitionObj).toContain('finition')
})
test("api modele VN finition footer work!", async ({ request }) => {

    let response = await request.get(`api/marque/ventevoiturefooter/7208/marque_modele_offres_finition_vn/modele`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(1)
    expect(res.linksBas).toHaveLength(8)
})
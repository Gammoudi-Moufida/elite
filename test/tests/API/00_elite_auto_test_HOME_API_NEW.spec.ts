import { test, expect } from '@playwright/test';

test("api home referencement work!", async ({ request }) => {

    let response = await request.get(`/api/home/referencement/www`)

    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res['bestDiscount'])).toBeGreaterThan(20)
    expect(parseInt(res['bestDiscount'])).toBeLessThan(60)
    expect(res['description']).toContain("Votre véhicule jusqu'à")
    expect(res['h1Page']).toEqual(`Votre voiture neuve ou d'occasion avec un mandataire automobile`)
    expect(res['altLogoHomeOpti']).toEqual("Mandataire auto Elite-Auto")

})

test("api home tag-google work!", async ({ request }) => {

    let response = await request.get(`/api/home/tags-google`)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res['content']).toContain("<script>")

})

test("api home tag-home work!", async ({ request }) => {

    let response = await request.get(`/api/home/tags-home`)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res['content']).toContain("<script")

})

test("api home AUTO DISCOUNT promo work!", async ({ request }) => {

    let response = await request.get(`/api/home/pagepromo/www`)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const res = await response.json()
    expect(typeof (res['status'])).toBe("boolean")

})

test("api home auto-discount bandeau-haut work!", async ({ request }) => {

    let response = await request.get(`/api/home/bandeauhaut/www`)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)

})

test("api home listeavis work!", async ({ request }) => {

    let response = await request.get(`/api/home/listeavis/`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const avisObj = Object.keys(res[0])
    expect(avisObj).toContain("rate")
    expect(avisObj).toContain("review")
    expect(avisObj).toContain("reviewDate")
})

test("api home info work!", async ({ request }) => {

    let response = await request.get(`/api/home/info/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toEqual("new")
    expect(parseInt(res.meilleureRemise)).toBeGreaterThan(20)
    expect(parseInt(res.meilleureRemise)).toBeLessThan(60)
    expect(res.h1Page).toContain("VOTRE VOITURE NEUVE AVEC UN MANDATAIRE AUTO")
    

})

test("api home recherche work!", async ({ request }) => {

    let response = await request.post(`/api/search/`, {
        data:
        {
            "_source": false,
            "from": 0,
            "size": 0,
            "query": {
                "filtered": {
                    "filter": {
                        "or": [
                            {
                                "and": [
                                    {
                                        "term": {
                                            "vo": true
                                        }
                                    },
                                    {
                                        "term": {
                                            "isIndexableElastica": true
                                        }
                                    }
                                ]
                            },
                            {
                                "term": {
                                    "IsEnabledOrReservedClient": true
                                }
                            }
                        ]
                    }
                }
            },
            "filter": {
                "and": [
                    {
                        "or": [
                            {
                                "query": {
                                    "match": {
                                        "disponibiliteForFO": {
                                            "query": "en stock"
                                        }
                                    }
                                }
                            },
                            {
                                "query": {
                                    "match": {
                                        "disponibiliteForFO": {
                                            "query": "en arrivage"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    })
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.hits.total)).toBeGreaterThan(0)

})

test("api home brands work!", async ({ request }) => {

    let response = await request.get(`/api/home/brands/v2/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.brands).toHaveLength(10)
    const brandsObj = Object.keys(res.brands[0])
    expect(brandsObj).toContain("name")
    expect(brandsObj).toContain("url")
    expect(res.models).toHaveLength(6)
    const modelObj = Object.keys(res.models[0])
    expect(modelObj).toContain("name")
    expect(modelObj).toContain("remise")
    expect(modelObj).toContain("url")
    expect(modelObj).toContain("photoUrl")
})

test("api home slider work!", async ({ request }) => {

    let response = await request.get(`/api/home/slider/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const sliderObj = Object.keys(res[0])
    expect(sliderObj).toContain("img")
    expect(sliderObj).toContain("url")
    expect(sliderObj).toContain("titre")
    expect(sliderObj).toContain("type")
})

test("api home footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/null/new/home`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(3)
    expect(res.linksBas).toHaveLength(8)

})

test("api home liste nouveau auto work!", async ({ request }) => {

    let response = await request.get(`/api/home/listenouveaute/v2/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.nouveautes).toHaveLength(4)
    const listObj = Object.keys(res.nouveautes[0])
    expect(listObj).toContain("marqueName")
    expect(listObj).toContain("modelName")
    expect(listObj).toContain("url")
    expect(listObj).toContain("photoUrl")
    expect(listObj).toContain("bestRentForModel")
    expect(listObj).toContain("meilleurRemiseNouveaux")
    expect(listObj).toContain("bestPrice")

})

test("api home listeoccasion work!", async ({ request }) => {

    let response = await request.get(`/api/home/listeoccasion/v2`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res).toHaveLength(6)
    const listObj = Object.keys(res[0])
    expect(listObj).toContain("marqueName")
    expect(listObj).toContain("modelName")
    expect(listObj).toContain("finition")
    expect(listObj).toContain("libGarantie")
    expect(listObj).toContain("version")
    expect(listObj).toContain("mec")
    expect(listObj).toContain("km")
    expect(listObj).toContain("prix")
    expect(listObj).toContain("url")
    expect(listObj).toContain("photoUrl")

})

test("api home centrelivraison work!", async ({ request }) => {

    let response = await request.get(`/api/home/centrelivraison/`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listObj = Object.keys(res)
    expect(listObj).toContain("parisUrl")
    expect(listObj).toContain("lyonUrl")
    expect(listObj).toContain("aepUrl")
    expect(listObj).toContain("loaUrl")
    expect(listObj).toContain("centresLivreur")
    expect(listObj).toContain("home_reprise_url")

})

test("api home confiance work!", async ({ request }) => {

    let response = await request.get(`/api/home/confiance/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(function (DTO) {
        const DTOObj = Object.keys(DTO)
        expect(DTOObj).toContain("title")
        expect(DTOObj).toContain("content")
    });
})

test("api home recompense work!", async ({ request }) => {

    let response = await request.get(`/api/home/recompense/www`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.recompense.forEach(function (recompense) {
        const recompenseObj = Object.keys(recompense);
        expect(recompenseObj).toContain("title")
        expect(recompenseObj).toContain("content")
        expect(recompenseObj).toContain("url")
        expect(recompenseObj).toContain("class")
    });
    expect(res.satisfait_rembourse_url).toContain("/satisfait-ou-rembourse.asp");
    expect(res.title).toContain("mandataire auto");
    expect(res.type).toContain("new");

})

test("api home infoPromo work!", async ({ request }) => {
    let response = await request.get(`/api/home/infoPromo`)
    expect(response.status()).toBe(200)
    const res = await response.json()
   
    const infoPromoObj = Object.keys(res[0])
    expect(infoPromoObj).toContain("img1")
    expect(infoPromoObj).toContain("img2")
    expect(infoPromoObj).toContain("img3")
    expect(infoPromoObj).toContain("encartPromotion")
    expect(typeof res[0].encartPromotion).toBe("boolean")
    expect(typeof res[0].encartPromotion).toBeTruthy()
})

test("api home VN work!", async ({ request }) => {
    let response = await request.get(`/api/home/infos/vn`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.categories.forEach(function ( categorie) {
        const categorieObj = Object.keys(categorie);
        expect(categorieObj).toContain("name")
        expect(categorieObj).toContain("url")
        expect(categorieObj).toContain("urlImg")
        expect(categorieObj).toContain("bestRent")
    });

    res.cards.forEach(function ( card) {
        const cardObj = Object.keys(card);
        expect(cardObj).toContain("title")
        expect(cardObj).toContain("lien")
        expect(cardObj).toContain("urlImgLarge")
        expect(cardObj).toContain("urlImgSmall")
        expect(cardObj).toContain("content")
    });
})
    test("api home new footer work!", async ({ request }) => {
        let response = await request.get(`/api/footer/null/null/null/null/new/home`)
        expect(response.status()).toBe(200)
        const res = await response.json()
        expect(res.dataFooter.length).toEqual(3)
        expect(res.linksBas.length).toEqual(8)
    })  

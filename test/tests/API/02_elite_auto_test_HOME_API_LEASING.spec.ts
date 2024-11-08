import { test, expect } from '@playwright/test';


test("api home leasing bandeau-haut work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/bandeauhaut/leasing`)

    expect(response.status()).toBe(200)
})

test("api home pagepromo work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/pagepromo/leasing`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof res['status']).toBe("boolean")

})

test("api leasing tag-Google work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/tags-google`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res['content']).toContain("<script")

})


test("api leasing tag-home work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/tags-home`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res['content']).toContain("<script")
})

test("api leasing referencement work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/referencement/leasing`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.bestDiscount)).toBeGreaterThanOrEqual(0)
    expect(res.title).toEqual("Leasing voiture neuve ou d'occasion : LOA, LLD avec ou sans apport")
    expect(res.description).toEqual("Un leasing auto vous permet de rouler dans un véhicule neuf ou d'occasion avec ou sans apport ☎ 01.30.49.40.40")
    expect(res.h1Page).toEqual("LEASING AUTO")
    expect(res.altLogoHomeOpti).toEqual("Leasing")


})

test("api home leasing avis work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/listeavis/`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const avisTabObj = Object.keys(res[0])
    expect(avisTabObj).toContain("rate")
    expect(avisTabObj).toContain("review")
    expect(avisTabObj).toContain("reviewDate")

})


test("api home leasing brands work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/brands/v2/leasing`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.brands.forEach(brands => {
        let brandsObj = Object.keys(brands)
        expect(brandsObj).toContain("name")
        expect(brandsObj).toContain("url")
        if (brands.url) {
            let urlParams = brands.url
            expect(urlParams).toContain("/leasing")
        }
    })

    res.models.forEach(models => {
        let modelsObj = Object.keys(models)
        expect(modelsObj).toContain("name")
        expect(modelsObj).toContain("remise")
        expect(modelsObj).toContain("url")
        expect(modelsObj).toContain("photoUrl")
        expect(modelsObj).toContain("monthlyRent")
        if (models.remise) {
            let remiseParams = models.remise
            expect(parseInt(remiseParams)).toBeGreaterThan(0)
            expect(parseInt(remiseParams)).toBeLessThan(100)
        }

        if (models.url) {
            let urlParams = models.url
            expect(urlParams).toContain("/leasing")
        }

        if (models.photoUrl) {
            let photoUrlParams = models.photoUrl
            expect(photoUrlParams).toContain("https://image.elite-auto.fr/visuel/")
        }

        if (models.monthlyRent) {
            let monthlyRentParams = models.monthlyRent
            expect(monthlyRentParams).toContain("€/mois")
        }
    })
    expect(res.nosmarques_url).toContain("/nos-marques")
    expect(res.type).toContain("lease")
})


test("api home leasing info work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/info/leasing`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toEqual('lease')
    expect(parseInt(res.meilleureRemise)).toBeGreaterThan(0)
    expect(parseInt(res.meilleureRemise)).toBeLessThan(100)
    expect(res.h1Page).toEqual('LEASING AUTO')

})

test("api home leasing slider work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/slider/leasing`)
    expect(response.status()).toBe(200)

})

test("api home leasing footer work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/marque/ventevoiturefooter/null/new/home`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(3)
    expect(res.linksBas.length).toEqual(8)
})

test("api home leasing list occasion work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/listeoccasion/v2`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(listoccasion => {
        const listOCCASIONObj = Object.keys(listoccasion)
        expect(listOCCASIONObj).toContain("marqueName")
        expect(listOCCASIONObj).toContain("modelName")
        expect(listOCCASIONObj).toContain("finition")
        expect(listOCCASIONObj).toContain("libGarantie")
        expect(listOCCASIONObj).toContain("version")
        expect(listOCCASIONObj).toContain("mec")
        expect(listOCCASIONObj).toContain("km")
        expect(listOCCASIONObj).toContain("prix")
        expect(listOCCASIONObj).toContain("url")
        expect(listOCCASIONObj).toContain("photoUrl")
        expect(listOCCASIONObj).toContain("rent")
        expect(listOCCASIONObj).toContain("h1")
        if (listoccasion.km) {
            let kmParams = listoccasion.km
            expect(parseInt(kmParams)).toBeGreaterThan(0)
        }

        if (listoccasion.prix) {
            let prixParams = listoccasion.prix
            expect(parseInt(prixParams)).toBeGreaterThan(0)
        }

        if (listoccasion.rent) {
            let rentParams = listoccasion.rent
            expect(parseInt(rentParams)).toBeGreaterThan(0)
        }

        if (listoccasion.url) {
            let urlParams = listoccasion.url
            expect (urlParams).toMatch( /occasion/)
        }

        if (listoccasion.photoUrl) {
            let photoUrlParams = listoccasion.photoUrl
            expect (photoUrlParams).toMatch(/small/)
        }
    })
})


test("api home leasing centre livraison work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/centrelivraison/`)
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


test("api home leasing recompense work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/recompense/leasing`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const expectedObject =
    {
        "activites": [
            {
                "title": "En quoi consiste le leasing automobile ?",
                "content": "Le leasing auto est <a href=https://www.elite-auto.fr/leasing/guide-financement-auto>un système de financement</a> qui repose sur la location d'une voiture neuve ou d'occasion pendant une durée déterminée, au contraire du crédit à la consommation classique qui sert à acheter le véhicule. Grâce au leasing, vous ne payez qu'une fraction de la valeur de la voiture que vous utilisez. Cette valeur est principalement déterminée sur la configuration du véhicule, la base du nombre de mois où vous conservez votre voiture en leasing (durée du contrat) et du nombre de kilomètres que vous parcourez. D'autres critères sont également pris en compte pour définir cette valeur, par exemple votre apport et des services additionnels (extension de garantie, entretien et assistance). A noter qu'avec un leasing, c'est vous qui personnalisez le véhicule neuf selon vos envies."
            },
            {
                "title": "Quelles sont les différentes solutions de leasing auto ?",
                "content": "Le leasing auto est un produit financier décliné en trois formules distinctes, adaptées à différents publics. Si vous êtes un particulier, vous pourrez financer votre voiture avec une LOA (location avec option d'achat) ou une LLD (location longue durée), et si vous êtes un professionnel, avec un crédit-bail, une LLD ou une LOA."
            },
            {
                "title": "La location avec option d'achat",
                "content": "Le leasing auto en <a href=https://www.elite-auto.fr/leasing/guide-location-option-achat> location avec option d'achat </a>(LOA) est sans aucun doute la formule qui rencontre le plus grand succès auprès des automobilistes particuliers. Son mode de fonctionnement est simple et sûr. Vous choisissez la voiture dont vous avez envie (modèle, finition, motorisation…), vous indiquez la durée de votre contrat (de 24 à 60 mois), le nombre de kilomètres que vous pensez parcourir (de 10 000 à 120 000 km sur toute la durée) et le montant de votre apport, sachant que celui-ci est facultatif. À partir de ces critères librement définis, vous obtiendrez le montant de votre loyer mensuel, que vous pourrez compléter avec une extension de garantie et des services d'entretien et d'assistance. Vous aurez aussi immédiatement connaissance de la valeur résiduelle de votre voiture au terme du contrat. Cette dernière correspond à la somme dont vous devrez vous acquitter si au terme de votre contrat de leasing auto en LOA vous décidez de conserver votre voiture. Ce n'est pas une obligation. Avec la LOA, vous pouvez aussi restituer la voiture à votre bailleur et éventuellement renouveler votre contrat avec un nouveau véhicule.\n            L'investissement financier dans une voiture est souvent compliqué à maîtriser. Au prix d'achat il faut ajouter les coûts d'entretien et de révision qui vont croissant au fur et à mesure des kilomètres parcourus. En choisissant de financer votre voiture neuve ou d'occasion avec une LOA, le montant de vos loyers tout compris (location, garantie et frais d'entretien) est défini à la signature de votre contrat et restera le même sur toute la durée de votre engagement. C'est une sécurité financière appréciable."
            },
            {
                "title": "La location longue durée",
                "content": "Le leasing auto en <a href=https://www.elite-auto.fr/leasing/guide-location-longue-duree> location longue durée </a>(LLD) repose sur le même principe que la LOA, à la différence qu'il n'y a pas d'option d'achat et qu'au terme de votre contrat de LLD vous restituez votre voiture. Il s'agit d'une location pure et les critères pour définir le montant de votre loyer sont les mêmes que pour la LOA, à savoir la configuration de l'auto, la durée de votre engagement, le nombre de kilomètres estimés et l'apport, qui est aussi optionnel. Vous pourrez de la même manière compléter votre contrat de LLD avec une extension de garantie."
            },
            {
                "title": "Le crédit-bail",
                "content": "Le <a href=https://www.elite-auto.fr/leasing/guide-credit-bail> crédit-bail </a> est le pendant professionnel de la LOA. Cette formule de leasing auto est fréquemment utilisée par les entreprises et les professionnels pour financer leurs parcs automobiles. Les critères déterminant le montant du loyer sont la durée de l'engagement, l'apport (toujours facultatif) et les garanties optionnelles. Au terme du contrat, le locataire pro peut devenir propriétaire de sa voiture (ou de son parc automobile) en s'acquittant de la valeur résiduelle ou la restituer au bailleur. La seule particularité qui distingue le crédit-bail de la LOA concerne la destination du contrat : crédit-bail uniquement pour les professionnels, loa pour les particuliers voire les entreprises."
            }
        ],
        "recompense": [
            {
                "title": "Vainqueur",
                "content": "dans la catégorie <br> Digitale <div class='by_style'>par le Auto Moto.</div>",
                "url": "/grand-prix-des-concessionnaires",
                "class": "agp_logo1"
            },
            {
                "title": "3ème place",
                "content": "dans la catégorie Performance Commerciale <div class='by_style'>par le Auto Moto.</div>",
                "url": "/grand-prix-des-concessionnaires",
                "class": "agp_logo2"
            },
            {
                "title": "Élu meilleur service client",
                "content": "dans la catégorie <br> Mandataire Automobile. <div class='by_style'> par le magazine Capital.</div>",
                "url": null,
                "class": "agp_logo3"
            },
            {
                "title": "Satisfait ou Remboursé",
                "content": "Nous vous remboursons si vous n'êtes pas satisfait. <div class='by_style'> par Elite Auto.</div>",
                "url": null,
                "class": "agp_logo4"
            }
        ],
        "satisfait_rembourse_url": "//www.elite-auto.fr/satisfait-ou-rembourse.asp",
        "title": null,
        "type": "lease"
    }
    expect(res).toEqual(expectedObject);
})

test("api home leasing confiance work!", async ({ request }) => {

    let response = await request.get(`https://leasing.elite-auto.fr/api/home/confiance/leasing`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const expectedObject = 
[
    {
        "title": "Les avantages et inconvénients du leasing",
        "content": "En choisissant de financer votre voiture avec une location avec option d'achat, une location longue durée ou un crédit-bail :\n            <br />• Vous rationalisez votre investissement en finançant uniquement son usage et non sa propriété.\n            <br />• Vous bénéficiez d'un financement sur mesure, avec ou sans apport.\n            <br />• Vous profitez des avantages d'une formule « tout compris ».\n            <br />• Vous réalisez des économies par rapport à un financement classique auquel s'ajoutent des coûts (entretien) en progression constante.\n            <br />• Vous avez la possibilité de renouveler régulièrement votre voiture avec des modèles neufs sans avoir à vous préoccuper de sa revente...\n            <br /> Il existe quelques réserves sur le leasing, mais elles ne résistent pas longtemps à la comparaison. L'une de ces remarques concerne le montant du loyer par rapport à un crédit à la consommation traditionnel. Mais si vous ajoutez à votre <a href=https://www.elite-auto.fr/leasing/guide-credit-auto>crédit classique</a> les frais d'entretien et les garanties, vous constatez que le leasing auto reste souvent plus économique. Une autre remarque concerne le prix un peu plus élevé du kilomètre parcouru au-delà du forfait. Il est vrai que les kilomètres hors forfait sont facturés lors de la restitution de votre voiture au terme de votre engagement. Mais en réévaluant votre forfait en cours de contrat, vous pourrez être au plus près de votre utilisation réelle et rester dans une tarification forfaitaire plus avantageuse."
    },
    {
        "title": "Financez une voiture neuve ou d'occasion en leasing",
        "content": "Avec son ouverture au marché de la voiture d'occasion, le leasing auto est devenu la solution la plus recherchée pour financer sa voiture. En vous adressant au mandataire Elite Auto, vous bénéficiez d'un choix considérable de voitures neuves et d'occasion garanties « satisfait ou remboursé ». Les voitures d'occasion proposées à la location sont toutes récentes, avec un kilométrage peu élevé. Préalablement à leur mise sur le marché, de nombreux points sont contrôlés pour garantir votre satisfaction et votre sécurité."
    },
    {
        "title": "Profitez de financements en leasing avec Elite Auto",
        "content": "En tant que <a href=https://www.elite-auto.fr/>mandataire auto</a> plusieurs fois récompensé pour la qualité de nos prestations, de notre service client et de nos solutions digitales, nous mettons tout en œuvre pour aider nos clients à concrétiser leur projet automobile. Vous trouverez dans notre parc online le modèle de voiture que vous recherchez et pourrez choisir la finition adaptée à votre usage. Nous avons également élaboré des solutions de leasing auto qui permettront à tous les automobilistes de financer en LOA, en LLD ou en crédit-bail la voiture de leur choix. Nos équipes d'experts sont à votre disposition pour valider votre sélection, vous conseiller et finaliser votre plan de financement."
    }
]
expect(res).toEqual(expectedObject)
})
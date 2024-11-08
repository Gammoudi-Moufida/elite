import { test, expect } from '@playwright/test';

test("api home entreprise bandeau-haut work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/bandeauhaut/entreprise`)

    expect(response.status()).toBe(200)
})


test("api home entreprise promo work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/pagepromo/entreprise`)

    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(typeof res['status']).toBe("boolean")
})

test("api entreprise tag-home work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/tags-home`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res['content']).toContain("<script")
})

test("api entreprise referencement work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/referencement/entreprise`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.bestDiscount)).toBeGreaterThanOrEqual(0)
    expect(parseInt(res.bestDiscount)).toBeLessThanOrEqual(100)
    expect(res.title).toEqual("Véhicule utilitaire neuf : acheter par mandataire un véhicule utilitaire neuf moins cher")
    expect(res.description).toContain("Vente de voiture utilitaire neuve moins chère que chez le concessionnaire. Acheter votre véhicule utilitaire chez un mandataire et profitez de remises")
    expect(res.h1Page).toEqual("Mandataire véhicule utilitaire")
    expect(res.altLogoHomeOpti).toEqual("Véhicule Utilitaire")


})

test("api home entreprise listeavis work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/listeavis/`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const avisTabObj = Object.keys(res[0])
    expect(avisTabObj).toContain("rate")
    expect(avisTabObj).toContain("review")
    expect(avisTabObj).toContain("reviewDate")

})

test("api home entreprise brands work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/brands/v2/entreprise`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const brandsObj = Object.keys(res.brands[0])
    expect(brandsObj).toContain("name")
    expect(brandsObj).toContain("url")
    const modelObj = Object.keys(res.models[0])
    expect(modelObj).toContain("name")
    expect(modelObj).toContain("remise")
    expect(modelObj).toContain("url")
    expect(modelObj).toContain("photoUrl")
    expect(res.nosmarques_url).toContain("nos-marques")
    expect(res.type).toContain("utility")

})

test("api home entreprise info work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/info/entreprise`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toEqual('utility')
    expect(parseInt(res.meilleureRemise)).toBeGreaterThan(0)
    expect(parseInt(res.meilleureRemise)).toBeLessThan(100)
    expect(res.h1Page).toEqual('MANDATAIRE VEHICULE UTILITAIRE')

})

test("api home entreprise slider work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/slider/entreprise`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const sliderObj = Object.keys(res[0])
    expect( sliderObj).toContain("img")
    expect( sliderObj).toContain("url")
    expect( sliderObj).toContain("titre")
    expect( sliderObj).toContain("type")

})


test("api home entreprise footer work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/marque/ventevoiturefooter/null/new/home`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(3)
    expect(res.linksBas.length).toEqual(8)
})

test("api home entreprise list occasion work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/listeoccasion/v2`)
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
      
    })
})

test("api home entreprise centre livraison work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/centrelivraison/`)
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

test("api home entreprise recompense work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/recompense/entreprise`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const expectedObject =
     {  "activites": [
        [
            {
              "title": `De nombreux types de véhicules utilitaires disponibles chez votre mandataire auto`,
              "content": `Un véhicule utilitaire se révèle un allié incontournable pour le développement de votre activité. Mais encore faut-il bien le choisir. Se déclinant dans de nombreux modèles, les véhicules utilitaires professionnels se prêtent à des usages variés. Découvrez sur Elite Auto le véhicule utilitaire le plus adapté à vos besoins parmi nos références neuves ou d'occasion. Profitez en plus de services incomparables. Chez Elite Auto, retrouvez une large gamme de véhicules utilitaires professionnels répondant à des besoins variés. Quel que soit le type de véhicule utilitaire dont vous avez besoin, rendez-vous chez Elite Auto pour acquérir le vôtre facilement. Nos modèles incluent :<br><br>- des fourgonnettes : ces véhicules utilitaires compacts sont déclinés en plusieurs tailles avec différentes capacités de chargement. Leur polyvalence en fait des voitures incontournables pour votre activité. C'est notamment le cas de l'<a href=https://entreprise.elite-auto.fr/vehicule-citroen-jumpy-fourgon,3,6308.html>utilitaire Citroën Jumpy</a> ou du Renault Trafic. Pour une plus grande capacité de chargement, il y a le Renault Master ou l'<a href=https://entreprise.elite-auto.fr/vehicule-citroen-jumper-fourgon,3,5775.html>utilitaire Citroën Jumper</a> ;<br>- des camionnettes : ces utilitaires sont nécessaires pour le transport de charges plus importantes. Les camionnettes s'utilisent pour les marchandises, les livraisons ou encore dans les métiers de la construction ;<br>- des pick-up : ces véhicules se dotent d'une benne à l'arrière servant au transport de charges lourdes. Les pick-up, comme ceux de la marque Ford, sont plébiscités par les professionnels de la construction, mais aussi des travailleurs ruraux ;<br>- des véhicules utilitaires légers : constituent une alternative entre les véhicules de tourisme et les véhicules utilitaires. Ils vous permettent à la fois de transporter des marchandises et des passagers. C'est par exemple le cas du <a href=https://entreprise.elite-auto.fr/vehicule-citroen-berlingo-fourgon-van,3,7075.html>Citroën Berlingo utilitaire</a> utilitaire ou du Renault Kangoo.`
            }
          ],
          [
            {
              "title": `Des véhicules utilitaires pour tous les besoins chez Elite Auto`,
              "content": `Vous gérez une entreprise de livraison, de logistique, de construction, de services ou bien vous êtes artisan ou travailleur indépendant ? Elite Auto a le véhicule utilitaire qu'il vous faut pour votre activité. Grâce à leur grande capacité de chargement, ces modèles répondront parfaitement à vos besoins en matière de transport.<br><br>Trouvez en quelques clics un véhicule utilitaire pour livrer vos produits, vos colis, vos matériaux, vos équipements et autres. Maniables et modulaires, les véhicules utilitaires vendus par votre mandataire Elite Auto s'adaptent à toutes les activités commerciales.<br><br>Vous pouvez, selon les contraintes auxquelles vous devez répondre, miser sur des véhicules utilitaires avec des aménagements intérieurs spécifiques.<br><br>Chez Elite Auto, vous pouvez accéder à des modèles issus des marques les plus réputées dans le domaine : des utilitaires Citroën, Fiat, Opel, Renault, Peugeot, Volkswagen… Pour votre véhicule utilitaire, vous avez le choix entre différentes motorisations et configurations. À essence, diesel, hybride, électrique… Les possibilités sont nombreuses pour votre nouvelle voiture utilitaire.`
            },
            {
              "title": `Achetez votre véhicule utilitaire à prix réduit chez votre mandataire`,
              "content": `Auprès d'Elite Auto, vous pouvez profiter de prix compétitifs pour l'achat d'un véhicule utilitaire, quels que soient la marque ou le modèle. Votre mandataire est en effet en mesure de vous obtenir des remises importantes grâce à des accords avec les concessionnaires. Cela est valable même sur des véhicules avec des options premium.`
            }
          ],
          [
            {
              "title": `Du neuf et de l'occasion auprès de votre mandataire Elite Auto`,
              "content": `Elite Auto propose à la fois des véhicules utilitaires neufs et <a href=https://www.elite-auto.fr/occasion/type-utilitaire>véhicules utilitaires d'occasion</a>. Survolez simplement notre site pour accéder aux nombreux modèles en stock. Vous recherchez un <a href=https://www.elite-auto.fr/occasion/type-utilitaire/marque-citroen>Citroën utilitaire d'occasion</a> qui n'est pas répertorié sur notre site ? Contactez-nous pour nous présenter votre projet ou consultez nos autres <a href=https://www.elite-auto.fr/occasion/citroen>occasions de la marque Citroën</a>. Elite-Auto met à disposition son savoir-faire de plus 25 ans pour vous faciliter l'achat de votre futur véhicule pro.<br><br>Les véhicules neufs commercialisés par Elite Auto proviennent de concessionnaires français ou européens. Auprès de votre mandataire, vous profitez de remises intéressantes par rapport au prix indiqué par le constructeur. Attardez-vous aussi sur le confort et la maniabilité concédés par chaque véhicule. Dans tous les cas, votre conseiller Elite Auto est là pour vous orienter vers les modèles disponibles sur le marché qui se rapprochent le plus de vos critères. Vous pouvez également venir directement dans notre agence pour discuter de votre projet d'achat de véhicule utilitaire : van, fourgon, camion plateau, voiture de société... Spécifiez simplement les caractéristiques du véhicule utilitaire que vous recherchez :<br>- sa taille ;<br>- sa motorisation ;<br>- le nombre de portes ;<br>- le nombre de places ;<br>- les dimensions de la cabine ;<br>- la charge utile ;<br>- le volume de chargement du coffre ;<br>- les options dont vous avez besoin.`
            }
          ]
     ],
        "recompense":[
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
        "title": "Découvrez l'activité de mandataire de véhicule utilitaire",
        "type": "utility"
      }

    expect(res).toEqual(expectedObject);
})

test("api home entreprise confiance work!", async ({ request }) => {

    let response = await request.get(`https://entreprise.elite-auto.fr/api/home/confiance/entreprise`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const expectedObject = [
        {
            title: 'Des garanties professionnelles pour votre véhicule utilitaire',
            content: "Elite Auto propose pour ses véhicules sa garantie satisfait ou remboursé, en plus de la garantie constructeur valable partout en Europe. Vous pouvez, moyennant certaines conditions, demander le remboursement de votre utilitaire au bout de 14 jours ou 1 100 km s'il ne vous satisfait pas. Pour votre flotte automobile, choisir Elite-Auto, c'est choisir une solution de tranquillité."    
          },
          {
            title: "Votre véhicule livré chez vous ou auprès d'un centre livreur",
            content: "Vous pouvez choisir une livraison à domicile. Vous indiquez l'adresse ainsi que le créneau horaire durant lequel se fera la livraison. Votre véhicule sera alors acheminé chez vous dans les délais impartis. Vous pouvez également opter pour une récupération du véhicule dans un centre livreur ou auprès d'un concessionnaire partenaire d'Elite Auto. Les documents indispensables pour l'obtention de la carte grise vous seront remis le jour de la livraison du véhicule. Avec Elite Auto, d'ailleurs, vous profitez de l'expertise d'un service client professionnel. Que ce soit lors de l'achat ou pour toutes les démarches qui en résultent, nous sommes à votre écoute pour vous prodiguer une assistance personnalisée."
          },
          {
            title: 'De nombreux modes de financement possibles chez Elite Auto',
            content: "Acquérir un nouveau <a href=https://entreprise.elite-auto.fr/vehicule-citroen-neuf,3/electrique.html>Citroën utilitaire électrique</a> ou un tout autre modèle représente un véritable investissement. En plus de prix compétitifs, Elite Auto vous propose également plusieurs formules pour financer votre acquisition : location avec option d'achat (LOA), location longue durée (LOA) ou crédit-bail. N'hésitez pas à contacter un conseiller Elite Auto pour obtenir de plus amples renseignements sur les modalités relatives à chaque option en fonction de vos besoins."
          }
    ]
    expect(res).toEqual(expectedObject)
})
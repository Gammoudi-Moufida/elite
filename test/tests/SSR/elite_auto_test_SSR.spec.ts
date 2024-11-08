import { test, expect} from '@playwright/test';


test('ssr home new', async ({ page }) => {

    await page.goto('')
    await expect(page).toHaveTitle(`Mandataire auto jusqu'à -36.50% sur l'achat de votre voiture neuve et d'occasion avec Elite-Auto`)
})

test('ssr home leasing', async ({ page }) => {

    await page.goto('https://leasing.elite-auto.fr')
    await expect(page).toHaveTitle(`Leasing voiture neuve ou d'occasion : LOA, LLD avec ou sans apport`)
})

test('ssr home entreprise', async ({ page }) => {

    await page.goto('https://entreprise.elite-auto.fr')
    await expect(page).toHaveTitle(`Véhicule utilitaire neuf : acheter par mandataire un véhicule utilitaire neuf moins cher`)
})

test('ssr home occasion', async ({ page }) => {

    await page.goto('/occasion')
    await expect(page).toHaveTitle(/.*Voiture d'occasion/)
})

test('ssr auto-discount', async ({ page }) => {

    await page.goto('/auto-discount.asp')
    await expect(page).toHaveTitle(`Auto Discount : voiture neuve à prix discount par mandataire automobile`)
})

test('ssr voiture en stock', async ({ page }) => {

    await page.goto('/voiture-en-stock')
    await expect(page).toHaveTitle(/.*Voiture neuve et d'occasion en stock/)
})

test('ssr marque leasing (Renault)', async ({ page }) => {

    await page.goto('https://leasing.elite-auto.fr/leasing-renault,1/')
    await expect(page).toHaveTitle(/.*Leasing Renault/)
})

test('ssr marque utilitaire', async ({ page }) => {

    await page.goto('https://entreprise.elite-auto.fr/vehicule-renault-neuf,1.html')
    await expect(page).toHaveTitle(`Utilitaire Renault neuf : mandataire véhicule utilitaire renault pas cher`)
})

test('ssr marque import', async ({ page }) => {

    await page.goto('/ref_marques_seule.asp?CODEMARQUE=1')
    await expect(page).toHaveTitle(`Import Renault moins chère, Importation renault neuve`)
})

test('ssr marque tarif', async ({ page }) => {

    await page.goto('/voiture-neuve/renault-1/tarifs.html')
    await expect(page).toHaveTitle(/.*Renault neuve/)
})

test('ssr marque remise', async ({ page }) => {

    await page.goto('/remise-renault-1.html')
    await expect(page).toHaveTitle(`Remise Renault neuve : toutes nos promotions | Elite-Auto.fr`)
})

test('ssr marque pas chere', async ({ page }) => {

    await page.goto('/renault-pas-chere-1.html')
    await expect(page).toHaveTitle(`Renault neuve et pas chère : nos prix discount | Elite-Auto.fr`)
})

test('ssr marque collaborateur', async ({ page }) => {

    await page.goto('/collaborateur-renault-ou-mandataire,1.html')
    await expect(page).toHaveTitle(`Voiture collaborateur Renault : une alternative | Elite-Auto.fr`)
})

test('ssr marque occasion', async ({ page }) => {

    await page.goto('/occasion/renault')
    await expect(page).toHaveTitle(/.*Renault Occasion/)
})

test('ssr marque (renault)', async ({ page }) => {

    await page.goto('/vente-voiture/renault-1.html')
    await expect(page).toHaveTitle(`Mandataire Renault : Achat de voiture neuve RENAULT | Elite-Auto.fr`)
})

test('ssr marque (renault arkana)', async ({ page }) => {

    await page.goto('/voiture-renault-1/arkana-7857.html')
    await expect(page).toHaveTitle(/.*Renault Arkana/)
})

test('ssr marque tarifs', async ({ page }) => {

    await page.goto('/voiture-neuve/peugeot-2/208,prix-neuve-7265.html')
    await expect(page).toHaveTitle(/.*Peugeot 208/)
})

test('ssr modele leasing', async ({ page }) => {

    await page.goto('https://leasing.elite-auto.fr/leasing-renault,1/clio-v,7208')
    await expect(page).toHaveTitle(/.*Leasing Renault Clio v/)
})

test('ssr modele pas chere', async ({ page }) => {

    await page.goto('/RENAULT_CLIO_V_.asp')
    await expect(page).toHaveTitle(/.*Renault Clio v neuve pas chère/)
})

test('ssr modele leasing moteur', async ({ page }) => {

    await page.goto('https://leasing.elite-auto.fr/leasing-renault,1/clio-v,7208/moteur-clio-tce-130-edc-fap.html')
    await expect(page).toHaveTitle(`Renault Clio V clio tce 130 edc fap : Simplicité d’un financement en LLD ou LOA`)
})

test('ssr modele VN', async ({ page }) => {

    await page.goto('/voiture-renault-1/clio-v-7208.html')
    await expect(page).toHaveTitle(/.*Renault Clio/)
})

test('ssr modele VN finition', async ({ page }) => {

    await page.goto('/vente-voiture/renault-1/clio-v-7208/finition-initiale-paris.html')
    await expect(page).toHaveTitle(`Renault Clio V initiale paris : découvrez la citadine Renault`)
})

test('ssr modele VN moteur', async ({ page }) => {

    await page.goto('/vente-voiture/renault-1/clio-v-7208/moteur-clio-tce-130-edc-fap.html')
    await expect(page).toHaveTitle(`Renault Clio V clio tce 130 edc fap : découvrez la citadine Renault`)
})

test('ssr modele tarif carburant hybride', async ({ page }) => {

    await page.goto('/voiture-neuve/toyota-29/corolla-hybride-my22,prix-hybride-8078.html')
    await expect(page).toHaveTitle(/.*Prix Toyota Corolla hybride hybride/)
})

test('ssr modele tarif carburant electrique', async ({ page }) => {

    await page.goto('/voiture-neuve/renault-1/zoe,prix-electrique-7367.html')
    await expect(page).toHaveTitle(/.*Prix Renault Zoe/)
})

test('ssr modele tarif carburant autre', async ({ page }) => {

    await page.goto('/voiture-neuve/renault-1/clio-v,prix-autre-7208.html')
    await expect(page).toHaveTitle(/.*Prix Renault Clio v autre/)
})

test('ssr modele tarif carburant diesel', async ({ page }) => {

    await page.goto('/voiture-neuve/renault-1/clio-v,prix-diesel-7208.html')

    await expect(page).toHaveTitle(/.*Prix Renault Clio v diesel/)
})

test('ssr modele entreprise finition', async ({ page }) => {

    await page.goto('https://entreprise.elite-auto.fr/vehicule-renault-clio-v-societe,1,7368/finition-air-blue.html')
    await expect(page).toHaveTitle(`Renault Clio v societe Air blue`)
})

test('ssr modele entreprise moteur', async ({ page }) => {

    await page.goto('https://entreprise.elite-auto.fr/vehicule-renault-clio-v-societe,1,7368/moteur-clio-societe-dci-85.html')
    await expect(page).toHaveTitle(`Renault Clio v societe Clio societe dci 85`)
})

test('ssr modele occasion', async ({ page }) => {

    await page.goto('/occasion/renault/clio')
    await expect(page).toHaveTitle(/.*Renault Clio Occasion/)
})

test('ssr modele occasion generation', async ({ page }) => {

    await page.goto('/occasion/renault/clio/clio-iv')
    await expect(page).toHaveTitle(/.*Renault Clio 4 Occasion/)
})

test('ssr modele occasion CLIO V', async ({ page }) => {

    await page.goto('/occasion/renault/clio/clio-iv/152805')
    await expect(page).toHaveTitle(/.*Renault Clio/)
})
import { test, expect } from '@playwright/test';


test.describe('test elite-auto home page Navbar' ,()=>{
   test.beforeEach(async ({page})=> {
    await page.goto('/')
    await page.getByRole('button', { name: 'Continue without agreeing →' }).click()
   })

    test('test elite-auto Achat', async ({ page }) => {
     
       await page.click ("'Achat'");
       await expect(page).toHaveURL(/\/recherche/)
      });

    test('test elite-auto Neuf', async ({ page }) => {
        await page.click ("'Neuf'");
        await expect(page).toHaveURL(/\/recherche/)
      });

    test('test elite-auto Occasion', async ({ page }) => {
      expect(await page.getByRole('link', { name: 'Occasion', exact: true}).first()).toBeVisible()
        await page.getByRole('link', { name: 'Occasion', exact: true}).first().click()
        await expect(page).toHaveURL(/occasion/)
      }); 

    test('test elite-auto En stock', async ({ page }) => {
        expect(await page.getByRole('link', { name: 'En stock' })).toBeVisible()
        await page.getByRole('link', { name: 'En stock' }).click()
        await expect(page).toHaveURL(/voiture-en-stock/)
      }); 

    test('test elite-auto LOA/LLD', async ({ page }) => {
        expect(await page.getByRole('link', { name: 'LOA/LLD' })).toBeVisible()
        await page.getByRole('link', { name: 'LOA/LLD' }).click()
        await expect(page).toHaveURL(/leasing/)
      });  

    test('test elite-auto Reprise voiture', async ({ page }) => {
        expect(await page.getByRole('link', { name: 'Reprise voiture', exact: true})).toBeVisible()
        await page.getByRole('link', { name: 'Reprise voiture', exact: true}).click()
        await expect(page).toHaveURL(/reprise-voiture/)
      });  

    test('test navbar connexion icon ', async ({ page }) => {
        await page.locator('.form-inline > a').click()
        await expect(page).toHaveURL("/account/connexion")
    }); 

    test('test navbar logo_elite and phone number', async ({ page }) => {
      expect(await page.getByRole('link', { name: '01 30 49 40 40' })).toBeVisible()
      expect(await page.locator("//img[@alt='Mandataire auto Elite-Auto']")).toBeVisible()
      await page.getByRole('link', { name: 'Mandataire auto Elite-Auto' }).click()
      await expect(page).toHaveURL("")

    }); 
 

    test('testnavbar modal rappel gratuit', async ({ page }) => {
       await page.locator('a:nth-child(3)').first().click();
       expect (await page.getByText('NOUS VOUS RAPPELONS GRATUITEMENT')).toBeVisible()  
       await page.getByPlaceholder('-- Téléphone --').click();
       await page.getByPlaceholder('-- Téléphone --').fill('0123456789');
       await page.getByRole('button', { name: 'Appelez-moi' }).click();
       expect (await page.getByText('Veuillez sélectionner un horaire !')).toBeVisible();
       await page.getByPlaceholder('-- Téléphone --').click();
       await page.getByPlaceholder('-- Téléphone --').fill('0123456');
       await page.getByRole('combobox').selectOption('1: 9h-11h');
       await page.getByRole('button', { name: 'Appelez-moi' }).click();
       expect  (await page.getByText(' Veuillez entrer un N° de tél valide ')).toBeVisible()  
       await page.getByPlaceholder('-- Téléphone --').click();
       await page.getByPlaceholder('-- Téléphone --').fill('0123456789');
       await page.getByRole('button', { name: 'Appelez-moi' }).click();
      //  expect (await page.getByText('Votre demande a été prise en compte!')).toBeVisible();
  
      });

    })     

import { test, expect } from '@playwright/test';


test("api marque occasion filter renault work!", async ({ request }) => {
    let response = await request.get(`/api/offre-occasion/filter/renault`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.markId).toBe(1)
})
test("api marque occasion service renault work!", async ({ request }) => {

    let response = await request.get(`/api/offre-occasion/services/renault`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.markEurotaxId).toBe(1)
    res.list.forEach(list => {
        const listObj = Object.keys(list)
        expect(listObj).toContain("nom")
        expect(listObj).toContain("url")
        let urlParams = list.url
        expect(urlParams).toContain("/occasion/renault")
    })
})
test("api marque occasion textrefs work!", async ({ request }) => {

    let response = await request.get(`/api/offre-occasion/textrefs/renault`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("occasion")
    expect(res.mark).toContain("logo Renault")
    expect(res.image).toContain("/images/logos/marques/logo_renault_new.png")
    res.menu.forEach(menu => {
        const menuObj = Object.keys(menu)
        expect(menuObj).toContain("text")
        expect(menuObj).toContain("url")
        
    })
})
test("api marque occasion filter work!", async ({ request }) => {

    let response = await request.get(`/api/filter/marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(res => {
        let filterObj =Object.keys(res)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("nom")
    })    
})
test("api marque occasion recherche work!", async ({ request }) => {

    let response = await request.post(`/api/search/`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(parseInt(res.hits.total)).toBeGreaterThan(0)
})

test("api marque occasion menugauche work!", async ({ request }) => {

    let response = await request.get(`/api/marque/menugauche/1/marqueVo`)
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
test("api marque occasion footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/renault/occasion/occasion_marque`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter).toHaveLength(2)
    expect(res.linksBas).toHaveLength(7)

})
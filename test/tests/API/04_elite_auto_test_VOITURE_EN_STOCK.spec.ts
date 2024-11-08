import { test, expect } from '@playwright/test';

test("api voiture en stock color work!", async ({ request }) => {

    let response = await request.get(`/api/filter/color`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(color => {
        const filterObj = Object.keys(color)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("libelle")
        expect(filterObj).toContain("icon")

    })
})
test("api voiture en stock marque work!", async ({ request }) => {

    let response = await request.get(`/api/marque/marque-stock`)
    const res = await response.json()
    expect(response.status()).toBe(200)

    const listObj = Object.keys(res)
    expect(listObj).toContain("listMarqueStock")
    expect(listObj).toContain("title")
    expect(listObj).toContain("description")
    expect(listObj).toContain("h1")

    const marqueObj = Object.keys(res.listMarqueStock[0])
    expect(marqueObj).toContain("id")
    expect(marqueObj).toContain("nom")
    expect(marqueObj).toContain("url")
  

})
import { test, expect } from '@playwright/test';


test("api occasion textRef work!", async ({ request }) => {

    let response = await request.get(`/api/offre-occasion/textrefs`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.type).toContain("occasion")
    expect(res.mark).toContain("logo")
    expect (res.metaTitle).not.toEqual("")
    expect (res.metaDescription).not.toEqual("")
    expect (res.textTop).not.toEqual("")
    expect (res.title).not.toEqual("")
    expect (res.resume).not.toEqual("")
})
test("api occasion filter work!", async ({ request }) => {

    let response = await request.get(`/api/filter/sort`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(filter => {
        const filterObj = Object.keys(filter)
        expect(filterObj).toContain("id")
        expect(filterObj).toContain("libelle")

    })
})
test("api home occasion services work!", async ({ request }) => {

    let response = await request.get(`/api/offre-occasion/services`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const listObj = Object.keys(res.list[0]);
    expect(listObj).toContain("nom")
    expect(listObj).toContain("url")
    res.list.forEach(list => {
        if(list.url) {
            let urlParams = list.url;
            expect(urlParams).toContain("/occasion/")
        }
    })
})
test("api home occasion filter type work!", async ({ request }) => {

    let response = await request.get(`/api/filter/type`)
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
test("api home occasion filter utilitaire work!", async ({ request }) => {

    let response = await request.get(`/api/filter/utilitaire`)
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
test("api home occasion filter disponibility work!", async ({ request }) => {

    let response = await request.get(`/api/filter/disponibility`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    res.forEach(OB => {
        const Obj = Object.keys(OB)
        expect(Obj).toContain("id")
        expect(Obj).toContain("libelle")
        expect(Obj).toContain("class")
    })

})
test("api home occasion filter energy work!", async ({ request }) => {

    let response = await request.get(`/api/filter/energy`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    const expectedObject = 
[
    {
        "libelle": "Diesel",
        "id": "diesel"
    },
    {
        "libelle": "Electrique",
        "id": "electrique"
    },
    {
        "libelle": "Essence",
        "id": "essence"
    },
    {
        "libelle": "Gpl / gnv",
        "id": "gpl / gnv"
    },
    {
        "libelle": "Hybride",
        "id": "hybride"
    },
    {
        "libelle": "Ethanol",
        "id": "ethanol"
    }
]
expect(res).toEqual(expectedObject)

})
test("api home occasion footer work!", async ({ request }) => {

    let response = await request.get(`/api/marque/ventevoiturefooter/undefined/occasion/occasion_home`)
    expect(response.status()).toBe(200)
    const res = await response.json()
    expect(res.dataFooter.length).toEqual(1)
    expect(res.linksBas.length).toEqual(7)
})

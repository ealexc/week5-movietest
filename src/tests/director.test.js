const request = require('supertest')
const app = require("../app")

BASE_URL = '/api/v1/directors'

const director = {
    firstName: "Greta",
    lastName: "Gerwing",
    nationality: "American",
    image: "text",
    birthday: "12/05/2000"
}

let directorId 

test("POST -> BASE_URL/:id should return status code 201 and res.body.name === director.name", async() => {
    const res = await request(app)
     .post(BASE_URL)
     .send(director)

     directorId = res.body.id 

     expect(res.statusCode).toBe(201)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(director.name)
})
test("GET -> BASE_URL should return status code 200, res.body.length === 1", async() => {
    const res = await request(app)
     .get(BASE_URL)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
})
test("GET ONE -> BASE_URL should return status code 200, res.body.name === director.name", async() => {
    const res = await request(app)
     .get(`${BASE_URL}/${directorId}`)

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(director.name)
})
test("PUT -> BASE_URL/:id should return status code 200, and res.body.image === bodyUpdate.image", async() => {

    const bodyUpdate = {
        image: "new"
    }

    const res = await request(app)
     .put(`${BASE_URL}/${directorId}`)
     .send(bodyUpdate)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.image).toBe(bodyUpdate.image)
})
test("DELETE -> BASE_URL/:id should return status code 204", async() => {
    const res = await request(app)
     .delete(`${BASE_URL}/${directorId}`)
} )
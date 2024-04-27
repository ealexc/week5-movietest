const request = require('supertest')
const app = require("../app")

BASE_URL = '/api/v1/actors'

const actor = {
    firstName: "Greta",
    lastName: "Gerwing",
    nationality: "American",
    image: "text",
    birthday: "12/05/2000"
}

let actorId

test("POST -> BASE_URL/:id should return status code 201 and res.body.name === actors.name", async() => {
    const res = await request(app)
    .post(BASE_URL)
    .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
}) 

test("GET BASE_URL should return status code 200, res.body.length === 1",  async() => {
    const res = await request(app)
    .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})
test("GET ONE -> BASE_URL should return status code 200, res.body.name === actor.name", async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})
test("PUT -> BASE_URL/:id should return status code 200, and res.body.image === bodyUpdate.image", async() => {

    const bodyUpdate = {
        image: "newimage"
    }

    const res = await request(app)
     .put(`${BASE_URL}/${actorId}`)
     .send(bodyUpdate)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.image).toBe(bodyUpdate.image)
})
test("DELETE -> BASE_URL/:id return status code 204", async() => {
    const res = await request(app)
     .delete(`${BASE_URL}/${actorId}`)
})
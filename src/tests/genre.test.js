const request = require('supertest')
const app = require("../app")

BASE_URL ='/api/v1/genres'

const genre = {
    name: "Drama"
}

let genreId

test("POST -> BASE_URL/:id should return status code 201 and res.body.name === genre.name", async() => {
    const res = await request(app)
     .post(BASE_URL)
     .send(genre)

    genreId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})
test("GET -> BASE_URL should return status code 200, res.body.length === 1", async() => {
    const res = await request(app)
     .get(BASE_URL)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
})
test("GET ONE -> BASE_URL should return status code 200, res.body.name === actor.name", async() => {
    const res = await request(app)
     .get(`${BASE_URL}/${genreId}`)

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(genre.name)
})
test("PUT -> BASE_URL/:id should return status code 200, and res.body.name === bodyUpdate.image", async() => {

    const bodyUpdate ={
        name: "newname"
    }
    const res = await request(app)
     .put(`${BASE_URL}/${genreId}`)
     .send(bodyUpdate)

     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(bodyUpdate.name)
})
test("DELETE -> BASE_URL/:id return status code 204", async() => {
    const res = await request(app)
     .delete(`${BASE_URL}/${genreId}`)
})
const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')
require('../models')

const URL_BASE = '/api/v1/movies'
let movieId
const newMovie = {
  name: "nombre",
  image: "imagen.jpg",
  synopsis: "pelicula",
  releaseYear: 2005
}

test('POST -> URL_BASE should return statusCode 201, and res.body.name === newMovie.name', async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(newMovie)

  movieId = res.body.id

  expect(res.status).toBe(201)
  expect(res.status).toBeDefined()
  expect(res.body.name).toBe(newMovie.name)
})

test('GET -> URL_BASE, should return statusCode 200, and res.body.length === 1', async () => {
  const res = await request(app)
    .get(URL_BASE)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('PUT -> URL_BASE/movieId, should return statusCode 200, and res.body.name === bodyUpdate.name', async () => {
  const bodyUpdate = {
    name: 'nombre'
  }

  const res = await request(app)
    .put(`${URL_BASE}/${movieId}`)
    .send(bodyUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(bodyUpdate.name)
})

test('POST -> URL_BASE/movieId/actors, should return statusCode 200, and res.body.length === 1', async () => {
  const actor = await Actor.create({
    firstName: 'nombre',
    lastName: 'apellido',
    nationality: 'American',
    image: 'ddededed',
    birthday: '1963-06-09'
  })

  const res = await request(app).post(`${URL_BASE}/${movieId}/actors`)
    .send([actor.id])

  await actor.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test('POST -> URL_BASE/movieId/directors should statusCode 200, and res.body.length === 1', async () => {
  const director = await Director.create({
    firstName: 'Nombre',
    lastName: 'Apellido',
    nationality: 'Mexican',
    image: 'dwdwdw',
    birthday: '1964-10-09'
  })

  const res = await request(app)
    .post(`${URL_BASE}/${movieId}/directors`)
    .send([director.id])

  expect(res.status).toBe(200)
  await director.destroy()
  expect(res.body).toHaveLength(1)
})

test('POST -> URL_BASE/movieId/genres should return statusCode 200, and res.body.length === 1', async () => {
  const genre = await Genre.create({
    name: 'horror'
  })

  const res = await request(app)
    .post(`${URL_BASE}/${movieId}/genres`)
    .send([genre.id])

  expect(res.status).toBe(200)
  await genre.destroy()
  expect(res.body).toHaveLength(0)
})

test('DELETE -> URL_BASE/movieId should return statusCode 204', async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${movieId}`)

  expect(res.status).toBe(204)
})

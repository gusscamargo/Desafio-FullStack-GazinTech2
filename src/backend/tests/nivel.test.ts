import request from "supertest"
import type { Nivel, NivelResponse, NivelAttributes} from "../src/types/index"

const endereco = "http://127.0.0.1:4000"

describe("GET /nivel/", () => {
    it("Resposta com um array de json", done => {
        request(endereco)
            .get("/nivel/")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response: any) => {
                expect(Array.isArray(response._body)).toEqual(true)

                return done()
            })
    })
})

describe("POST /nivel/add", () => {
    it("Resposta com o json da dado inscrito", done => {
        const input: Nivel = {
            nivel: "Programador"
        }

        request(endereco)
            .post("/nivel/add")
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                expect(response._body).toHaveProperty("id")
                expect(response._body).toHaveProperty("nivel", input.nivel)

                return done()
            })
    })
})

describe("GET /nivel/:id", () => {
    it("Resposta dom o json do id pesquisado", done => {
        const input: Nivel = {
            nivel: "Programador"
        }


        // Testar com valor adicionado
        request(endereco)
            .post("/nivel/add")
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const item: NivelAttributes = {
                    id: response._body.id,
                    nivel: response._body.nivel
                }

                request(endereco)
                    .get(`/nivel/${item.id}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response: any) => {
                        expect(response._body.id).toEqual(item.id)
                        expect(response._body.nivel).toEqual(item.nivel)
                        expect(response._body).toHaveProperty("numeroDevs")


                        // Por ultimo testar com cada valor do banco
                        request(endereco)
                            .get("/nivel/")
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then((response: any) => {
                                const data: NivelResponse[] = response._body

                                for (let item of data) {
                                    request(endereco)
                                        .get(`/nivel/${item.id}`)
                                        .set('Accept', 'application/json')
                                        .expect('Content-Type', /json/)
                                        .expect(200)
                                        .then((response: any) => {
                                            expect(response._body.id).toEqual(item.id)
                                            expect(response._body.nivel).toEqual(item.nivel)
                                            expect(response._body).toHaveProperty("numeroDevs")
                                        })
                                }

                                return done()
                            })

                    })
            })        
    })
})

describe("PUT /nivel/edit", () => {
    it("Resposta com json dos dados modificados", done => {
        const input: Nivel = {
            nivel: "Programador"
        }


        request(endereco)
            .post("/nivel/add")
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const edit: NivelAttributes = {
                    id: response._body.id,
                    nivel: "Programador-não"
                }

                request(endereco)
                    .put("/nivel/edit")
                    .send(edit)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response: any) => {
                        expect(response._body).toHaveProperty("id")
                        expect(response._body).toHaveProperty("nivel", edit.nivel)

                        return done()
                    })                
            })        
    })
})

describe("DELETE /nivel/delete", () => {
    it("Resposta com nada e espera valor de status 204", done => {
        const input: Nivel = {
            nivel: "Programador"
        }

        request(endereco)
            .post("/nivel/add")
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const del: NivelResponse = {
                    id: response._body.id,
                    nivel: response._body.nivel,
                    numeroDevs: response._body.numeroDevs
                }

                request(endereco)
                    .delete("/nivel/delete")
                    .send(del)
                    .set('Accept', 'application/json')
                    .expect(204)
                    .then((response: any) => {
                        request(endereco)
                            .get(`/nivel/${del.id}`)
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .then((response: any) => {
                                expect(response._body).toEqual({})

                                return done()
                            })
                    })
            })

    })
})
import request from "supertest"
import type { Desenvolvedor, DesenvolvedorAttributes, DesenvolvedorResponse } from "../src/types"

const endereco = "http://127.0.0.1:4000"

describe("GET /desenvolvedor/", () => {
    it("Resposta com um array de json", done => {
        request(endereco)
            .get("/desenvolvedor/")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response: any) => {
                expect(Array.isArray(response._body)).toEqual(true)

                return done()
            })
    })
})

describe("POST /desenvolvedor/add", () => {
    it("Resposta com o json da dado inscrito", done => {
        const input: Desenvolvedor = {
            nome: "Gustavo",
            datanascimento: new Date("1998-05-18"),
            hobby: "Varios nadas",
            sexo: "M",
            nivel_id: 1,

        }

        request(endereco)
            .post("/desenvolvedor/add")
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                expect(response._body).toHaveProperty("id")
                expect(response._body).toHaveProperty("nome")
                expect(response._body).toHaveProperty("datanascimento")
                expect(response._body).toHaveProperty("hobby")
                expect(response._body).toHaveProperty("hobby")

                return done()
            })
    })
})

describe("GET /desenvolvedor/:id", () => {
    it("Resposta dom o json do id pesquisado", done => {
        const input: Desenvolvedor = {
            nome: "Gustavo",
            datanascimento: new Date("1998-05-18"),
            hobby: "Varios nadas",
            sexo: "M",
            nivel_id: 1,
        }


        // Testar com valor adicionado
        request(endereco)
            .post("/desenvolvedor/add")
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const item: DesenvolvedorResponse = response._body

                request(endereco)
                    .get(`/nivel/${item.id}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response: any) => {
                        ["nome", "datanascimento", "nivel_id", "hobby", "sexo"].forEach(item => {
                            expect(response._body).toHaveProperty(item)
                        })                    


                        return done()
                    })
            })
    })
})
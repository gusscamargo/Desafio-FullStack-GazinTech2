import request from "supertest"
import type { Desenvolvedor, DesenvolvedorAttributes, DesenvolvedorResponse } from "../src/types/index"

const endereco: string = "http://127.0.0.1:4000"
const model: string = "desenvolvedor"
const camposObrigatorios: string[] = ["nome", "datanascimento", "nivel_id"]
const input: Desenvolvedor = {
    nome: "Gustavo",
    datanascimento: new Date("1998-05-18"),
    nivel_id: 131,
    hobby: "Ler, jogar e estudar mais sobre tecnologia",
    sexo: "M"
}

const ipInvalido: DesenvolvedorAttributes = {
    id: -1,
    nome: "Gustavo",
    datanascimento: new Date("1998-05-18"),
    nivel_id: 131
}

describe("GET /nivel/", () => {
    it("Receber lista de itens e validar cada item", done => {
        request(endereco)
            .get(`/${model}/`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response: any) => {
                expect(Array.isArray(response._body)).toEqual(true)

                response._body.forEach((item: DesenvolvedorResponse) => {
                    expect(item).toHaveProperty("id")
                    expect(item).toHaveProperty("nivel")
                })


                return done()
            })
    })
})

describe("POST /nivel/add", () => {
    const caminho: string = `/${model}/add`

    it("Adicionar item", done => {


        request(endereco)
            .post(caminho)
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                camposObrigatorios.forEach(item => {
                    expect(response._body).toHaveProperty("item", eval(`input.${item}`))
                })

                return done()
            })
    })

    it("Adicionar lista de itens", done => {

        const lista: Desenvolvedor[] = [
            input,
            input,
            input,
            input,
            input,
            input,
            input
        ]

        request(endereco)
            .post(caminho)
            .send(lista)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })

    it("Adicionar item sem campo obrigatorio nivel", done => {
        const item: any = {}

        request(endereco)
            .post(caminho)
            .send(item)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe("GET /nivel/:id", () => {
    const caminhoAdd: string = `/${model}/add`


    it("Adicionar item e pesquisar esse mesmo item", done => {


        // Testar com valor adicionado
        request(endereco)
            .post(caminhoAdd)
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const item: DesenvolvedorAttributes = response

                request(endereco)
                    .get(`/${model}/${item.id}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response: any) => {
                        expect(response._body).toHaveProperty("id")
                        camposObrigatorios.forEach(e => {
                            expect(response._body).toHaveProperty(`${e}`, eval(`item.${item}`))
                        })

                        return done()
                    })
            })
    })

    it("Pesquisar individualmente com cada termo do getAll", done => {
        // Por ultimo testar com cada valor do banco
        request(endereco)
            .get(`/${model}/`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response: any) => {
                const data: DesenvolvedorResponse[] = response._body

                data.forEach(item => {
                    request(endereco)
                        .get(`/${model}/${item.id}`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then((response: any) => {
                        
                            expect(response._body).toHaveProperty("id")
                            camposObrigatorios.forEach(e => {
                                expect(response._body).toHaveProperty(`${e}`, eval(`item.${e}`))
                            })
                        })
                })

                return done()
            })
    })

    it("Pesquisar com id invalido", done => {
        request(endereco)
            .get(`/${model}/${-1}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })

    it("Pesquisar com id sendo uma string", done => {
        request(endereco)
            .get(`/${model}/string`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })

    it("Pesquisar com id sendo um caractere", done => {
        request(endereco)
            .get(`/${model}/a`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe("PUT /nivel/edit", () => {
    it("Adicionar item e editar esse mesmo item", done => {

        request(endereco)
            .post(`/${model}/add`)
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const edit: DesenvolvedorResponse = response
                edit.nome = "Gustavo 2 Gustavo"

                request(endereco)
                    .put(`/${model}/edit`)
                    .send(edit)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response: any) => {

                        expect(response._body).toHaveProperty("id")
                        camposObrigatorios.forEach(e => {
                            expect(response._body).toHaveProperty(`${e}`, eval(`item.${e}`))
                        })

                        return done()
                    })
            })
    })

    it("Editar Item com id Invalido", done => {
        request(endereco)
            .put(`/${model}/edit`)
            .send(ipInvalido)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe("DELETE /nivel/delete", () => {
    it("Adicionar item e deleter esse mesmo item", done => {

        request(endereco)
            .post(`/${model}/add`)
            .send(input)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const res: DesenvolvedorResponse = response

                request(endereco)
                    .delete(`/${model}/delete`)
                    .send(res)
                    .set('Accept', 'application/json')
                    .expect(204)
                    .then((response: any) => {
                        request(endereco)
                            .get(`/${model}/${res.id}`)
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(400, done)
                    })
            })

    })

    it("Tentar excluir por id invalido", done => {

        request(endereco)
            .delete(`/${model}/delete`)
            .send(ipInvalido)
            .expect(400, done)
    })
})
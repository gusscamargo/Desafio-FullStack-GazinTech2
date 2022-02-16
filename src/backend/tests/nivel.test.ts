import request from "supertest"
import { isModuleBlock } from "typescript"
import type { Nivel, NivelResponse, NivelAttributes} from "../src/types/index"

const endereco: string = "http://127.0.0.1:4000"
const model: string = "nivel"
const camposObrigatorios: string[] = ["nivel"]
const input: Nivel = {
    nivel: "Programador"
}

const ipInvalido: NivelAttributes = {
    id: -1,
    nivel: "Teste"
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

                response._body.forEach((item: NivelResponse) => {
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
                expect(response._body).toHaveProperty("id")
                expect(response._body).toHaveProperty("nivel", input.nivel)

                return done()
            })
    })

    it("Adicionar lista de itens", done => {
        const input: Nivel = {
            nivel: "Programador"
        }

        const lista: Nivel[] = [
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
                const item: NivelAttributes = {
                    id: response._body.id,
                    nivel: response._body.nivel
                }

                request(endereco)
                    .get(`/${model}/${item.id}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response: any) => {
                        expect(response._body.id).toEqual(item.id)
                        expect(response._body.nivel).toEqual(item.nivel)
                        expect(response._body).toHaveProperty("numeroDevs")


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
                const data: NivelResponse[] = response._body

                data.forEach(item => {
                    request(endereco)
                        .get(`/${model}/${item.id}`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then((response: any) => {
                            expect(response._body).toHaveProperty("id", item.id)
                            expect(response._body).toHaveProperty("nivel", item.nivel)
                            expect(response._body).toHaveProperty("numeroDevs")
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
                const edit: NivelAttributes = {
                    id: response._body.id,
                    nivel: "Programador-não"
                }

                request(endereco)
                    .put(`/${model}/edit`)
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

    it("Editar Item com id Invalido",  done => {
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
                const res: NivelResponse = {
                    id: response._body.id,
                    nivel: response._body.nivel,
                    numeroDevs: response._body.numeroDevs
                }

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
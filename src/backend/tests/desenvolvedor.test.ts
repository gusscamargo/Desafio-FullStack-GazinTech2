import request from "supertest"
import type { Desenvolvedor, DesenvolvedorAttributes, DesenvolvedorResponse } from "../src/types/index"

const endereco: string = "http://127.0.0.1:4000"
const model: string = "desenvolvedor"
const camposObrigatorios: string[] = ["id", "nome", "datanascimento", "nivel_id", "Nivel"]
const input: Desenvolvedor = {
    nome: "Gustavo",
    datanascimento: new Date("1998-05-18"),
    nivel_id: 3,
    hobby: "Ler, jogar e estudar mais sobre tecnologia",
    sexo: "M"
}

const ipInvalido: DesenvolvedorAttributes = {
    id: -1,
    nome: "Gustavo",
    datanascimento: new Date("1998-05-18"),
    nivel_id: 131
}

describe("GET /desenvolvedor/", () => {
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
                    expect(item).toHaveProperty("nome")
                    expect(item).toHaveProperty("datanascimento")
                    expect(item).toHaveProperty("nivel_id")
                    expect(item).toHaveProperty("Nivel")
                })


                return done()
            })
    })
})

describe("POST /desenvolvedor/add", () => {
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
                expect(response._body).toHaveProperty("nome")
                expect(response._body).toHaveProperty("datanascimento")
                expect(response._body).toHaveProperty("nivel_id")

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

    it("Adicionar item relacionado a uma ID de Nivel que não existe", done => {
        const inputAux: Desenvolvedor = input
        input.nivel_id = 500000

        request(endereco)
            .post(caminho)
            .send(inputAux)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })
})

describe("GET /desenvolvedor/:id", () => {
    const caminhoAdd: string = `/${model}/add`


    it("Adicionar item e pesquisar esse mesmo item", done => {

        const devTest: Desenvolvedor = {
            datanascimento: new Date("1998-05-18"),
            nivel_id: 3,
            nome: "Gustavo Michels de Camargo",
            hobby: "Ler",
            sexo: "M"
        }

        // Testar com valor adicionado
        request(endereco)
            .post(caminhoAdd)
            .send(devTest)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const item: DesenvolvedorAttributes = response._body
                
                request(endereco)
                    .get(`/${model}/${item.id}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((r: any) => {
                        expect(r._body).toHaveProperty("id")
                        expect(r._body).toHaveProperty("nome")
                        expect(r._body).toHaveProperty("datanascimento")
                        expect(r._body).toHaveProperty("nivel_id")
                        expect(r._body).toHaveProperty("Nivel")

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
                            expect(response._body).toHaveProperty("nome")
                            expect(response._body).toHaveProperty("datanascimento")
                            expect(response._body).toHaveProperty("nivel_id")
                            expect(response._body).toHaveProperty("Nivel")
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

describe("PUT /desenvolvedor/edit", () => {
    it("Adicionar item e editar esse mesmo item", done => {

        const devTest: Desenvolvedor = {
            datanascimento: new Date("1998-05-18"),
            nivel_id: 3,
            nome: "Gustavo Michels de Camargo",
            hobby: "Ler",
            sexo: "M"
        }


        request(endereco)
            .post(`/${model}/add`)
            .send(devTest)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const edit = response._body
                console.log(edit)
                edit.nome = "Gustavo 2 Gustavo"

                request(endereco)
                    .put(`/${model}/edit`)
                    .send(edit)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response: any) => {

                        expect(response._body).toHaveProperty("id")
                        expect(response._body).toHaveProperty("nome")
                        expect(response._body).toHaveProperty("datanascimento")
                        expect(response._body).toHaveProperty("nivel_id")
1
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

describe("DELETE /desenvolvedor/delete", () => {
    it("Adicionar item e deleter esse mesmo item", done => {

        const devTest: Desenvolvedor = {
            datanascimento: new Date("1998-05-18"),
            nivel_id: 3,
            nome: "Gustavo Michels de Camargo",
            hobby: "Ler",
            sexo: "M"
        }

        request(endereco)
            .post(`/${model}/add`)
            .send(devTest)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response: any) => {
                const res: DesenvolvedorResponse = response._body

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
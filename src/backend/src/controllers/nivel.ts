import sequelize from "sequelize"
import type { Request, Response } from "restify"
import type { Controller } from "../../types/controller"
import type { Nivel as NivelType } from "../../types"

import NivelModel from "../models/nivel"
import DesenvolvedorModel from "../models/desenvolvedor"

class Nivel implements Controller{

    public async add(req: Request, res: Response): Promise<void> {
        const data: NivelType = await req.body

        try {
            const resultado = await NivelModel.create(data)
            
            res.send(201, resultado)

        } catch (err: any) {
            res.send(400, {
                message: err.name
            })
        }
    }

    public async getAll(req: Request, res: Response): Promise<void>{
        try {
            // Procura todos os niveis e adiciona quantos devs estão relacionados
            const niveis = await NivelModel.findAll({
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                "(SELECT COUNT(*) FROM `desenvolvedor` WHERE `desenvolvedor`.`nivel_id` = `Nivel`.`id`)"
                            ),
                            "numeroDevs"
                        ]
                    ]
                }
            })

            res.send(200, niveis)
        } catch (err: any) {
            res.send(400, {
                message: err.name
            })
        }
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = await req.params
        try {
            const nivel = await NivelModel.findByPk(id, {
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                "(SELECT COUNT(*) FROM `desenvolvedor` WHERE `desenvolvedor`.`nivel_id` = `Nivel`.`id`)"
                            ),
                            "numeroDevs"
                        ]
                    ]
                }
            })

            res.send(200, nivel === null ? [] : nivel)
        } catch (err: any) {
            res.send(400, {
                message: err.name
            })
        }
    }

    public async edit(req: Request, res: Response): Promise<void>{
        const data = await req.body

        try {
            const nivel: any = await NivelModel.findByPk(data.id)
            nivel.set(data)
            nivel.save()

            res.send(200, nivel)

        } catch (err: any) {
            res.send(400, {
                message: err.name
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const {id} = await req.body

        try {
            const { count } = await DesenvolvedorModel.findAndCountAll({
                where: {
                    nivel_id: parseInt(id)
                }
            })

            if (count > 0) {
                res.send(501, {
                    message: "One or more developers associates"
                })
            }

            // Evitar tentar excluir niveis que não existem
            const nivel = await NivelModel.findByPk(id)
            if (nivel) await nivel.destroy()

            res.send(204)

        } catch (err: any) {
            res.send(400, {
                message: err
            })
        }
    }
}

export default new Nivel
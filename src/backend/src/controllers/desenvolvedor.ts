import sequelize from "sequelize"
import type { Request, Response } from "restify"
import type { DesenvolvedorController } from "../types/controllers"
import type { Desenvolvedor as DesenvolvedorType, DesenvolvedorResponse, NivelResponse, Nivel as NivelType, DesenvolvedorAttributes } from "../types"

import DesenvolvedorModel from "../models/desenvolvedor"
import NivelModel from "../models/nivel"

class Desenvolvedor implements DesenvolvedorController{


    private verifyId(id: number): boolean{
        return id < 1 || isNaN(id)
    }

    public async add(req: Request, res: Response): Promise<void> {
        const data: DesenvolvedorAttributes = await req.body

        try {
            const nivelRes: any = await NivelModel.count({where: {id: data.nivel_id}})

            if (nivelRes < 1){
                res.send(400, {message: "Invalid Nivel ID"})
            }else{
                const resultado = await DesenvolvedorModel.create(data)

                res.send(201, resultado)
            }            
        } catch (err: any) {
            res.send(400, {
                message: err.errors
            })
        }   
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {

            const data = await DesenvolvedorModel.findAll({
                include: [
                    NivelModel
                ]
            })


            res.send(200, data)

        } catch (err: any) {
            res.send(400, {
                message: err.errors
            })
        }   
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const id: number = await parseInt(req.params.id)
        
        if (id < 1 || isNaN(id)){
            res.send(400, {message: "Invalid ID"})
        }else{
            try {
                const data = await DesenvolvedorModel.findByPk(id, {
                    include: [
                        NivelModel
                    ]
                })

                if(data){
                    res.send(200, data)
                }else{
                    res.send(400, {message: "Invalid ID"})
                }

            } catch (err: any) {
                res.send(400, {
                    message: err.errors
                })
            } 
        }
          
    }

    public async edit(req: Request, res: Response): Promise<void> {
        const data: DesenvolvedorResponse = await req.body
        

        try {

            const nivelRes: any = await NivelModel.count({ where: { id: data.nivel_id } })

            if (nivelRes < 1) {
                res.send(400, { message: "Invalid Nivel ID" })
            } else {
                const desenvolvedor: any = await DesenvolvedorModel.findByPk(data.id)

                res.send(200, await desenvolvedor.update(data))
            }      
            
        } catch (err: any) {
            res.send(400, {
                message: err.errors
            })
        }   
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const id: number = await parseInt(req.body.id)

        if (id < 1 || isNaN(id)){
            res.send(400, {message: "Invalid ID"})
        }else{
            try {
                const desenvolvedor: any = await DesenvolvedorModel.findByPk(id)
                if (desenvolvedor) {
                    await desenvolvedor.destroy()
                    res.send(204)
                } else {
                    res.send(400, { message: "Some problem happen" })
                }


            } catch (err: any) {
                res.send(400, {
                    message: err.errors
                })
            } 
        }  
    }


}

export default new Desenvolvedor
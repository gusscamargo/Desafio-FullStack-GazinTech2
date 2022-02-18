import sequelize from "sequelize"
import type { Request, Response } from "restify"
import type { DesenvolvedorController } from "../types/controllers"
import type { Desenvolvedor as DesenvolvedorType } from "../types"

import DesenvolvedorModel from "../models/desenvolvedor"
import NivelModel from "../models/nivel"

class Desenvolvedor implements DesenvolvedorController{

    public async add(req: Request, res: Response): Promise<void> {
        
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        
    }

    public async edit(req: Request, res: Response): Promise<void> {
        
    }

    public async delete(req: Request, res: Response): Promise<void> {
        
    }


}

export default new Desenvolvedor
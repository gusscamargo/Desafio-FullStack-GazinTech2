import type { Request, Response, Next } from "restify";

export interface Controller {
    add: (req: Request, res: Response) => Promise<void>
    getAll: (req: Request, res: Response) => Promise<void>
    getOne: (req: Request, res: Response) => Promise<void>
    edit: (req: Request, res: Response) => Promise<void>
    delete: (req: Request, res: Response) => Promise<void>
}

export type NivelController = Controller

export type DesenvolvedorController = Controller

export interface InputController{
    req: Request
    res: Response
    next: Next
}
import { Request, Response } from "express";
import selectPersonClass from "../data/selectPersonClass";

export const getPersonClass = async (req: Request, res: Response) => {

    try {
        const {id, tipo} = req.body
        
        const table = tipo

        if (!id || !tipo ) {
            throw new Error("Preencha todos os campos obrigatórios")
        }
        
        if(tipo !== "student" && tipo !== "teacher") {
            throw new Error("O campo tipo precisa ser preenchido com student ou teacher")
        }
        
        const result = await selectPersonClass( id, table)
        
        if(!result){
            throw new Error("Estudantes não encontrados");
        }

        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}
import { Request, Response } from "express";
import selectElementById from "../data/selectElementById";
import updateModuleClass from "../data/updateModuleClass";

const putModuleClass = async(req: Request, res: Response)=>{
    try{
        const {id, modulo} = req.body
        const table = "class"

        const getClass = await selectElementById(id, table)

        if(!getClass.length){
            throw new Error("Turma não encontrada")
        }

        if(!id || !modulo){
            throw new Error("Id e module obrigatórios")
        }

        if(typeof id !== "string" || typeof modulo !== "string"){
            throw new Error("id e módulo devem ser strings")
        }

        await updateModuleClass(id, modulo)

        res.status(202).send(`Módulo da turma ${getClass[0].nome}
        atualizado com sucesso para ${modulo}` )


    } catch(error) {
        switch(error.code){
            case "WARN_DATA_TRUNCATED":
                res.status(404).send("Informe Módulos válidos de 0 à 7")
                break
            default:
                res.status(404).send(error.message || error.sqlMessage)
        }
    }
}

export default putModuleClass

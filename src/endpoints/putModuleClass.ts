import { Request, Response } from "express";
import selectElementById from "../data/selectElementById";
import updateModuleClass from "../data/updateModuleClass";

const putModuleClass = async(req: Request, res: Response)=>{
    try{
        const {id, module} = req.body
        const table = "class"

        const getClass = await selectElementById(id, table)

        if(!getClass.length){
            throw new Error("Turma não encontrada")
        }

        if(!id || !module){
            throw new Error("Id e module obrigatórios")
        }

        if(typeof id !== "string" || typeof module !== "string"){
            throw new Error("id e módulo devem ser strings")
        }

        await updateModuleClass(id, module)

        res.status(202).send(`Módulo da turma ${getClass[0].nome}
        atualizado com sucesso para ${module}` )


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

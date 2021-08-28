import { Request, Response } from "express";
import insertClass from "../data/insertClass"; 

const createClass = async(req: Request, res: Response) =>{
    try{
        const {nome, dataInicio, dataFinal, modulo, turno} = req.body

        if(!nome || !dataInicio || !dataFinal || !turno){
            throw new Error("Obrigatório nome, data de inicio, data final e turno")
        }

        if(typeof nome !== "string" || typeof dataInicio !== "string" || typeof dataFinal !== "string" 
        || typeof modulo !== "string" || typeof turno !== "string"){
            throw new Error("Esperado tipo string para 'nome', 'dataInicio', 'dataFinal' e 'modulo'")
        }

        const novoturno = turno && (turno as string).toLowerCase()

        if(novoturno !== "integral" && novoturno !== "noturna"){
            throw new Error("Inclua integral ou noturna para turno")
        }

        const novaDataInicio = dataInicio.split("/").reverse().join("/")
        const novaDataFinal = dataFinal.split("/").reverse().join("/")
        
        await insertClass(nome, novaDataInicio, novaDataFinal, modulo, novoturno)

        res.status(200).send({message:'Class Created Successfully'})
        
    } catch (error) {
        switch(error.code){
            case "WARN_DATA_TRUNCATED":
                res.status(404).send("Valid modulos: '0', '1', '2', '3', '4', '5', '6', '7'")
            case "ER_TRUNCATED_WRONG_VALUE":
                res.status(404).send("Date format must be DD/MM/YYYY")
            default:
                res.status(404).send(error.message || error.sqlMessage)
        }
    }
}

export default createClass
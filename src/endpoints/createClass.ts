import { Request, Response } from "express";
import insertClass from "../data/insertClass"; 

const createClass = async(req: Request, res: Response) =>{
    try{
        const {name, startDate, finalDate, module, shift} = req.body;

        if(!name || !startDate || !finalDate || !shift){
            throw new Error("Obrigatório name, data de inicio, data final e shift")
        };

        if(typeof name !== "string" || typeof startDate !== "string" || typeof finalDate !== "string" 
        || typeof module !== "string" || typeof shift !== "string"){
            throw new Error("Esperado tipo string para 'name', 'startDate', 'finalDate' e 'module'")
        };

        const newShift = shift && (shift as string).toLowerCase();

        if(newShift !== "integral" && newShift !== "noturna"){
            throw new Error("Inclua integral ou noturna para shift")
        };

        const newStartDate = startDate.split("/").reverse().join("/");
        const newFinalDate = finalDate.split("/").reverse().join("/");
        
        await insertClass(name, newStartDate, newFinalDate, module, newShift);

        res.status(200).send({message:`Classe ${name} Criada com sucesso`});
        
    } catch (error: any) {
        switch(error.code){
            case "WARN_DATA_TRUNCATED":
                res.status(404).send("Informe módulos entre 0 e 7")
                break
            case "ER_TRUNCATED_WRONG_VALUE":
                res.status(404).send("Formato da data deve ser DD/MM/YYYY")
                break
            case "ER_DUP_ENTRY":
                res.status(404).send("Turma já cadastrada")
                break
            default:
                res.status(404).send(error.message || error.sqlMessage)
        };
    };
};

export default createClass;
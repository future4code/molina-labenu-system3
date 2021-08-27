import { Request, Response } from "express";
import insertClass from "../data/insertClass"; 

const createClass = async(req: Request, res: Response) =>{
    try{
        const {name, startDate, finalDate, module} = req.body
        // const module = req.body.module as string

        if(!name && !startDate && finalDate){
            throw new Error("Mandatory id, name, startDate and finalDate")
        }

        if(typeof name !== "string" || typeof startDate !== "string" || typeof finalDate !== "string" || typeof module !== "string"){
            throw new Error("Expected string to 'name', 'startDate', 'finalDate' and 'module'")
        }

        if(module){
            const classModule = ["0","1","2","3","4","5","6","7"]

            const findModule = classModule.find((module) => module)

            if(!findModule){
                throw new Error("Valid modules: '0', '1', '2', '3', '4', '5', '6', '7'")
            }
        }

        const newStartDate = startDate.split("/").reverse().join("/")
        const newFinalDate = finalDate.split("/").reverse().join("/")
        
        await insertClass(name, newStartDate, newFinalDate, module)

        res.status(200).send({message:'Class Created Successfully'})
        
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default createClass
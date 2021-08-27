import { Request, Response } from "express";
import insertClass from "../data/insertClass"; 

const createClass = async(req: Request, res: Response) =>{
    try{
        const {name, startDate, finalDate, module, shift} = req.body

        if(!name || !startDate || !finalDate || !shift){
            throw new Error("Mandatory id, name, startDate, finalDate and shift")
        }

        if(typeof name !== "string" || typeof startDate !== "string" || typeof finalDate !== "string" 
        || typeof module !== "string" || typeof shift !== "string"){
            throw new Error("Expected string to 'name', 'startDate', 'finalDate' and 'module'")
        }

        const newShift = shift && (shift as string).toLowerCase()

        if(newShift !== "full" && newShift !== "evening class"){
            throw new Error("Include full or evening class")
        }

        const newStartDate = startDate.split("/").reverse().join("/")
        const newFinalDate = finalDate.split("/").reverse().join("/")
        
        await insertClass(name, newStartDate, newFinalDate, module, newShift)

        res.status(200).send({message:'Class Created Successfully'})
        
    } catch (error) {
        switch(error.code){
            case "WARN_DATA_TRUNCATED":
                res.status(404).send("Valid modules: '0', '1', '2', '3', '4', '5', '6', '7'")
            case "ER_TRUNCATED_WRONG_VALUE":
                res.status(404).send("Date format must be DD/MM/YYYY")
            default:
                res.status(404).send(error.message || error.sqlMessage)
        }
    }
}

export default createClass
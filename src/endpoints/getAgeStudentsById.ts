import { Request, Response } from "express";
import selectElementById from "../data/selectElementById";

const getAgeStudentsById = async(req: Request, res: Response) => {
    try{
        const studentId = req.params.id
        const table = "student"

        const result = await selectElementById(studentId, table)

        if(!result.length){
            throw new Error("Usuário não encontrado")
        }

        const ageInMilisseconds: number = Date.now() - result[0].data_nasc.getTime()
        const ageInYears: number = ageInMilisseconds/1000/60/60/24/365

        res.status(200).send({age: Math.floor(ageInYears)})

    }catch(error){
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default getAgeStudentsById
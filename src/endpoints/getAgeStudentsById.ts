import { Request, Response } from "express";
import selectAgeStudentsById from "../data/selectAgeStudentsById";
import selectStudentById from "../data/selectStudentById";

const getAgeStudentsById = async(req: Request, res: Response) => {
    try{
        const studentId = req.params.id

        const verifyStudent = await selectStudentById(studentId)

        if(!verifyStudent.length){
            throw new Error("Usuário não encontrado")
        }

        const result = await selectAgeStudentsById(studentId)

        const ageInMilisseconds: number = Date.now() - result[0].data_nasc.getTime()
        const ageInYears: number = ageInMilisseconds/1000/60/60/24/365

        res.status(200).send({age: Math.floor(ageInYears)})

    }catch(error){
        res.status(404).send(error.message || error.sqlMessage)
    }
}

export default getAgeStudentsById
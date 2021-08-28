import { Request, Response } from "express";
import selectStudentsBySameHobby from "../data/selectStudentsBySameHobby";

export const getStudentsBySameHobby = async (req: Request, res: Response) => {

    try {

        const hobby = req.params.hobby
        const result = await selectStudentsBySameHobby(hobby)
       
        if(!result){
            throw new Error("Nenhum estudante com mesmo hobby");
        }

        const students = result.map((student: any) => {
            return {
                id: student.id,
                nome: student.nome,
            }
        })

        res.status(200).send(students)
    } catch (error) {
        res.status(404).send(error.message || error.sqlMessage)
    }
}
import { Request, Response } from "express";
import selectStudentsBySameHobby from "../data/selectStudentsBySameHobby";

const getStudentsBySameHobby = async (req: Request, res: Response) => {
    try {
        const hobby = req.params.hobby;
        const result = await selectStudentsBySameHobby(hobby);
       
        if(!result.length){
            throw new Error("Nenhum estudante com mesmo hobby");
        };

        const students = result.map((student: any) => {
            return {
                id: student.id,
                nome: student.nome,
            };
        });

        res.status(200).send(students);

    } catch (error: any) {
        res.status(500).send(error.message || error.sqlMessage);
    };
};

export default getStudentsBySameHobby;
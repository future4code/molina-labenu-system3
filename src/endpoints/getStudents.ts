import { Request, Response } from "express";
import selectTable from "../data/selectTable";

const getStudents = async (req: Request, res: Response) => {
    try {
        const result = await selectTable("student");

        if(!result){
            throw new Error("Estudantes não encontrados");
        };

        const students = result.map((student: any) => {
            return {
                id: student.id,
                nome: student.nome,
                email: student.email,
                data_nasc: student.data_nasc,
                turma_id: student.class_id
            };
        });

        res.status(200).send(students);

    } catch (error: any) {
        res.status(404).send(error.message || error.sqlMessage)
    };
};

export default getStudents;
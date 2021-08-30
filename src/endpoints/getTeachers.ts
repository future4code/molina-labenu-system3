import { Request, Response } from "express";
import selectTable from "../data/selectTable";

const getTeachers = async (req: Request, res: Response) => {
    try {
        const result = await selectTable("teacher");

        if(!result){
            throw new Error("Docentes não encontrados");
        }

        const teachers = result.map((teacher: any) => {
            return {
                id: teacher.id,
                nome: teacher.nome,
                email: teacher.email,
                data_nasc: teacher.data_nasc,
                turma_id: teacher.class_id
            };
        });

        res.status(200).send(teachers);

    } catch (error: any) {
        res.status(404).send(error.message || error.sqlMessage)
    };
};

export default getTeachers;
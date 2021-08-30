import { Request, Response } from "express";
import moment from "moment"
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
                data_nasc: moment(teacher.data_nasc, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                turma_id: teacher.class_id
            };
        });

        res.status(200).send(teachers);

    } catch (error: any) {
        res.status(500).send(error.message || error.sqlMessage)
    };
};

export default getTeachers;